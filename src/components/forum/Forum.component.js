import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListOfTopics from './ListOfTopics.component';
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
    // const [userGraphData, setUserGraphData] = useState({});
    // const [username, setUsername] = useState('');
    useEffect(() => {
        //create html cards to display the topics
        const makeTopicCards = () => {
            if (!retrieved || rendered)
                return;
            console.log('makeTopicCards length of forumPostData', forumPostData.length);
            console.log('before making html cards forumPostData', forumPostData);
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
    //retrieve forumPostData
    useEffect(() => {
        // //retrieve username from azure ad
        // const getTeamsToken = () => {
        //     microsoftTeams.app.initialize();
        //     microsoftTeams.authentication.getAuthToken()
        //         .then(result => {
        //             // setAuthToken(result);
        //             return axios.post(tokenUrl, {
        //                 token: result,
        //             });
        //         })
        //         .then(result => {
        //             console.log('result.data.id', result.data.id)
        //             setUserGraphData(result.data);
        //         })
        //         .catch(err => {
        //             console.log('error, couldnt get token', err);
        //         });

        // }
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
                </div>

            </div>
        </div >
    );
}