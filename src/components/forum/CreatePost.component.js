import React, { Component, useEffect, useState, useRef } from 'react';
import axios from 'axios';
// const host='https://urop-react-backend.azurewebsites.net/';
const host = 'http://localhost:3001/';
const forumPostUrl = host + 'forumPost';
const userUrl = host + 'user';
export default function CreatePost(props) {
    const ref = useRef();
    const uploadResponse = (e) => {
        const responseBody = ref.current.value;
        axios.post(
            forumPostUrl + '/add',
            {
                body: responseBody,
                schema_version: 2,

            }
        )
        axios.post(
            forumPostUrl + '/update',
            {
                _id: props.rootCard

            }
        )
    }
    return (
        <form>
            <textarea
                placeholder='write your reply here'
                style={{ width: "38rem", height: "20rem" }}
                ref={ref}
            >
            </textarea>
            <input
                type="submit"
                class="btn btn-primary"
                onSubmit={uploadResponse()}
            >
            </input>
        </form>
    );
}