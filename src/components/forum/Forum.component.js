import React, { Component } from 'react';
import axios from 'axios';
import ListOfTopics from './ListOfTopics.component';
import FocusOnTopic from './FocusOnTopic.component';
import 'bootstrap/dist/css/bootstrap.min.css';
const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
const forumPostUrl = host + 'forumPost';
const userUrl = host + 'user';
export default class Forum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forumPostCards: [],
            forumPostData: [],
            username: "",
            usernames: [],
            changedUsername: false,
            showReplies: false,
            focusOn: -1,
            postKey: 0,
            replyButton: false,
            showSearchEngine: false,
        };
    }
    componentDidMount() {
        const createCard = (forumPost, body, username) => {
            this.setState(previousState => ({
                forumPostData: [...previousState.forumPostData,
                {
                    key: forumPost._id,
                    body: body,
                    username: username,
                    tags: forumPost.tags,
                    title: forumPost.title,
                    responses: forumPost.responses,
                    cardToDisplayInfFocus:
                        <div className='topic-card' style={{ width: "95%", height: "70%" }}>
                            <div className='topic-card-container'>
                                <div className='topic-card-text-container'>
                                    <span className='response-username-font'>
                                        {username}
                                    </span>
                                    <p className='response-body' >
                                        {forumPost._id}      {body}
                                    </p>
                                </div>

                                <div className='topic-card-button-container'>
                                    <div></div>
                                    <div></div>
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
                    ,
                    cardToDisplay: <li key={forumPost._id}>
                        <div className="topic-card" >
                            <div className='topic-card-container'>
                                <div className='topic-card-text-container'>
                                    <p className='topic-body' >
                                        {body}
                                        <br />
                                        <span className='topic-card-username'>
                                            by: {username}
                                        </span>
                                    </p>
                                </div>
                                <div className='topic-card-button-container'>
                                    <button id="show-replies"
                                        className='button-add-question'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            this.setState({
                                                focusOn: forumPost._id,
                                            });
                                        }}> <span className='chapter-dropdown-font'>see thread</span>
                                    </button>
                                    <div></div>
                                    <div></div>
                                    <button onClick={() => alert('upvote')} style={{ backgroundColor: 'transparent', border: 0 }}>
                                        <img src='images/upvote.png' alt='upvote' style={{ width: '55px', height: '46px' }}></img>
                                    </button>
                                    <button onClick={() => alert('downvote')} style={{ backgroundColor: 'transparent', border: 0 }}>
                                        <img src='images/downvote.png' alt='downvote' style={{ width: '55px', height: '46px' }}></img>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li >
                }
                ]
            }));
        }
        const processForumPost = async (forumPost) => {
            await axios.post(userUrl + '/findOne', {
                _id: forumPost.postedBy,
            })
                .then((response) => {
                    const user = response.data;
                    if (user.username !== null && forumPost.body !== null)
                        createCard(forumPost, forumPost.body, user.username);
                })
        }
        axios({
            method: 'get',
            url: forumPostUrl,
        })
            .then(response => {
                response.data.map(async (forumPost) => {
                    if (forumPost.isReply === true)
                        return 0;
                    await processForumPost(forumPost);
                    return 0;
                });

            })
            .catch(err => console.log(err));
        setTimeout(this.setState({ showSearchEngine: true }), 1500);
    }
    render() {
        var cardToFocusOn = {};
        if (this.state.focusOn !== -1) {
            cardToFocusOn = this.state.forumPostData.filter(card => (card.key === this.state.focusOn))[0];
            cardToFocusOn.layer = 0;
        }
        return (
            <div className='component-container'>
                <div className='header'>
                    <div id="title-div">
                        <p id="title-font">Forum</p>
                    </div>

                </div>
                <div className='main'>
                    {this.state.focusOn !== -1 &&
                        <div style={{ backgroundColor: 'rgb(164, 33, 33)', width: '85.7%' }}>
                            <button className='btn btn-primary' style={{ margin: "0.2%" }} onClick={(e) => {
                                // e.preventDefault();
                                e.stopPropagation();
                                this.setState({
                                    focusOn: -1
                                });
                            }}>back to topics</button>
                        </div>}
                    {this.state.focusOn !== -1 &&
                        <FocusOnTopic
                            rootCard={cardToFocusOn}
                        />
                    }
                    {this.state.focusOn === -1 &&
                        <ListOfTopics
                            forumPostCards={{
                                cards: this.state.forumPostData.map(card => card.cardToDisplay),
                                creatingTopic: false,
                            }}
                        />
                    }
                </div>
                <div className='search'>
                    <div style={{ border: "1px solid blue;" }}>
                        Area 1 (for example a sidebar)
                        <div className="gcse-searchbox"></div>
                    </div>

                    <div style={{ border: "1px solid red;" }}>
                        {/* Area 2 (for example main area of the page) */}
                        <div className="gcse-searchresults" style={{ backgroundColor: 'rgb(0,0,0)' }}></div>
                    </div>
                    {/* <div className='gcse-search'></div> */}
                    {/* <div className="gcse-searchbox">
                    </div>

                    <div className="gcse-searchresults"></div> */}
                    <div className='searchbar-container'>
                        <input className='searchbar' placeholder='Search Posts'>
                        </input>
                    </div>

                </div>
            </div >
        );

    }
}