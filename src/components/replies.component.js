import React, { Component } from 'react';
import axios from 'axios';
// const host='https://urop-react-backend.azurewebsites.net/';
const host = 'http://localhost:3001/';
// const forumPostUrl = 'https://urop-react-backend.azurewebsites.net/forumPost';
const forumPostUrl = host + 'forumPost';
const userUrl = host + 'user';
export default class Replies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forumPostCards: [],
            bodies: [],
            username: "",
            usernames: [],
            changedUsername: false,
        };
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: forumPostUrl,
        })
            .then((response => {
                var ke = 0;
                const processForumPost = (forumPost) => {
                    axios.post(userUrl + '/findOne', {
                        _id: forumPost.postedBy,
                    })
                        .then((response) => {
                            const handleResolve = (b, u) => {
                                ke += 1;
                                this.setState(previousState => ({
                                    forumPostCards: [...previousState.forumPostCards,
                                    <li key={ke}>
                                        <div className="question-card" key={ke}>
                                            <p className='question-body'>
                                                {b}
                                                <br />
                                                <span className='question-card-username'>
                                                    by: {u}
                                                </span>
                                            </p>
                                        </div>
                                    </li>
                                    ]

                                }));
                            }
                            const updateUsername = (username, body) => {
                                handleResolve(body, username);
                                console.log(ke, username);
                            }
                            var user = response.data;
                            console.log(user.username);
                            updateUsername(user.username, forumPost.body);
                        });
                }
                response.data.map(forumPost => {
                    console.log('bodies length', this.state.bodies.length);
                    if (forumPost.isReply == true)
                        return 0;
                    processForumPost(forumPost);
                    return 1;
                });
            }));

    }
    render() {
        return (
            <div>
                <div id="title-div">
                    <p id="title-font">Questions</p>
                </div>
                <div className='grid-container'>

                    <div className='grid-item grid-item-1'>
                        <div id="questions-container">
                            <div id="question-title-div">
                                <p id="question-title-font"> Student Queries</p>
                            </div>

                            <button className='button-add-question'><span className='button-text'>Add Question</span></button>
                            <button className='button-add-question' ><span className='button-text'>Select</span></button>
                            <ul>
                                {this.state.forumPostCards}
                            </ul>
                            {/* <div className="question-card">

                                <p className='question-body'>
                                    {this.state.body}
                                    <br />
                                    by:
                                    <span className='question-card-username'>
                                    </span>
                                </p>
                            </div> */}
                        </div>
                    </div>
                </div >
            </div>
        );
    }
}