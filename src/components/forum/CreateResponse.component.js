import React, { useRef, useState } from 'react';
import axios from 'axios';
const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
const forumPostUrl = host + 'forumPost';
// const userUrl = host + 'user';
export default function CreateResponse(props) {
    const [submitted, setSubmitted] = useState(false);
    const ref = useRef();
    const refresh = () => window.location.reload(true)

    return (
        // <div className='createResponse-div'>
        <div>
            {!submitted && <form className='createResponse-div'>
                <textarea
                    placeholder='write your reply here'
                    className='createResponse-body-textbox'
                    ref={ref}
                >
                </textarea>
                <input
                    type="submit"
                    className="button-createResponse-submit"
                    onClick={async (e) => {
                        e.preventDefault();
                        setSubmitted(true);
                        const responseBody = ref.current.value;
                        await axios.post(
                            forumPostUrl + '/add',
                            {
                                body: responseBody,
                                schema_version: 2,
                                isReply: true,
                                postedBy: "63861e4f1ad80b98e92289f7", //replace with actual signed in user later
                                title: "how to post from the webdite?",

                            }
                        )
                            .then(res => {
                                console.log('res.data', res.data);
                                const id_of_new_reply = res.data._id;
                                return axios.post(forumPostUrl + '/update', {
                                    _id: props.rootCard._id,
                                    addToResponses: id_of_new_reply,
                                })

                            })
                            .then((res) => {
                                console.log(res);
                                refresh();
                            })
                            .catch(err => console.log(err));

                    }}
                >
                </input>
            </form>}

        </div>
    );
}