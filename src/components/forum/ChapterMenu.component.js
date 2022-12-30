import React, { useState } from 'react';
import axios from 'axios';
const host = 'https://urop-react-backend.azurewebsites.net/';
const chapterUrl = host + 'chapter';
export default function ChapterMenu(props) {
    const [cards, setCards] = useState([]);
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
                [
                    ...prev,
                    <li key={curChapterData.key}>
                        <div className='chapter-dropdown-li'>
                            {curChapterData.name}
                        </div>
                    </li>
                ]
            )
            return 0;
        });
    }
    getChapterData();
    if (cardsMade < 1)
        setTimeout(makeChapterCards, 600);
    return (
        <div className='chapter-dropdown'>
            <label htmlFor='touch'><p className='chapter-dropdown-font'>&nbsp;chapters&nbsp;&nbsp;<i className="arrow down"></i></p> </label>
            <button id='touch' className='btn-transparent'>
            </button>
            <ul className="slide ">
                {cards}
            </ul>
        </div>
    )
}