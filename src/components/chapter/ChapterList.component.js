import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as microsoftTeams from "@microsoft/teams-js";
import FocusOnChapter from './FocusOnChapter.compoenent';
import ChapterData from '../helper-functions/data-retrieval/ChapterData';
const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';

const tokenUrl = host + 'token';
// const chapterUrl = host + 'chapter';
// const userUrl = host + 'user';
export default function ChapterList() {
    const [cards, setCards] = useState([]);
    // const [uniqueCards, setUniqueCards] = useState([]);
    // const [retrieves, setRetrieves] = useState(0)
    const [chapterData, setChapterData] = useState([]);
    // const [cardsMade, setCardsMade] = useState(0);
    // const [cardToFocusOn, setCardToFocusOn] = useState(-1);
    const [chapterPage, setChapterPage] = useState(0);
    const [retrieved, setRetrieved] = useState(false);
    const [focusOn, setFocusOn] = useState(-1);
    const [authToken, setAuthToken] = useState({ content: 'nothing' });
    const [username, setUsername] = useState('');
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
        const getTeamsToken = () => {
            microsoftTeams.app.initialize();
            microsoftTeams.authentication.getAuthToken()
                .then(result => {
                    setAuthToken(result);
                    return axios.post(tokenUrl, {
                        token: result,
                    });
                })
                .then(name => {
                    alert('username returned', name)
                    // setUsername(name.data);
                })
                .catch(err => {
                    console.log('error, couldnt get token', err);
                });

        }
        const createChapterCards = () => {
            var createdCards = chapterData.map(curChapterData => {
                return (
                    <li key={curChapterData._id} className='chapter-card-li'>
                        <div className='chapter-card-div'>
                            <div>
                                <span onClick={() => {
                                    setFocusOn(curChapterData._id);
                                    console.log(curChapterData._id);
                                }} className='chapter-card-font'>{curChapterData.name}</span>
                            </div>
                            <div className='chapter-card-button'>
                                <label htmlFor='touch' ><i className="arrow down"></i></label>
                                <button id='touch' className='btn-transparent'>
                                </button>
                            </div>
                        </div>
                    </li>
                );
            });
            return createdCards;
        };

        getTeamsToken();
        setCards(createChapterCards());

    }, [retrieved, chapterData]);
    useEffect(() => {
        if (!chapterData.length)
            return;
        const createChapterPage = () => {
            chapterData.forEach(curChapterData => {
                if (curChapterData._id === focusOn) {
                    console.log('in if (curChapterData._id === focusOn): ', focusOn)
                    setChapterPage(
                        <div>
                            <div className='chapter-page-title-div'>
                                <span className='chapter-page-title-font'>
                                    {curChapterData.name}
                                </span>
                            </div>
                            <div className='chapter-page-post-container'>

                            </div>
                            <div className='chapter-page-title-div'>
                                <span className='chapter-page-title-font'>Related Resources</span>
                            </div>
                            <FocusOnChapter rootChapter={curChapterData} />
                        </div>
                    );
                }
            });
        };
        createChapterPage();
    }, [focusOn, chapterData]);
    return (

        <div className='chapter-card-container'>
            {focusOn !== -1 &&
                <div>
                    <button className='btn btn-primary' style={{ marginLeft: "1%" }} onClick={(e) => {
                        e.stopPropagation();
                        setFocusOn(-1);
                        // setCardToFocusOn(-1);
                    }}>back to topics</button>
                </div>
            }
            {focusOn !== -1 && chapterPage}
            {focusOn === -1 &&
                <ul className='chapter-card-ul'>
                    <span style={{ color: 'rgb(255,255,255)' }}>
                        {cards}
                        {"our authToken"}
                        <br />
                        {JSON.stringify(authToken)}
                        <br />
                        {username}
                    </span>
                </ul>
            }

        </div>
    )
}