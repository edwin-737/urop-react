import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from './CreatePost.component';
// const host='https://urop-react-backend.azurewebsites.net/';
const host = 'http://localhost:3001/';
const forumPostUrl = host + 'forumPost';
const userUrl = host + 'user';
export default function FocusOnTopic(props) {
    const [cardData, setCardData] = useState([]);
    const [responseCards, setResponseCards] = useState([]);
    const [dataIsUpdated, setDataIsUpdated] = useState(0);
    const [cardsAreUpdated, setCardsAreUpdated] = useState(false)
    const [users, setUsers] = useState([]);
    const itime = new Date().getTime() / 1000;
    var forumPostPromiseArr = [];
    var userPromiseArr = [];
    const getPromises = () => {
        props.rootCard.responses.map((id) => {
            forumPostPromiseArr.push(
                axios.post(
                    forumPostUrl + '/findOne',
                    { _id: id }
                ))
        })
    }
    const getUserData = async () => {
        if (dataIsUpdated >= 2)
            return dataIsUpdated;
        await getResponseCardData();
        setDataIsUpdated(2);
        await Promise.all(userPromiseArr)
            .then((responses) => {
                var users = responses;
                // console.log('users data', users);
                users.map((user, index) =>
                    console.log('each user ', index, ' ', user.data)
                );
                for (var i; i < users.length; i++) {
                    console.log('iter over user', users[i]);
                }
                cardData.map((curCardData, index) => {
                    const setShow = (prev) => prev.map(curCard => {
                        if (curCard.key === curCardData.key) {
                            if (!curCard.showReplies)
                                return { ...curCard, username: users[index].data.username };
                        } else {
                            return curCard;
                        }
                    })
                    setCardData(setShow);
                })

            })
    }
    const getResponseCardData = async () => {
        if (dataIsUpdated >= 1)
            return dataIsUpdated;
        setDataIsUpdated(1);
        await Promise.all(forumPostPromiseArr)
            .then(async (responses) => {
                responses.map(async curResponse => {
                    curResponse = curResponse.data;
                    userPromiseArr.push(
                        await axios.post(userUrl + '/findOne', {
                            _id: curResponse.postedBy,
                        }));
                    // const curUser = await axios.post(userUrl + '/findOne', {
                    //     _id: curResponse.postedBy,
                    // })
                    //     .then((response) => {
                    //         const user = response.data;
                    //         console.log('each user', user);
                    //         return user;
                    //         // console.log('user list in then',users)
                    //     })
                    //     .catch(err => console.log(err));
                    var curCardData = {
                        key: curResponse._id,
                        body: curResponse.body,
                        responses: curResponse.responses,
                        // username: 'p',
                        // username: curUser.username,
                        showReplies: false,
                        showReplyBox: false,
                        upvotes: curResponse.upvotes,
                    };
                    setCardData(((prev) =>
                        [...prev, curCardData]
                    ));
                })
            });

        return dataIsUpdated;
    };
    const makeResponseCards = () => {
        if (cardsAreUpdated === true)
            return null;
        setResponseCards([]);
        setCardsAreUpdated(true);
        console.log('cardData in if', cardData, (new Date().getTime() / 1000) - itime);
        cardData.map((curCardData) => {
            const keyToMatch = curCardData.key;
            setResponseCards((prev) => [
                ...prev,
                <li key={curCardData.key} >
                    <div className='reply-card'>
                        <p className='reply-body' >
                            {curCardData.key}      {curCardData.body}
                        </p>
                        <button id="show-replies"
                            className='btn btn-primary m-3'
                            onClick={
                                (e) => {
                                    e.stopPropagation();
                                    setCardsAreUpdated(false);
                                    const setShow = (prev) => prev.map(curCard => {
                                        if (curCard.key === keyToMatch) {
                                            if (!curCard.showReplies)
                                                return { ...curCard, showReplies: true };
                                            else
                                                return { ...curCard, showReplies: false };
                                        } else {
                                            return curCard;
                                        }
                                    })
                                    setCardData(setShow);
                                }}
                        > show replies
                        </button>
                        <button
                            className='btn btn-primary m-3'
                            onClick={
                                (e) => {
                                    e.stopPropagation();
                                    setCardsAreUpdated(false);
                                    const setShow = (prev) => prev.map(curCard => {
                                        if (curCard.key === keyToMatch) {
                                            if (!curCard.showReplyBox)
                                                return { ...curCard, showReplyBox: true };
                                            else
                                                return { ...curCard, showReplyBox: false };
                                        } else {
                                            return curCard;
                                        }
                                    })
                                    setCardData(setShow);
                                }
                            }
                        >add reply
                        </button>
                        {curCardData.username}
                        <button className='upvote-button'></button>
                        <button className='downvote-button'></button>
                    </div>
                    {curCardData.showReplies && <FocusOnTopic rootCard={curCardData} />}
                    {curCardData.showReplyBox && <CreatePost rootCard={curCardData} />}
                </li>
            ])
        });
    }
    getPromises();
    console.log(forumPostPromiseArr.length);
    // getResponseCardData();
    // setTimeout(getUserData, 1000);
    getUserData();
    if (!cardsAreUpdated)
        setTimeout(makeResponseCards, 1030);
    return (
        <div id="questions-container">
            {props.rootCard.cardToDisplay}
            <div id="reply-card">
                <div id="reply-title-div">
                    <ul>
                        {responseCards}
                    </ul>
                </div>
            </div>
        </div>
    );
}