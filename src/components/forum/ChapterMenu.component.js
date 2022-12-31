import React, { useState } from 'react';
import axios from 'axios';
const host = 'https://urop-react-backend.azurewebsites.net/';
const chapterUrl = host + 'chapter';
export default function ChapterMenu(props) {
    const [cards, setCards] = useState([]);
    const [uniqueCards, setUniqueCards] = useState([]);
    const [renders, setRenders] = useState(0)
    const [chapterData, setChapterData] = useState([]);
    const [cardsMade, setCardsMade] = useState(0);
    const getChapterData = async () => {
        if (renders >= 1)
            return 0;
        setRenders(1);
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
        chapterData.map((curChapterData) => {
            if (curChapterData.isSubchapter === true)
                return 0;
            setCards(prev =>
                [...prev, {
                    key: curChapterData._id,
                    card:
                        <li key={curChapterData._id}>
                            <div className='chapter-dropdown-li'>
                                {curChapterData.name}
                            </div>
                        </li>
                }]
            )
            return 0;
        });
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
        <div className='chapter-dropdown'>
            <label htmlFor='touch'><p className='chapter-dropdown-font'>&nbsp;chapters&nbsp;&nbsp;<i className="arrow down"></i></p> </label>
            <button id='touch' className='btn-transparent'>
            </button>
            <ul className="slide ">
                {uniqueCards}
            </ul>
        </div>
    )
}