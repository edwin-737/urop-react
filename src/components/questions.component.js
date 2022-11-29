import React, { Component } from 'react';
import axios from 'axios';
// import forumPost from '../../backend/models/forumPost.model';
// const forumPostUrl = 'https://urop-react-backend.azurewebsites.net/forumPost';
const forumPostUrl = 'http://localhost:3001/forumPost';
const userUrl = 'http://localhost:3001/user';
export default class Questions extends Component {
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
                                                {ke}
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
                    processForumPost(forumPost);
                    return 1;
                });
                // console.log(response.data.length);
                // var ke = 0
                // response.data.map(forumPost => {
                //     ke += 1;
                //     const resolve = () => {
                //         if (this.state.changedUsername === true) {
                //             this.setState({
                //                 changedUsername: false,
                //             });
                //         }
                //         else {
                //             throw "no username returned";
                //         }
                //     }
                //     const reject = () => {
                //         return 'anonymous';
                //     }
                //     const handleResolve = () => {
                //         this.setState({
                //             changedUsername: false
                //         });
                //         this.setState(previousState => ({
                //             forumPostCards: [...previousState.forumPostCards,
                //             <li key={ke}>
                //                 <div className="question-card" key={ke}>

                //                     <p className='question-body'>
                //                         {ke}
                //                         {forumPost.body}
                //                         <br />
                //                         <span className='question-card-username'>

                //                             by: {this.state.username}
                //                         </span>
                //                     </p>
                //                 </div>
                //             </li>
                //             ]

                //         }));
                //     }
                //     const handleReject = () => {
                //         this.setState(previousState => ({
                //             forumPostCards: [...previousState.forumPostCards,
                //             <li key={ke}>
                //                 <div className="question-card">
                //                     <p className='question-body'>
                //                         {forumPost.body}
                //                         <br />
                //                         <span className='question-card-username'>
                //                             by: anonymous
                //                         </span>
                //                         {/* */}
                //                     </p>
                //                 </div>
                //             </li>
                //             ]

                //         }));
                //     }
                //     // console.log(forumPost.body);
                //     axios({
                //         method: 'get',
                //         url: userUrl + '/?id=' + forumPost.postedBy,
                //     })
                //         .then((response) => {
                //             response.data.map(user => {
                //                 this.setState({ username: user.username });
                //                 this.setState({
                //                     changedUsername: true,
                //                 });
                //                 console.log(ke, this.state.username);
                //             });
                //         });
                //     var add = new Promise((resolve, reject) => {
                //         // axios({
                //         //     method: 'get',
                //         //     url: userUrl + '/?id=' + forumPost.postedBy,
                //         // })
                //         //     .then((response) => {
                //         //         this.setState({ prevUsername: this.state.username });
                //         //         response.data.map(user => {

                //         //             this.setState({ username: user.username });
                //         //         });
                //         //     });
                //         setTimeout(() => {
                //             resolve();
                //         }, 400);
                //     });
                //     add
                //         .then(handleResolve, handleReject)
                //         .catch(err => console.log(err));
                //     // return 1;
                //     // this.setState(previousState => ({
                //     //     forumPostCards: [...previousState.forumPostCards,
                //     //     <li key={ke}>
                //     //         <div className="question-card">

                //     //             <p className='question-body'>
                //     //                 {forumPost.body}
                //     //                 <br />
                //     //                 <span className='question-card-username'>

                //     //                     by: {this.state.username}
                //     //                 </span>
                //     //                 {/* */}
                //     //             </p>
                //     //         </div>
                //     //     </li>
                //     //     ]

                //     // }));
                //     console.log('right after retrieval: bodies');
                //     return 1;
                // });
                // // console.log(this.state.bodies.length);
                // // this.state.bodies.map(body => {
                // //     console.log('right after retrieval: bodies in loop');
                // //     console.log(body);
                // // })
                // // response.data.map(forumPost => {
                // //     axios({
                // //         method: "get",
                // //         url: userUrl + '/?id=' + forumPost.postedBy,
                // //     })
                // //         .then((response => {
                // //             response.data.map(user => {
                // //                 console.log(user.username);
                // //                 // return 1;
                // //                 this.setState(prev => ({
                // //                     usernames: [
                // //                         user.username, ...prev.usernames
                // //                     ]
                // //                 }));
                // //                 this.state.usernames.map((username) => console.log(username))
                // //                 return 1;
                // //             })
                // //         }))
                // //         .catch(err => console.log(err));
                // // })
                // // console.log(this.state.usernames.length);
                // // this.state.usernames.map(username => {
                // //     console.log('right after retrieval: usernames in loop');
                // //     console.log(username);
                // // })
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