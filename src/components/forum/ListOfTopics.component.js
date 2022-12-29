import React, { useState } from 'react';
import CreateTopic from './CreateTopic.component';
import ChapterMenu from './ChapterMenu.component';
// import axios from 'axios';
// const host='https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
// const forumPostUrl = host + 'forumPost';
// const userUrl = host + 'user';
export default function ListOfTopics(props) {
    const [creatingTopic, setCreatingTopic] = useState(false)

    return (
        <div id="forumPost-container">
            <div id="forumPost-title-div">
                <p id="topic-title-font">Forum Posts</p>
            </div>

            <button className='btn btn-primary m-2 btn-lg'
                onClick={() => setCreatingTopic(true)}
            >
                Add Question
            </button>
            <button className='btn btn-primary m-2 btn-lg' >
                Select
            </button>
            <div style={{ position: 'relative', left: '19vmax', bottom: '4vmax' }}>
                {<ChapterMenu />}
            </div>
            {creatingTopic && <CreateTopic />}
            <ul>
                {props.forumPostCards.cards}
            </ul>
        </div>
    );
}