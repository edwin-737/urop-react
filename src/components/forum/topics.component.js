import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import ListOfTopics from './ListOfTopics.component';
import FocusOnTopic from './FocusOnTopic.component';
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
                            <button className='upvote-button'></button>
                            <button className='downvote-button'></button>
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
                    <p id="title-font">Questions</p>
                </div>
                <button className='btn btn-primary' onClick={(e) => {
                    // e.preventDefault();
                    e.stopPropagation();
                    this.setState({
                        focusOn: -1
                    });
                }}>back to topics</button>
                <div className='grid-container'>
                    <div className='grid-item grid-item-1'>
                        {this.state.focusOn !== -1 && <FocusOnTopic
                            rootCard={cardToFocusOn}
                        />}
                        {this.state.focusOn === -1 && <ListOfTopics
                            forumPostCards={this.state.forumPostData.map(card => card.cardToDisplay)}
                        />}
                    </div>
                </div >
            </div>
        );

    }
}