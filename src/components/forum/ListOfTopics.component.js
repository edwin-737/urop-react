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
            {/* <div id="forumPost-title-div">
                <p id="topic-title-font">Forum Posts</p>
            </div> */}
            <div className='button-container'>
                <button className='button-add-question'
                    onClick={() => setCreatingTopic(true)}
                >
                    <p className='chapter-dropdown-font'>Add Question</p>
                </button>
                <button className='button-add-question' >
                    <p className='chapter-dropdown-font'>Select</p>
                </button>
                {<ChapterMenu />}
            </div>
            {creatingTopic && <CreateTopic />}
            <ul>
                {props.forumPostCards.cards}
            </ul>
        </div >
    );
}