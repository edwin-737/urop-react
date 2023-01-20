import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListOfTopics from './ListOfTopics.component';
import ChapterData from '../helper-functions/data-retrieval/ChapterData';

// import FocusOnTopic from './FocusOnTopic.component';
// import CreateResponse from './CreateResponse.component';
import 'bootstrap/dist/css/bootstrap.min.css';
const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
const forumPostUrl = host + 'forumPost';
const userUrl = host + 'user';
// const tokenUrl = host + 'token';
export default function Forum(props) {
    const [forumPostCards, setForumPostCards] = useState([]);
    const [forumPostData, setForumPostData] = useState([]);
    const [focusOn, setFocusOn] = useState(-1);
    const [retrieved, setRetrieved] = useState(false);
    const [listOfTopics, setListOfTopics] = useState('');
    const [rendered, setRendered] = useState(false);
    const [chapterData, setChapterData] = useState([]);
    const [retrievedChapterData, setRetrievedChapterData] = useState(false);
    const [chapterOptions, setChapterOptions] = useState([]);
    const [chapterCards, setChapterCards] = useState([]);
    const [addedTags, setAddedTags] = useState([]);
    const [tagCards, setTagCards] = useState([]);
    useEffect(() => {
        if (!addedTags.length) {
            console.log(addedTags.length);
            return;
        }
        var temp = [];
        // setAddedTags([]);
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
        if (!retrieved || !chapterData.length)
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
    }, [retrieved, chapterData, rendered]);
    useEffect(() => {
        //create html cards to display the topics
        const makeTopicCards = () => {
            if (!retrieved || rendered)
                return;
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
    }, [retrieved, rendered, forumPostData, forumPostCards]);
    useEffect(() => {
        if (!chapterData.length || !retrievedChapterData)
            return;
        var temp = [];
        chapterData.forEach(curChapterData => {
            temp.push(<option>
                {curChapterData.name}
            </option>);
        })
        setChapterOptions(temp);
    }, [retrievedChapterData, chapterOptions, chapterData]);
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
        //retrieve all userData using postedBy
        const getUserData = async (topics) => {
            var newTopics = topics;
            var userPromiseArr = [];
            topics.forEach((curTopic) => {
                userPromiseArr.push(axios.post(userUrl + '/findOne', {
                    _id: curTopic.postedBy,
                }));
            });
            await Promise.allSettled(userPromiseArr)
                .then((usersPromiseResult) => {
                    usersPromiseResult.forEach((curUserPromiseResult, index) => {
                        const curUser = curUserPromiseResult.value.data;
                        if (curUserPromiseResult.status === 'fulfilled' && curUser !== null && curUser.username !== null)
                            newTopics[index].username = curUser.username;
                        else
                            newTopics[index].username = 'Anonymous';
                        newTopics[index].hidden = false;
                    })
                })
                .catch(err => console.log(err));

            setForumPostData(newTopics);
            setRetrieved(true);

            return newTopics;
        }
        //retrieve all forumPostData from mongodb
        const getForumPostData = async () => {

            if (retrieved)
                return;
            await axios({
                method: 'get',
                url: forumPostUrl,
            })
                .then(response => {
                    var topics = response.data.filter((curForumPost) => {
                        return !curForumPost.isReply
                    });
                    console.log('all forumPosts retrieved', topics);
                    getUserData(topics);
                })
                .catch(err => console.log(err));
        }
        // getTeamsToken();
        getForumPostData();
    }, [retrieved]);
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

            </div>
        </div >
    );
}