import React, { useEffect, useState } from 'react';
import ListOfTopics from './ListOfTopics.component';
import ChapterData from '../helper-functions/data-retrieval/ChapterData';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForumPostData from '../helper-functions/data-retrieval/ForumData';
export default function Forum(props) {
    const [forumPostCards, setForumPostCards] = useState([]);
    const [forumPostData, setForumPostData] = useState([]);
    const [focusOn, setFocusOn] = useState(-1);
    const [retrievedForumPostData, setRetrievedForumPostData] = useState(false);
    const [listOfTopics, setListOfTopics] = useState('');
    const [rendered, setRendered] = useState(false);
    const [chapterData, setChapterData] = useState([]);
    const [retrievedChapterData, setRetrievedChapterData] = useState(false);
    const [chapterCards, setChapterCards] = useState([]);
    const [addedTags, setAddedTags] = useState([]);
    const [tagCards, setTagCards] = useState([]);
    useEffect(() => {
        if (!addedTags.length) {
            console.log(addedTags.length);
            return;
        }
        var temp = [];
        console.log('all addedTags in useEffect', addedTags);
        addedTags.forEach((curTag, index) => {
            temp.push(
                <div className='searcbar-addedTag-item'>
                    <span className='addedTag-font'>{curTag.name}</span>
                    <span className='eraseTag' onClick={(e) => {
                        e.stopPropagation();
                        var newAddedTags = [];
                        addedTags.forEach((nestedCurTag, nestedIndex) => {
                            if (nestedIndex === index) {
                                console.log('nestedIndex', nestedIndex);
                                return;
                            }
                            newAddedTags.push(nestedCurTag);
                        });
                        console.log('newAddedTags', newAddedTags);
                        setAddedTags(newAddedTags);
                    }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        X
                    </span>
                </div>
            )
        })
        setTagCards(temp);
    }, [addedTags]);
    useEffect(() => {
        if (!retrievedForumPostData || !chapterData.length)
            return;
        var temp = [];
        console.log('all chapterData', chapterData);
        chapterData.forEach(curChapterData => {
            temp.push(
                <li key={curChapterData._id} onClick={() => {
                    setAddedTags(prev => [...prev, {
                        _id: curChapterData._id,
                        name: curChapterData.name
                    }]);
                }}>
                    {curChapterData.name}
                </li>
            );
        });
        setChapterCards(temp);
        setRendered(true);
    }, [retrievedForumPostData, chapterData]);
    useEffect(() => {
        //create html cards to display the topics
        const makeTopicCards = () => {
            if (!retrievedForumPostData || rendered)
                return;
            setForumPostData([]);
            setListOfTopics('');
            forumPostData.forEach((curForumPostData) => {
                setForumPostCards(prev =>
                    [
                        ...prev,
                        <li key={curForumPostData._id}>
                            <div className="topic-card">
                                <div className='topic-card-container'>
                                    <div className='topic-card-text-container'>
                                        <div>
                                            <p className='topic-body' >
                                                {curForumPostData.body}
                                                <br />
                                                <span className='topic-card-username'>
                                                    by: {curForumPostData.username}
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
                                                setFocusOn(curForumPostData._id);
                                            }}> <span className='topic-card-see-thread-font'>see thread</span>
                                        </button>
                                        <div></div>

                                    </div>
                                </div>
                            </div>
                        </li >
                    ]
                )
            }
            );
            setListOfTopics(<ListOfTopics
                forumPostCards={forumPostCards}
                forumPostData={forumPostData}
            />);
            setRendered(true);
        }
        makeTopicCards();
    }, [retrievedForumPostData, rendered, forumPostData, forumPostCards]);

    //retrieve chapter data
    useEffect(() => {
        if (retrievedChapterData)
            return;
        const retrieveChapterData = async () => {
            await ChapterData()
                .then(data => {
                    setChapterData(data);
                    setRetrievedChapterData(true);
                })
                .catch(err => console.log(err));
        }
        retrieveChapterData();
    }, [retrievedChapterData, chapterData]);
    //retrieve forumPostData
    useEffect(() => {
        if (retrievedForumPostData)
            return;
        const retrieveForumPostData = async () => {
            await ForumPostData()
                .then(data => {
                    setForumPostData(data);
                    setRetrievedForumPostData(true);
                })
                .catch(err => console.log(err));
        }
        retrieveForumPostData();

    }, [retrievedForumPostData]);
    return (
        <div className='component-container'>
            <div className='header'>

                <div className="title-div">
                    <div className='title-text-container'>

                        <span className="title-font">Forum</span>
                        <div className='username-title'>

                            <span className='username-title-font'>{props.userGraphData.displayName}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='main'>
                {
                    focusOn !== -1 &&
                    <div style={{ width: '87%' }}>
                        <button className='btn btn-primary' style={{ margin: "0.2%" }} onClick={(e) => {
                            // e.preventDefault();
                            e.stopPropagation();
                            setFocusOn(-1)
                        }}>back to topics</button>
                    </div>
                }
                {
                    focusOn === -1 &&
                    listOfTopics
                }
            </div>

            <div className='search'>
                <div className='searchbar-container'>
                    <input className='searchbar' placeholder='Search Posts'>
                    </input>
                    <div className='searcbar-tags-div'>
                        <span className='createTopic-tags-font'>Tags:</span>
                        <div className='searchbar-addedTag-container'>
                            {tagCards}
                        </div>
                        <span className='dropdown dropdown-7'>
                            <span>&nbsp;+</span>
                            <ul className='dropdown_menu dropdown_menu--animated dropdown_menu-7'>
                                {chapterCards}
                            </ul>
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => {
                        // var newForumPostData = [];
                        console.log('forumPostCards', forumPostCards);

                    }}
                >
                    search
                </button>

            </div>
        </div >
    );
}