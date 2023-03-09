import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ChapterMenu from './ChapterMenu.component';
import ChapterData from '../helper-functions/data-retrieval/ChapterData';
import CreateTopic from './CreateTopic.component';
import FocusOnTopic from './FocusOnTopic.component';
const host = 'https://urop-react-backend.azurewebsites.net/';
const forumPostUrl = host + 'forumPost/';
export default function ListOfTopics(props) {
    //key=AIzaSyDNNc6A9zEBtUZcme_ZKhqzsCxOJpH5G0k,cx=
    const [creatingTopic, setCreatingTopic] = useState(false);
    const [selectMode, setSelectMode] = useState(false);
    const [cardData, setCardData] = useState(props.forumPostData);
    const [cards, setCards] = useState([]);
    const [focusOn, setFocusOn] = useState(-1);
    const [cardToFocusOn, setCardToFocusOn] = useState(-1);
    const [cardsToDelete, setCardsToDelete] = useState([]);
    const [chapterData, setChapterData] = useState([]);
    const [sidemenu, setSidemenu] = useState('');
    const [retrievedChapterData, setRetrievedChapterData] = useState(false);
    const refresh = () => window.location.reload(true);
    useEffect(() => {
        if (!retrievedChapterData || sidemenu !== '' || !cards.length)
            return;
        var temp = []
        chapterData.forEach(curChapterData => {
            temp.push(
                <span key={curChapterData._id}>
                    {curChapterData.name}
                </span>
            );
        });
        setSidemenu(
            <div className="sidemenu">
                <input type="checkbox" id="sidemenu-check" />
                <div className="sidemenu-btn">
                    <label for="sidemenu-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>

                <div className='sidemenu-links'>
                    {temp}
                </div>
            </div>
        );
    }, [chapterData, retrievedChapterData, cards, sidemenu])

    useEffect(() => {
        if (retrievedChapterData)
            return;
        const fetchData = async () => {
            await ChapterData()
                .then(data => {
                    console.log(data);
                    setChapterData(data);
                    setRetrievedChapterData(true);
                })
                .catch(err => console.log(err));
        }
        fetchData();
    }, [retrievedChapterData, chapterData]);

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
        if (focusOn !== -1 || !chapterData.length)
            return;
        var topicCardStyle = selectMode ? "topic-card-selectMode" : "topic-card";

        const createTagCards = (tagArr) => {
            const tagCards = tagArr.map(curTagData => {
                var tagName = '';
                chapterData.forEach(cur => {
                    if (curTagData === cur._id)
                        tagName = cur.name;
                });
                return (
                    <div className='topic-card-tags-container'>
                        <div className='topic-card-tag'>
                            <span className='topic-card-tag-font'>{tagName}</span>
                        </div>
                    </div>
                )
            });
            return tagCards;
        }
        // const isCreatedBySignedInUser = (card) => {
        //     return props.userGraphData.id === card.postedBy;
        // }
        const togglePropertyOfCardData = (propertyToToggle, idToMatch) => {
            const newArr = cardData.map(curCard => {
                if (curCard._id === idToMatch) {
                    if (!curCard[propertyToToggle]) {
                        curCard[propertyToToggle] = true;
                        return curCard
                    }
                    else {
                        curCard[propertyToToggle] = false;
                        return curCard
                    }
                }
                return curCard
            })
            setCardData(newArr);
        }
        const createTopicCards = () => {

            var createdCards = [];
            cardData.forEach((curCardData, index) => {
                var curTopicCardStyle = topicCardStyle;
                const tagCards = createTagCards(curCardData.tags);
                createdCards.push(
                    <li key={curCardData._id}>
                        <div className={curTopicCardStyle}
                            onClick={(e) => {
                                if (!selectMode)
                                    return;
                                e.stopPropagation();
                                togglePropertyOfCardData("selectMode", curCardData._id);
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
                                    {<span className="material-symbols-outlined"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            togglePropertyOfCardData("editing", curCardData._id);
                                        }}>
                                        edit
                                    </span>}
                                </div>
                                {!cardData[index].editing && <div className='topic-card-button-container'>
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
                                    <div className='topic-card-tags-container'>
                                        {tagCards}
                                    </div>

                                </div>}
                            </div>
                            {cardData[index].editing && <CreateTopic userGraphData={props.userGraphData} />}
                        </div>
                    </li >
                );
            });
            return createdCards;
        };
        setCards(createTopicCards());
    }, [selectMode, cardData, focusOn, chapterData, props.userGraphData]);
    return (
        <div>
            {sidemenu}
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
                                    setCardData(newCardData);
                                    setCardsToDelete(newCardsToDelete);

                                }}>
                                <span className='button-text'>Delete</span>
                            </button>
                        }
                    </div>
                }
                {creatingTopic &&
                    <CreateTopic userGraphData={props.userGraphData} />
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