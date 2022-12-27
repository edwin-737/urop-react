import React, { Component } from 'react';
import axios from 'axios';
import ListOfTopics from './ListOfTopics.component';
import FocusOnTopic from './FocusOnTopic.component';
import 'bootstrap/dist/css/bootstrap.min.css';
const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
const forumPostUrl = host + 'forumPost';
const userUrl = host + 'user';
export default class Topics extends Component {
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
                    responses: forumPost.responses,
                    cardToDisplay: <li key={forumPost._id}>
                        <div className="topic-card" >
                            <p className='topic-body' >
                                {body}
                                <br />
                                <span className='topic-card-username'>
                                    by: {username}
                                </span>
                            </p>
                            <button id="show-replies"
                                className='btn btn-primary'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    this.setState({
                                        focusOn: forumPost._id,
                                    });
                                }}> see thread
                            </button>
                            <button style={{ backgroundColor: 'transparent', border: 0, position: 'relative', left: '45vmax', bottom: '6vmax' }}>
                                <img src='images/upvote.png' alt='upvote' style={{ width: '52px', height: '46px' }}></img>
                            </button>
                            <button style={{ backgroundColor: 'transparent', border: 0, position: 'relative', left: '40.8vmax', bottom: '1vmax' }}>
                                <img src='images/downvote.png' alt='downvote' style={{ width: '52px', height: '46px' }}></img>
                            </button>
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
    }
    render() {
        var cardToFocusOn = '';
        if (this.state.focusOn !== -1) {
            cardToFocusOn = this.state.forumPostData.filter(card => (card.key === this.state.focusOn))[0]
        }
        return (
            <div>
                <div id="title-div">
                    <p id="title-font">Forum</p>
                </div>
                {this.state.focusOn !== -1 && <button className='btn btn-primary' onClick={(e) => {
                    // e.preventDefault();
                    e.stopPropagation();
                    this.setState({
                        focusOn: -1
                    });
                }}>back to topics</button>}
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm'>
                            {this.state.focusOn !== -1 &&
                                <div id="forumPost-container">
                                    <FocusOnTopic
                                        rootCard={cardToFocusOn}
                                    />
                                </div>
                            }
                            {this.state.focusOn === -1 &&
                                <ListOfTopics
                                    forumPostCards={this.state.forumPostData.map(card => card.cardToDisplay)}
                                />}
                        </div>
                        <div className='col-sm'>
                            <div className='searchbar-container'>
                                <input className='searchbar'>
                                </input>
                            </div>

                        </div>
                    </div>
                </div >
            </div>
        );

    }
}