import React, { useRef } from 'react';
import axios from 'axios';
const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
const forumPostUrl = host + 'forumPost';
// const userUrl = host + 'user';
export default function CreatePost(props) {
    const ref = useRef();
    return (
        <form>
            <textarea
                placeholder='write your reply here'
                style={{ width: "38rem", height: "20rem" }}
                ref={ref}
            >
            </textarea>
            <input
                style={{ position: 'relative', top: '1.5rem', left: '-38rem' }}
                type="submit"
                className="btn btn-primary"
                onClick={async (e) => {
                    e.preventDefault();
                    const responseBody = ref.current.value;
                    await axios.post(
                        forumPostUrl + '/add',
                        {
                            body: responseBody,
                            schema_version: 2,
                            isReply: true,
                            postedBy: "63861e4f1ad80b98e92289f7",
                            title: "how to post from the webdite?",

                        }
                    )
                        .then(res => {
                            console.log('res.data', res.data);
                            const id_of_new_reply = res.data._id;
                            return axios.post(forumPostUrl + '/update', {
                                _id: props.rootCard.key,
                                addToResponses: id_of_new_reply,
                            })

                        })
                        .then(response => console.log('response after update', response));
                }}
            >
            </input>
        </form>
    );
}