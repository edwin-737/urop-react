
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ChapterData from '../helper-functions/data-retrieval/ChapterData';
const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
const forumPostUrl = host + 'forumPost';
// const userUrl = host + 'user';
export default function CreateTopic(props) {
    const refTitle = useRef();
    const refBody = useRef();
    const refresh = () => window.location.reload(true);

    const [retrieved, setRetrieved] = useState(false);
    const [rendered, setRendered] = useState(false);
    const [chapterData, setChapterData] = useState([]);
    const [chapterCards, setChapterCards] = useState([]);
    const [addedTags, setAddedTags] = useState([]);
    const [tagCards, setTagCards] = useState([]);
    useEffect(() => {
        if (retrieved)
            return;
        const fetchData = async () => {
            await ChapterData()
                .then(data => {
                    setChapterData(data);
                    setRetrieved(true);
                })
                .catch(err => console.log(err));
        }
        fetchData();

    }, [retrieved, chapterData]);
    useEffect(() => {
        if (!retrieved || !chapterData.length)
            return;
        var temp = [];
        console.log('all chapterData', chapterData);
        chapterData.forEach(curChapterData => {
            temp.push(
                <li key={curChapterData._id} onClick={() => {
                    setAddedTags(prev => [...prev, {
                        _id: curChapterData._id,
                        name: curChapterData.name
                    }]);
                }}>
                    {curChapterData.name}
                </li>
            );
        });
        setChapterCards(temp);
        setRendered(true);
    }, [retrieved, chapterData, rendered]);
    useEffect(() => {
        if (!addedTags.length)
            return;
        var temp = [];
        console.log('all addedTags in useEffect', addedTags);
        addedTags.forEach((curTag) => {
            temp.push(
                <span className='addedTag-item'>
                    <span className='addedTag-font'>{curTag.name}</span>
                </span>
            )
        })
        setTagCards(temp);
    }, [addedTags])
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
                            tags: addedTags,
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
            <div className='createTopic-tags-div'>
                <span className='createTopic-tags-font'>Tags:</span>
                <div className='addedTag-container'>
                    {tagCards}
                </div>
                <span className='dropdown dropdown-7'>
                    <span style={{ width: '300px' }}>&nbsp;+</span>
                    <ul className='dropdown_menu dropdown_menu--animated dropdown_menu-7'>
                        {chapterCards}
                    </ul>
                </span>
            </div>
        </div>
    );
}