import React, { useRef } from 'react';
import axios from 'axios';
const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
const forumPostUrl = host + 'forumPost';
// const userUrl = host + 'user';
export default function CreateTopic(props) {
    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
    const refTitle = useRef();
    const refBody = useRef();
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
                className="btn btn-primary"
                onClick={async (e) => {
                    e.preventDefault();
                    const topicBody = refBody.current.value;
                    const topicTitle = refTitle.current.value;
                    const users = ["638e21d6f9a3d5e98c5c8bb3", "638e21d6f9a3d5e98c5c8bb6",
                        "638e21d6f9a3d5e98c5c8bb8", "63861e4f1ad80b98e92289f7"]
                    const userIndex = randomInt(0, users.length);
                    await axios.post(forumPostUrl + '/add', {
                        body: topicBody,
                        schema_version: 5,
                        isReply: false,
                        postedBy: users[userIndex], //replace with actual signed in user later
                        title: topicTitle,
                    })
                        .then((res) => console.log(res))
                        .catch(err => console.log(err));
                }}
            >
            </input>
        </form>
    );
}