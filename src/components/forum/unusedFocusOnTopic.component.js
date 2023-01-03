import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateResponse from './CreateResponse.component';
const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
const forumPostUrl = host + 'forumPost';
const userUrl = host + 'user';
export default function FocusOnTopic(props) {
    const [cardData, setCardData] = useState([]);
    const [aReplyClicked, setAReplyClicked] = useState(false);
    const [clickedReplyId, setClickedReplyId] = useState('');
    const [responseCards, setResponseCards] = useState([]);
    const [dataIsUpdated, setDataIsUpdated] = useState(0);
    const [cardsAreUpdated, setCardsAreUpdated] = useState(false);
    // setCardData([]);
    // useEffect(() => {
    //     console.log('clicked reply id', clickedReplyId);
    //     const setShow = (prev) => prev.map(curCard => {
    //         if (curCard._id === clickedReplyId) {
    //             if (!curCard.showReplies)
    //                 return { ...curCard, showReplies: true };
    //             else
    //                 return { ...curCard, showReplies: false };
    //         } else {
    //             return curCard;
    //         }
    //     })
    //     setCardData(setShow);
    //     console.log('in useEffect cardData', cardData);
    // }, [aReplyClicked])
    const itime = new Date().getTime() / 1000;
    var forumPostPromiseArr = [];
    var userPromiseArr = [];
    console.log('rootCard title', props.rootCard.title);
    const updateCard = () => {
        console.log('clicked reply id', clickedReplyId);
        const setShow = (prev) => prev.map(curCard => {
            if (curCard._id === clickedReplyId) {
                if (!curCard.showReplies)
                    return { ...curCard, showReplies: true };
                else
                    return { ...curCard, showReplies: false };
            } else {
                return curCard;
            }
        })
        setCardData(setShow);
        console.log('in updateCard cardData', cardData);
        setAReplyClicked(false);
    }
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
        setCardData([]);
        console.log('time at start of getResponseCardData', (new Date().getTime() / 1000) - itime);
        const rawResponseData = await Promise.all(forumPostPromiseArr)
            .then(forumPosts => {
                var rawData = forumPosts.map(item => item.data);
                rawData.map(curRawData => {
                    userPromiseArr.push(
                        axios.post(userUrl + '/findOne', {
                            _id: curRawData.postedBy
                        })
                    );
                })
                return rawData;
            })
            .catch(err => console.log(err));
        const userData = await Promise.all(userPromiseArr)
            .then(users => {
                console.log('all users', users)
                var rawUserData = users.map(item => {
                    console.log('each user data', item);
                    return item.data;
                });
                return rawUserData;
            })
            .then(userData => {
                userData.map((curUserData, index) => {
                    console.log('raw response data', rawResponseData);
                    console.log('curUserData', curUserData);
                    rawResponseData[index].username = curUserData.username;
                    rawResponseData[index].showReplies = false;
                    rawResponseData[index].showReplyBox = false;
                    rawResponseData[index].layer = props.rootCard.layer + 1;
                    console.log('response data after each iter', rawResponseData[index]);
                    const r = rawResponseData[index];
                    // setCardData([(prev) => [...prev, r]]);
                    setCardData(prev => [...prev, 234]);
                })

                return userData
            })
        console.log('response data after promise.all', rawResponseData);
        // const finalResponses = await props.rootCard.responses.map(async (id) => {

        //     var curCardData = await axios.post(
        //         forumPostUrl + '/findOne',
        //         { _id: id }
        //     )
        //         .then(curResponse => {
        //             return curResponse.data;
        //             // return axios.post(userUrl + '/findOne', {
        //             //     _id: curCardData.data.postedBy,
        //             // })
        //         })
        //         .catch(err => console.log(err));
        //     var curUsername = await axios.post(
        //         userUrl + '/findOne', {
        //         _id: curCardData.postedBy,
        //     })
        //         .then(curUser => {
        //             return curUser.data.username;
        //         })
        //         .catch(err => console.log(err));
        //     curCardData.username = curUsername;
        //     curCardData['showReplies'] = false;
        //     curCardData['showReplyBox'] = false;
        //     curCardData['layer'] = props.rootCard.layer + 1;
        //     console.log('current response', curCardData);
        //     console.log('current username', curUsername);
        //     setCardData(((prev) =>
        //         [...prev, curCardData]
        //     ));
        //     console.log('current CardData', cardData);

        //     return curCardData;
        //     // await axios.post(
        //     //     forumPostUrl + '/findOne',
        //     //     { _id: id }
        //     // )
        //     // .then(async curResponse => {
        //     //     curResponse = curResponse.data;
        //     //     // console.log('curResponse', curResponse, (new Date().getTime() / 1000) - itime);
        //     //     const curUser = await axios.post(userUrl + '/findOne', {
        //     //         _id: curResponse.postedBy,
        //     //     })
        //     //         .then((response) => {
        //     //             const user = response.data;
        //     //             return user;
        //     //         })
        //     //         .catch(err => console.log(err));
        //     //     var curCardData = {
        //     //         key: curResponse._id,
        //     //         body: curResponse.body,
        //     //         tags: curResponse.tags,
        //     //         title: curResponse.title,
        //     //         responses: curResponse.responses,
        //     //         username: curUser.username,
        //     //         showReplies: false,
        //     //         showReplyBox: false,
        //     //         upvotes: curResponse.upvotes,
        //     //         layer: props.rootCard.layer + 1,
        //     //     };
        //     //     setCardData(((prev) =>
        //     //         [...prev, curCardData]
        //     //     ));
        //     //     return 0;
        //     // })
        //     // .catch(err => console.log(err))

        // })
        //     .then(res => res);
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
        // rawResponseData.map(item => setCardData(prev => [...prev, item]));
        return rawResponseData;
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
        console.log('card data in makeResponseCards', cardData);
        console.log('called makeResponseCards', cardData, (new Date().getTime() / 1000) - itime);
        cardData.map((curCardData, index) => {
            const keyToMatch = curCardData._id;
            console.log('in make response cards', curCardData.username);

            setResponseCards((prev) => [
                ...prev,
                <li className=".response-list-item" key={curCardData._id} >
                    <div className='response-card' >
                        <div className='topic-card-container'>

                            <div className='topic-card-text-container'>
                                <span className='response-username-font'>
                                    {curCardData.username}
                                </span>
                                <p className='response-body' >
                                    {curCardData._id}      {curCardData.body}
                                </p>
                            </div>
                            <div className='topic-card-button-container'>
                                <button id="show-replies"
                                    className='button-add-question'
                                    style={{ borderRadius: 0, border: "solid rgb(0,0,0)" }}
                                    onClick={
                                        (e) => {
                                            e.stopPropagation();
                                            setClickedReplyId(keyToMatch);
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
                                ><span className='chapter-dropdown-font'>add reply</span>
                                </button>

                                <div></div>
                                <button style={{ backgroundColor: 'transparent', border: 0 }}>
                                    <img src='images/upvote.png' alt='upvote' style={{ width: '52px', height: '46px' }}></img>
                                </button>
                                <button style={{ backgroundColor: 'transparent', border: 0 }}>
                                    <img src='images/downvote.png' alt='downvote' style={{ width: '52px', height: '46px' }}></img>
                                </button>
                            </div>
                        </div>
                    </div>
                    {cardData[index].showReplies && <FocusOnTopic rootCard={cardData[index]} />}
                    {cardData[index].showReplyBox && <CreateResponse rootCard={cardData[index]} />}
                </li >
            ]);
            return 0;
        });
    }
    const combine = async () => {
        if (cardsAreUpdated)
            return 0;
        setCardsAreUpdated(true);
        var allCardData = await getResponseCardData()
            .then(ccardData => {
                setCardData(ccardData);
                console.log('cardData at start of combine', cardData);
                console.log('allCardData', cardData);
                ccardData.map((curCardData, index) => {
                    const keyToMatch = curCardData._id;
                    setResponseCards(prev => [...prev,
                    <li className=".response-list-item" key={curCardData._id} >
                        <div className='response-card' >
                            <div className='topic-card-container'>

                                <div className='topic-card-text-container'>
                                    <span className='response-username-font'>
                                        {curCardData.username}
                                    </span>
                                    <p className='response-body' >
                                        {curCardData._id}      {curCardData.body}
                                    </p>
                                </div>
                                <div className='topic-card-button-container'>
                                    <button id="show-replies"
                                        className='button-add-question'
                                        style={{ borderRadius: 0, border: "solid rgb(0,0,0)" }}
                                        onClick={
                                            (e) => {
                                                e.stopPropagation();

                                                setAReplyClicked(true);
                                                setClickedReplyId(keyToMatch);
                                                // const setShow = (prev) => prev.map(curCard => {
                                                //     if (curCard._id === keyToMatch) {
                                                //         if (!curCard.showReplies)
                                                //             return { ...curCard, showReplies: true };
                                                //         else
                                                //             return { ...curCard, showReplies: false };
                                                //     } else {
                                                //         return curCard;
                                                //     }
                                                // })
                                                // setCardData(setShow);
                                                // console.log('supposedly convert showReplies', cardData)
                                            }}
                                    > <span className='chapter-dropdown-font'>replies</span>
                                    </button>
                                    <button
                                        className='button-add-question'
                                        style={{ borderRadius: 0, border: "solid rgb(0,0,0)" }}
                                        onClick={
                                            (e) => {
                                                e.stopPropagation();
                                                // setCardsAreUpdated(false);
                                                const setShow = (prev) => prev.map(curCard => {
                                                    if (curCard._id === keyToMatch) {
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
                                    ><span className='chapter-dropdown-font'>add reply</span>
                                    </button>

                                    <div></div>
                                    <button style={{ backgroundColor: 'transparent', border: 0 }}>
                                        <img src='images/upvote.png' alt='upvote' style={{ width: '52px', height: '46px' }}></img>
                                    </button>
                                    <button style={{ backgroundColor: 'transparent', border: 0 }}>
                                        <img src='images/downvote.png' alt='downvote' style={{ width: '52px', height: '46px' }}></img>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {cardData.length > 0 && cardData[index].showReplies && <FocusOnTopic rootCard={cardData[index]} />}
                        {cardData.length > 0 && cardData[index].showReplyBox && <CreateResponse rootCard={cardData[index]} />}
                    </li >
                    ]);
                    console.log('response cards at end of combine', responseCards.length);
                    return ccardData;
                });
            })
    }
    getPromises();
    console.log('forumPostPromiseArr length', forumPostPromiseArr.length);
    if (!cardsAreUpdated)
        // getResponseCardData().then(makeResponseCards);
        combine();
    if (aReplyClicked)
        setTimeout(updateCard, 100)
    setTimeout(console.log('cardData after 1s', cardData), 1000);
    // if (!cardsAreUpdated)
    //     setTimeout(makeResponseCards, 1800);

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
        <div id={props.rootCard.layer === 0 && "forumPost-container"}>
            {//if this is 0th layer, highlight the root card

                props.rootCard.layer === 0 &&
                <div className='focused-topic'>

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