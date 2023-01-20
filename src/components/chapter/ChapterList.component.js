import React, { useState, useEffect } from 'react';
import FocusOnChapter from './FocusOnChapter.compoenent';
import ChapterData from '../helper-functions/data-retrieval/ChapterData';
export default function ChapterList() {
    const [cards, setCards] = useState([]);
    const [chapterData, setChapterData] = useState([]);
    const [chapterPage, setChapterPage] = useState(0);
    const [retrieved, setRetrieved] = useState(false);
    const [focusOn, setFocusOn] = useState(-1);
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
                                {/* <button id='touch' className='btn-transparent'>
                                </button> */}
                            </div>
                        </div>
                    </li>
                );
            });
            return createdCards;
        };

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
                    </span>
                </ul>
            }

        </div>
    )
}