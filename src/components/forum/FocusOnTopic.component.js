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
    const [topicCardData, setTopicCardData] = useState(props.rootCard);
    const [topicCard, setTopicCard] = useState('');
    useEffect(() => {
        setTopicCard(
            <div className='topic-card' style={{ height: '70%', marginLeft: '4%', marginBottom: '5px' }}>
                <div className='topic-card-container'>
                    <div className='topic-card-text-container'>
                        <div></div>
                        <div>
                            <p className='topic-body' >
                                {props.rootCard.body}
                                <br />
                                <span className='topic-card-username'>
                                    by: {props.rootCard.username}
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
                        <button
                            className='focused-topic-add-reply-button'
                            onClick={
                                (e) => {
                                    e.stopPropagation();
                                    if (topicCardData.showReplyBox === false)
                                        setTopicCardData({ ...topicCardData, showReplyBox: true });
                                    else
                                        setTopicCardData({ ...topicCardData, showReplyBox: false });
                                }
                            }
                        ><span className='button-text'>{(!topicCard.showReplyBox && 'add reply') || (topicCard.showReplyBox && 'cancel')}</span>
                        </button>
                    </div>
                </div>
                {topicCardData.showReplyBox && <CreateResponse rootCard={topicCardData} />}

            </div>
        )
    }, [topicCardData, props.rootCard, topicCard.showReplyBox]);
    useEffect(() => {
        if (cardData.length === 0 || cardData === [])
            return;

        setCardsAreUpdated(true);
        setResponseCards([]);
        // console.log('cardData updated here');
        cardData.forEach((curCardData, index) => {
            const keyToMatch = curCardData._id;
            // console.log('in make response cards', curCardData.username);
            setResponseCards((prev) => [
                ...prev,
                <li className=".response-list-item" key={curCardData._id} >
                    <div className='response-card' >
                        <div className='topic-card-container' >
                            <div className='topic-card-text-container' >
                                <div></div>
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
                                <button
                                    className={(curCardData.responses.length && 'focused-topic-add-reply-button')
                                        || (!curCardData.responses.length && 'focused-topic-no-reply-button')}
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
                                > <span className='button-text'>replies</span>
                                </button>
                                <button
                                    className='focused-topic-add-reply-button'
                                    // style={{ borderRadius: 0, border: "solid rgb(0,0,0)" }}
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
                                ><span className='button-text'>{(!curCardData.showReplyBox && 'add reply') || (curCardData.showReplyBox && 'cancel')}</span>
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
    var forumPostPromiseArr = [];
    var userPromiseArr = [];

    // console.log('rootCard body', props.rootCard.layer);
    const getPromises = () => {
        console.log('in getPromises', props.rootCard);
        console.log('in getPromises responses', props.rootCard.responses);
        props.rootCard.responses.forEach((id) => {
            forumPostPromiseArr.push(
                axios.post(
                    forumPostUrl + '/findOne',
                    { _id: id }
                ))
        })
    }
    const getResponseCardData = async () => {
        if (dataIsUpdated >= 1)
            return dataIsUpdated;
        var processedResponseData = await Promise.all(forumPostPromiseArr)
            .then(forumPosts => {
                var rawData = forumPosts.map(item => item.data);
                rawData.forEach(curRawData => {
                    userPromiseArr.push(
                        axios.post(userUrl + '/findOne', {
                            _id: curRawData.postedBy
                        })
                    );
                })
                return rawData;
            })
            .catch(err => console.log(err));
        await Promise.allSettled(userPromiseArr)
            .then(users => {

                console.log('all users', users)
                var rawUserData = users.map(item => {
                    console.log('each user data', item);
                    return item.value.data;
                });
                return rawUserData;
            })
            .then(userData => {
                userData.forEach((curUserData, index) => {
                    processedResponseData[index].username = curUserData.username;
                    processedResponseData[index].showReplies = false;
                    processedResponseData[index].showReplyBox = false;
                    processedResponseData[index].layer = props.rootCard.layer + 1;
                })
                setCardData(processedResponseData);
                setDataIsUpdated(1);
            })
    };
    if (!cardsAreUpdated) {
        getPromises();
        getResponseCardData();
    }
    return (
        <div id={props.rootCard.layer === 0 && "forumPost-container"}>
            {//if this is 0th layer, highlight the root card

                props.rootCard.layer === 0 &&
                <div className='focused-topic'>

                    <span className='focused-topic-title'>{props.rootCard.title}</span>
                    {topicCard}
                </div>
            }
            <ul className='response-list'>
                {responseCards}
            </ul>
        </div>
    );

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
}