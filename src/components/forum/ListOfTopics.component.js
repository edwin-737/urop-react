import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CreateTopic from './CreateTopic.component';
import FocusOnTopic from './FocusOnTopic.component';
const host = 'https://urop-react-backend.azurewebsites.net/';
const forumPostUrl = host + 'forumPost/';
export default function ListOfTopics(props) {
    //key=AIzaSyDNNc6A9zEBtUZcme_ZKhqzsCxOJpH5G0k,cx=
    const [creatingTopic, setCreatingTopic] = useState(false);
    const [selectMode, setSelectMode] = useState(false);
    const [cardData, setCardData] = useState(props.forumPostData);
    const [cards, setCards] = useState(props.forumPostCards);
    const [focusOn, setFocusOn] = useState(-1);
    const [cardToFocusOn, setCardToFocusOn] = useState(-1);
    const [cardsToDelete, setCardsToDelete] = useState([]);
    // const signedIn = "63861e801ad80b98e92289fb";
    const refresh = () => window.location.reload(true);

    useEffect(() => {
        if (cardsToDelete.length === 0)
            return;
        cardsToDelete.forEach(async (curCardId, index) => {
            await axios.post(forumPostUrl + '/delete', {
                _id: curCardId,
            });
            if (index === cardsToDelete.length - 1)
                refresh();
        });
    }, [cardsToDelete])
    useEffect(() => {
        if (focusOn === -1)
            return;
        console.log('called focusOn', focusOn);
        props.forumPostData.forEach((item) => {
            console.log('item', item);
            if (item._id === focusOn) {
                console.log('chosen', item)
                setCardToFocusOn({ ...item, layer: 0 });
            }
        });
    }, [focusOn, props]);
    useEffect(() => {
        if (focusOn !== -1)
            return;
        var topicCardStyle = selectMode ? "topic-card-selectMode" : "topic-card";
        // topicCardStyle = (topicCardStyle === "topic-card-selectMode") ? "topic-card-selected" : "topic-card"
        var temp = [];
        cardData.forEach((curCardData) => {
            var curTopicCardStyle = topicCardStyle;
            // if (selectMode && curCardData.selected)
            //     curTopicCardStyle = "topic-card-selected";
            // else if (!selectMode)
            //     curCardData.selected = false;
            temp.push(
                <li key={curCardData._id}>
                    <div className={curTopicCardStyle}
                        onClick={(e) => {
                            if (!selectMode)
                                return;
                            e.stopPropagation();
                            const newArr = cardData.map(curCard => {
                                if (curCardData._id === curCard._id) {
                                    if (!curCard.selected) {
                                        curCard.selected = true;
                                        return curCard
                                    }
                                    else {
                                        curCard.selected = false;
                                        return curCard
                                    }
                                }
                                return curCard
                            })
                            setCardData(newArr);
                        }}
                    >
                        <div className='topic-card-container'>
                            <div className='topic-card-text-container'>
                                <div>
                                    {selectMode && <input type='checkbox' className='topic-card-select-box'></input>}
                                </div>
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
                                <button className="topic-card-see-thread-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFocusOn(curCardData._id)
                                    }}>
                                    <span className='topic-card-see-thread-font'>
                                        see thread
                                    </span>
                                </button>
                                <div></div>
                                <div></div>

                            </div>
                        </div>
                    </div>
                </li >
            );
        });
        setCards(temp);
    }, [selectMode, cardData]);
    return (
        <div>
            <div className="forumPost-container">
                {cardToFocusOn !== -1 &&
                    <div>
                        <button className='btn btn-primary' style={{ marginLeft: "1%" }} onClick={(e) => {
                            e.stopPropagation();
                            setFocusOn(-1);
                            setCardToFocusOn(-1);
                        }}>back to topics</button>
                    </div>
                }
                {cardToFocusOn === -1 &&
                    <div className='button-container'>
                        <button className='button-add-question'
                            onClick={() => {
                                if (!creatingTopic)
                                    setCreatingTopic(true)
                                else
                                    setCreatingTopic(false)
                            }
                            }
                        >
                            <span className='button-text'>{(creatingTopic && 'cancel') || (!creatingTopic && 'Add Topic')}</span>
                        </button>
                        <button className='button-add-question' onClick={() => {
                            if (!selectMode)
                                setSelectMode(true);
                            else
                                setSelectMode(false);
                        }}>
                            <span className='button-text'>{(selectMode && 'cancel') || (!selectMode && 'Select')}</span>
                        </button>
                        <div></div>
                        {selectMode &&
                            <button className='button-delete'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    var newCardData = [];
                                    var newCardsToDelete = [];
                                    cardData.forEach((curCardData) => {
                                        if (!curCardData.selected)
                                            newCardData.push(curCardData);
                                        else
                                            newCardsToDelete.push(curCardData._id);
                                    });
                                    // setSelectMode(false);
                                    setCardData(newCardData);
                                    setCardsToDelete(newCardsToDelete);

                                }}>
                                <span className='button-text'>Delete</span>
                            </button>
                        }
                        {/* {<ChapterMenu />} */}
                    </div>
                }
                {creatingTopic &&
                    <CreateTopic />
                }
                {cardToFocusOn !== -1 &&
                    <FocusOnTopic
                        rootCard={cardToFocusOn}
                    />
                }
                {cardToFocusOn === -1 &&
                    <ul>
                        {cards}
                    </ul>
                }
            </div >
        </div>
    );
}