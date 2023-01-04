import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        if (cardData.length === 0)
            return;

        setCardsAreUpdated(true);
        setResponseCards([]);
        console.log('cardData updated here');
        cardData.forEach((curCardData, index) => {
            const keyToMatch = curCardData._id;
            console.log('in make response cards', curCardData.username);
            setResponseCards((prev) => [
                ...prev,
                <li className=".response-list-item" key={curCardData.key} >
                    <div className='response-card' >
                        <div className='topic-card-container' >

                            <div className='topic-card-text-container' style={{ gridTemplateColumns: "80% 10%" }}>
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
                                            console.log('clicked showReplies of', curCardData._id)
                                            const newArr = cardData.map(curCard => {
                                                if (keyToMatch === curCard._id) {
                                                    if (!curCard.showReplies) {
                                                        curCard.showReplies = true;
                                                        return curCard
                                                    }
                                                    else {
                                                        curCard.showReplies = false;
                                                        return curCard
                                                    }
                                                }
                                                return curCard
                                            })
                                            setCardData(newArr);
                                        }}
                                > <span className='chapter-dropdown-font'>replies</span>
                                </button>
                                <button
                                    className='button-add-question'
                                    style={{ borderRadius: 0, border: "solid rgb(0,0,0)" }}
                                    onClick={
                                        (e) => {
                                            e.stopPropagation();
                                            console.log('clicked showReplies of', curCardData._id)
                                            const newArr = cardData.map(curCard => {
                                                if (keyToMatch === curCard._id) {
                                                    if (!curCard.showReplyBox) {
                                                        curCard.showReplyBox = true;
                                                        return curCard
                                                    }
                                                    else {
                                                        curCard.showReplyBox = false;
                                                        return curCard
                                                    }
                                                }
                                                return curCard
                                            })
                                            setCardData(newArr);
                                        }
                                    }
                                ><span className='chapter-dropdown-font'>{(!curCardData.showReplyBox && 'add reply') || (curCardData.showReplyBox && 'cancel')}</span>
                                </button>

                            </div>
                        </div>
                    </div>
                    {cardData[index].showReplyBox && <CreateResponse rootCard={cardData[index]} />}
                    {cardData[index].showReplies && <FocusOnTopic rootCard={cardData[index]} />}
                </li >
            ]);
        });

    }, [cardData])
    const itime = new Date().getTime() / 1000;
    var forumPostPromiseArr = [];
    var userPromiseArr = [];
    console.log('rootCard body', props.rootCard.layer);
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
        // setCardData([]);
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
                userData.forEach((curUserData, index) => {
                    rawResponseData[index].username = curUserData.username;
                    rawResponseData[index].showReplies = false;
                    rawResponseData[index].showReplyBox = false;
                    rawResponseData[index].layer = props.rootCard.layer + 1;
                    // const r = rawResponseData[index];
                    // setCardData([(prev) => [...prev, r]]);
                })
                setCardData(rawResponseData);

                setDataIsUpdated(1);
                return userData
            })
    };
    console.log('forumPostPromiseArr length', forumPostPromiseArr.length);
    if (!cardsAreUpdated) {

        getPromises();
        getResponseCardData();
    }
    // if (aReplyClicked)
    //     setTimeout(updateCard, 100)
    // setTimeout(console.log('cardData after 1s', cardData), 1000);
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