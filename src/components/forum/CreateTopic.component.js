import React, { useRef } from 'react';
import axios from 'axios';
const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
const forumPostUrl = host + 'forumPost';
// const userUrl = host + 'user';
export default function CreateTopic(props) {
    const refTitle = useRef();
    const refBody = useRef();
    const refresh = () => window.location.reload(true)
    return (
        <div>
            <form className='createTopic-form'>
                <textarea
                    placeholder='Title of topic'
                    className='createTopic-title-input'
                    ref={refTitle}
                ></textarea>
                <textarea
                    placeholder='Elaborate here'
                    className='createTopic-body-input'
                    ref={refBody}
                >
                </textarea>
                <input

                    type="submit"
                    className="createTopic-submit-button"
                    onClick={async (e) => {
                        e.preventDefault();
                        const topicBody = refBody.current.value;
                        const topicTitle = refTitle.current.value;
                        await axios.post(forumPostUrl + '/add', {
                            body: topicBody,
                            schema_version: 5,
                            isReply: false,
                            postedBy: "63861e4f1ad80b98e92289f7", //replace with actual signed in user later
                            title: topicTitle,
                        })
                            .then((res) => {
                                console.log(res);
                                refresh();
                            })
                            .catch(err => console.log(err));
                    }}
                >
                </input>
            </form >
            <div></div>
        </div>
    );
}