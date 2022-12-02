import React, { Component, useState } from 'react';
import axios from 'axios';
// import Replies from './replies.component';
// import forumPost from '../../backend/models/forumPost.model';
// const host='https://urop-react-backend.azurewebsites.net/';
const host = 'http://localhost:3001/';
// const forumPostUrl = 'https://urop-react-backend.azurewebsites.net/forumPost';
const forumPostUrl = host + 'forumPost';
const userUrl = host + 'user';
function ZoomIntoTopic(props) {
    var cards = [];
    props.forumPostResponseCards.map((item) => {
        if (item.key === props.forumPostKey)
            cards.push(item.card);
        return 1;
    });
    return (

        <div id="questions-container">
            <div id="reply-card">
                {props.forumPostCard}
                <div id="reply-title-div">
                    <ul>
                        {cards}
                    </ul>
                </div>
            </div>

        </div>
    );
}
function ListOfTopics(props) {
    //props: {forumPostCards}
    return (
        <div id="questions-container">
            <div id="forumPost-title-div">
                <p id="topic-title-font">Forum Posts</p>
            </div>

            <button className='button-add-question'><span className='button-text'>Add Question</span></button>
            <button className='button-add-question' ><span className='button-text'>Select</span></button>
            <ul>
                {props.forumPostCards}
            </ul>
        </div>
    );
}
export default class Topics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forumPostCards: [],
            forumPostResponseCards: [],
            bodies: [],
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
        var masterKey = 0;
        var k = 0;
        const processForumPost = (forumPost, postKey) => {
            axios.post(userUrl + '/findOne', {
                _id: forumPost.postedBy,
            })
                .then((response) => {
                    const handleResolve = (b, u) => {
                        this.setState(previousState => ({
                            forumPostCards: [...previousState.forumPostCards,
                            <li key={postKey}>
                                <div className="topic-card" key={postKey}>
                                    <p className='topic-body' key={postKey}>
                                        {postKey} {b}
                                        <br />
                                        <span className='topic-card-username'>
                                            by: {u}
                                        </span>
                                    </p>
                                    <button id="show-replies"
                                        className='btn btn-primary'
                                        onClick={() => {
                                            this.setState({
                                                focusOn: postKey,
                                            });
                                        }}> show replies
                                    </button>
                                    <button className='upvote-button'></button>
                                    <button className='downvote-button'></button>
                                </div>
                            </li >
                            ]
                        }));
                    }
                    const updateUsername = (username, body) => {
                        handleResolve(body, username);
                    }
                    var user = response.data;
                    if (user.username !== null && forumPost.body !== null)
                        updateUsername(user.username, forumPost.body);
                })
                .then(() => {
                    forumPost.responses.map(responseId => {
                        axios.post(
                            forumPostUrl + '/findOne',
                            { _id: responseId })
                            .then(response => {

                                k += 1;
                                var reply = response.data;
                                console.log('each reply body', reply.body);
                                this.setState((prev) => ({
                                    forumPostResponseCards:
                                        [
                                            ...prev.forumPostResponseCards,
                                            {
                                                key: postKey,
                                                card:
                                                    <li key={k}>
                                                        <div key={k} className='reply-card'>
                                                            <p className='reply-body' key={k}>
                                                                {postKey}   {k}   {reply.body}
                                                            </p>
                                                            <button id="show-replies"
                                                                className='btn btn-primary'
                                                                onClick={() => {
                                                                    this.setState({
                                                                        focusOn: postKey,
                                                                    });
                                                                }}> show replies
                                                            </button>
                                                            <button className='upvote-button'></button>
                                                            <button className='downvote-button'></button>
                                                        </div>
                                                    </li>
                                            }
                                        ]
                                }));
                            });
                        return 1;
                    });
                })
        }
        axios({
            method: 'get',
            url: forumPostUrl,
        })
            .then((response => {

                response.data.map(forumPost => {
                    if (forumPost.isReply === true)
                        return 0;
                    processForumPost(forumPost, masterKey);
                    masterKey += 1;
                    return 1;
                });

            }));
    }
    render() {
        if (this.state.focusOn != -1) {
            return (
                <div>
                    <div id="title-div">
                        <p id="title-font">Questions</p>
                    </div>
                    <button className='btn btn-primary' onClick={() => this.setState({
                        focusOn: -1
                    })}>back to topics</button>
                    <div className='grid-container'>
                        <div className='grid-item grid-item-1'>
                            <ZoomIntoTopic
                                forumPostCard={this.state.forumPostCards[this.state.focusOn]}
                                forumPostKey={this.state.focusOn}
                                forumPostResponseCards={this.state.forumPostResponseCards}
                            />
                        </div>
                    </div >
                </div>
            );
        }
        else {
            return (
                <div>
                    <div id="title-div">
                        <p id="title-font">Questions</p>
                    </div>
                    <div className='grid-container'>
                        <div className='grid-item grid-item-1'>
                            <ListOfTopics
                                forumPostCards={this.state.forumPostCards}
                            />
                        </div>
                    </div >
                </div>
            );
        }
    }
}