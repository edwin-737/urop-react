import React, { useState } from 'react';
import axios from 'axios';
import CreatePost from './CreatePost.component';
const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
const forumPostUrl = host + 'forumPost';
const userUrl = host + 'user';
export default function FocusOnTopic(props) {
    const [cardData, setCardData] = useState([]);
    const [responseCards, setResponseCards] = useState([]);
    const [dataIsUpdated, setDataIsUpdated] = useState(0);
    const [cardsAreUpdated, setCardsAreUpdated] = useState(false)
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
            return 0;
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
                    console.log('curResponse', curResponse);
                    userPromiseArr.push(
                        axios.post(userUrl + '/findOne', {
                            _id: curResponse.postedBy,
                        }));
                    console.log('postedBy', curResponse.postedBy, (new Date().getTime() / 1000) - itime);
                    const curUser = await axios.post(userUrl + '/findOne', {
                        _id: curResponse.postedBy,
                    })
                        .then((response) => {
                            const user = response.data;
                            console.log('each user', user);
                            return user;
                        })
                        .catch(err => console.log(err));
                    var curCardData = {
                        key: curResponse._id,
                        body: curResponse.body,
                        responses: curResponse.responses,
                        username: curUser.username,
                        showReplies: false,
                        showReplyBox: false,
                        upvotes: curResponse.upvotes,
                    };
                    setCardData(((prev) =>
                        [...prev, curCardData]
                    ));
                    return 0;
                })
            });

        return dataIsUpdated;
    };
    const getUserData = async () => {
        if (dataIsUpdated >= 2)
            return dataIsUpdated;
        setDataIsUpdated(2);
        Promise.all(userPromiseArr)
            .then((responses) => {
                const users = responses;
                console.log('users as list', users, (new Date().getTime() / 1000) - itime);
                console.log('size of cardData', cardData.length, (new Date().getTime() / 1000) - itime)
                cardData.map((curCardData, index) => {
                    const data = cardData.map(curCard => {
                        if (curCard.key === curCardData.key) {
                            curCard.username = users[index].data.username
                        } else {
                            return curCard;
                        }
                    })
                    console.log('each data', data);
                    setCardData(data);
                    return 0;
                })

            })
    }

    const makeResponseCards = () => {
        if (cardsAreUpdated === true)
            return null;
        setResponseCards([]);
        setCardsAreUpdated(true);
        console.log('cardData in if', cardData, (new Date().getTime() / 1000) - itime);
        cardData.map((curCardData) => {
            const keyToMatch = curCardData.key;
            console.log('in make response cards', curCardData.username);
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
            ]);
            return 0;
        });
    }
    getPromises();
    console.log('forumPostPromiseArr length', forumPostPromiseArr.length);
    getResponseCardData();
    setTimeout(getUserData, 1000);
    // getUserData();
    if (!cardsAreUpdated)
        setTimeout(makeResponseCards, 1300);
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