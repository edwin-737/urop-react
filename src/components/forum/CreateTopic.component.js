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
        <form>
            <textarea
                placeholder='Title of topic'
                style={{ width: "100%", height: "5rem" }}
                ref={refTitle}
            ></textarea>
            <textarea
                placeholder='Elaborate here'
                style={{ width: "100%", height: "20rem" }}
                ref={refBody}
            >
            </textarea>
            <input

                type="submit"
                className="button-createResponse-submit"
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
        </form>
    );
}