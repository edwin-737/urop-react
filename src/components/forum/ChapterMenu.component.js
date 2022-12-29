import React, { useState } from 'react';
export default function ChapterMenu(props) {
    const example_cards = [1, 2, 3, 4]
    const [cards, setCards] = useState([]);
    const [renders, setRenders] = useState(0)
    if (renders < 1) {
        setRenders(1);
        example_cards.map(num => {
            setCards(prev =>
                [
                    ...prev,
                    <li key={num}>
                        <div className='chapter-dropdown-li'>
                            {num}
                        </div>
                    </li>
                ]
            )
            return num;
        });
    }
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