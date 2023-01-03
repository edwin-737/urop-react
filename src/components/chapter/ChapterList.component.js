import React, { useState } from 'react';
import axios from 'axios';
import FocusOnChapter from './FocusOnChapter.compoenent';
const host = 'https://urop-react-backend.azurewebsites.net/';
// const host = 'http://localhost:3001/';
const chapterUrl = host + 'chapter';
// const userUrl = host + 'user';
export default function ChapterList() {
    const [cards, setCards] = useState([]);
    const [uniqueCards, setUniqueCards] = useState([]);
    const [retrieves, setRetrieves] = useState(0)
    const [chapterData, setChapterData] = useState([]);
    const [cardsMade, setCardsMade] = useState(0);
    const [cardToFocusOn, setCardToFocusOn] = useState(-1);
    const [chapterPage, setChapterPage] = useState(0);
    const getChapterData = async () => {
        if (retrieves >= 1)
            return 0;
        setRetrieves(1);
        await axios.get(chapterUrl)
            .then((res) => {
                res.data.map(item => {
                    setChapterData(prev => [...prev, item]);
                    return 0;
                })
            })
            .catch(err => console.log(err));
    }
    const makeChapterCards = () => {
        if (cardsMade >= 1)
            return 0;
        setCardsMade(1);
        console.log('makeChapterCards', chapterData);
        chapterData.map((curChapterData, index) => {
            if (curChapterData.isSubchapter === true)
                return 0;
            setCards(prev =>
                [...prev, {
                    key: curChapterData._id,
                    card:
                        <li key={curChapterData._id} className='chapter-card-li'>
                            <div className='chapter-card-div'>
                                <div>
                                    <span onClick={() => {
                                        setCardToFocusOn(index);
                                        makeChapterPage(index);
                                    }} className='chapter-card-font'>{curChapterData.name}</span>
                                </div>
                                <div className='chapter-card-button'>
                                    <label htmlFor='touch' ><i className="arrow down"></i></label>
                                    <button id='touch' className='btn-transparent'>
                                    </button>
                                </div>
                            </div>
                        </li>
                }]
            )
            return 0;
        });
    }
    const makeChapterPage = (index) => {
        setChapterPage(
            <div>
                <div className='chapter-page-title-div'>
                    <span className='chapter-page-title-font'>
                        {chapterData[index].name}
                    </span>
                </div>
                <div className='chapter-page-post-container'>

                </div>
                <div className='chapter-page-title-div'>
                    <span className='chapter-page-title-font'>Related Resources</span>
                </div>
                <FocusOnChapter rootChapter={chapterData[index]} />
            </div>
        )
    }
    const ensureCardsUnique = () => {
        setCardsMade(2);
        var done = {}
        var temp = [];
        cards.map(card => {
            if (card.key in done)
                return 0;
            done[card.key] = 1;
            temp.push(card.card)
            return 0
        })
        console.log('temp length', temp.length)
        setUniqueCards(temp);
    }
    getChapterData();
    if (cardsMade < 1)
        setTimeout(makeChapterCards, 1400);
    if (cardsMade === 1)
        ensureCardsUnique();
    setTimeout(() => console.log('uniqueCards', uniqueCards.length), 1400);
    return (

        <div className='chapter-card-container'>
            {cardToFocusOn !== -1 && chapterPage}
            {cardToFocusOn === -1 &&
                <ul className='chapter-card-ul'>
                    {uniqueCards}
                </ul>
            }

        </div>
    )
}