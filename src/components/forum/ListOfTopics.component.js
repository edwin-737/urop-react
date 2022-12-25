import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
// const host='https://urop-react-backend.azurewebsites.net/';
const host = 'http://localhost:3001/';
const forumPostUrl = host + 'forumPost';
const userUrl = host + 'user';
export default function ListOfTopics(props) {
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