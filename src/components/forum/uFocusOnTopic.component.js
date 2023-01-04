import React, { useState } from 'react';
import axios from 'axios';
import CreateResponse from './CreateResponse.component';
const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
const forumPostUrl = host + 'forumPost';
const userUrl = host + 'user';
export default function FocusOnTopic(props) {
    const [cardData, setCardData] = useState([]);
    const [responseCards, setResponseCards] = useState([]);
    const [dataIsUpdated, setDataIsUpdated] = useState(0);
    const [cardsAreUpdated, setCardsAreUpdated] = useState(false);

    const itime = new Date().getTime() / 1000;
    var forumPostPromiseArr = [];
    console.log('rootCard title', props.rootCard.title);

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
        console.log('time at start of getResponseCardData', (new Date().getTime() / 1000) - itime);

        props.rootCard.responses.map(async (id) => {
            await axios.post(
                forumPostUrl + '/findOne',
                { _id: id }
            )
                .then(async curResponse => {
                    curResponse = curResponse.data;
                    console.log('curResponse', curResponse, (new Date().getTime() / 1000) - itime);
                    const curUser = await axios.post(userUrl + '/findOne', {
                        _id: curResponse.postedBy,
                    })
                        .then((response) => {
                            const user = response.data;
                            return user;
                        })
                        .catch(err => console.log(err));
                    var curCardData = {
                        key: curResponse._id,
                        body: curResponse.body,
                        tags: curResponse.tags,
                        title: curResponse.title,
                        responses: curResponse.responses,
                        username: curUser.username,
                        showReplies: false,
                        showReplyBox: false,
                        upvotes: curResponse.upvotes,
                        layer: props.rootCard.layer + 1,
                    };
                    setCardData(((prev) =>
                        [...prev, curCardData]
                    ));
                    return 0;
                })
                .catch(err => console.log(err))
            return 0;
        })
        // await Promise.all(forumPostPromiseArr)
        //     .then((responses) => {
        //         responses.map(curResponse => {
        //             curResponse = curResponse.data;
        //             console.log('curResponse', curResponse);
        //             userPromiseArr.push(
        //                 axios.post(userUrl + '/findOne', {
        //                     _id: curResponse.postedBy,
        //                 }));
        //             console.log('postedBy', curResponse.postedBy, (new Date().getTime() / 1000) - itime);
        //             // const curUser = await axios.post(userUrl + '/findOne', {
        //             //     _id: curResponse.postedBy,
        //             // })
        //             //     .then((response) => {
        //             //         const user = response.data;
        //             //         console.log('each user', user);
        //             //         return user;
        //             //     })
        //             //     .catch(err => console.log(err));
        //             var curCardData = {
        //                 key: curResponse._id,
        //                 body: curResponse.body,
        //                 responses: curResponse.responses,
        //                 // username: curUser.username,
        //                 username: 'need to fill in',
        //                 showReplies: false,
        //                 showReplyBox: false,
        //                 upvotes: curResponse.upvotes,
        //             };
        //             setCardData(((prev) =>
        //                 [...prev, curCardData]
        //             ));
        //             return 0;
        //         })
        //     });
        console.log('time at end of getResponseCardData', (new Date().getTime() / 1000) - itime)
        console.log('at end of getResponseCardData size of CardData', cardData.length, (new Date().getTime() / 1000) - itime)
        return dataIsUpdated;
    };
    // const getUserData = async () => {
    //     if (dataIsUpdated >= 2)
    //         return dataIsUpdated;
    //     // await getResponseCardData();
    //     setDataIsUpdated(2);
    //     await Promise.all(userPromiseArr)
    //         .then((responses) => {
    //             var users = responses;
    //             console.log('size of users', users.length, (new Date().getTime() / 1000) - itime);
    //             console.log('size of cardData', cardData.length, (new Date().getTime() / 1000) - itime)

    //             users.map((curUserData, uIndex) => {
    //                 var newCardData = cardData;
    //                 console.log('newCardData[uindex[.username: ', newCardData[uIndex].username)
    //                 console.log('curUserData.data.username: ', curUserData.data.username)
    //                 newCardData[uIndex].username = curUserData.data.username;
    //                 setCardData(newCardData);
    //                 return curUserData;
    //             })
    //             // cardData.map((curCardData, index) => {
    //             //     const data = cardData.map(curCard => {
    //             //         if (curCard.key === curCardData.key) {
    //             //             curCard.username = users[index].data.username
    //             //         }
    //             //         return curCard;
    //             //     })
    //             //     console.log('each data', data);
    //             //     setCardData(data);
    //             //     return 0;
    //             // })

    //         })
    // }

    const makeResponseCards = () => {
        if (cardsAreUpdated === true)
            return null;
        setResponseCards([]);
        setCardsAreUpdated(true);
        console.log('called makeResponseCards', cardData, (new Date().getTime() / 1000) - itime);
        cardData.map((curCardData) => {
            const keyToMatch = curCardData.key;
            console.log('in make response cards', curCardData.username);
            setResponseCards((prev) => [
                ...prev,
                <li className=".response-list-item" key={curCardData.key} >
                    <div className='response-card' >
                        <div className='topic-card-container'>

                            <div className='topic-card-text-container'>
                                <div>
                                    <p className='topic-body' >
                                        {curCardData.body}
                                        <br />
                                        <span className='topic-card-username'>
                                            by: {curCardData.username}
                                        </span>
                                    </p>
                                </div>
                                <div className='vote-button-container'>
                                    <div></div>
                                    <div className='upvote-button'></div>
                                    <div></div>
                                    <div className='downvote-button'></div>
                                </div>
                            </div>
                            <div className='topic-card-button-container'>
                                <button id="show-replies"
                                    className='button-add-question'
                                    style={{ borderRadius: 0, border: "solid rgb(0,0,0)" }}
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
                                > <span className='chapter-dropdown-font'>replies</span>
                                </button>
                                <button
                                    className='button-add-question'
                                    style={{ borderRadius: 0, border: "solid rgb(0,0,0)" }}
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
                                ><span className='chapter-dropdown-font'>{(!curCardData.showReplyBox && 'add reply') || (curCardData.showReplyBox && 'cancel')}</span>
                                </button>

                            </div>
                        </div>
                    </div>
                    {curCardData.showReplyBox && <CreateResponse rootCard={curCardData} />}
                    {curCardData.showReplies && <FocusOnTopic rootCard={curCardData} />}
                </li >
            ]);
            return 0;
        });
    }

    getPromises();
    console.log('forumPostPromiseArr length', forumPostPromiseArr.length);
    getResponseCardData();
    if (!cardsAreUpdated)
        setTimeout(makeResponseCards, 1800);

    // const myPromise = new Promise(function (myResolve, myReject) {
    //     setTimeout(() => { myReject("value was returned"); }, 3000);
    // });
    // myPromise
    //     .then(value => {
    //         console.log('demo value', value);
    //     })
    //     .catch(value => {
    //         console.log('demo error', value)
    //     });
    return (
        <div className={props.rootCard.layer === 0 && "forumPost-container"}>
            {//if this is 0th layer, highlight the root card

                props.rootCard.layer === 0 &&
                <div className='focused-topic' style={{ marginLeft: '1rem' }}>

                    <span className='focused-topic-title'>{props.rootCard.title}</span>
                    {props.rootCard.cardToDisplayInfFocus}
                </div>
            }
            {
                //otherwise, don't highlight it
                props.rootCard.layer > 0 &&
                props.rootCard.cardToDisplay
            }
            <ul className='response-list'>
                {responseCards}
            </ul>
        </div>
    );
}