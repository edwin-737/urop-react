
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import ChapterData from '../data-retrieval/ChapterData';
// import ChapterMenu from './ChapterMenu.component';
export default function ChapterMenu(props) {
    const [chapterData, setChapterData] = useState('')
    const [retrieved, setRetrieved] = useState(false);
    const [rendered, setRendered] = useState(false);
    const [chapterCards, setChapterCards] = useState([]);

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
                <li key={curChapterData._id}>
                    {curChapterData.name}
                </li>
            );
        });
        setChapterCards(temp);
        setRendered(true);
    }, [retrieved, chapterData, rendered]);
    return (
        <span className='dropdown dropdown-7'>
            <ul className='dropdown_menu dropdown_menu--animated dropdown_menu-7'>
                {chapterCards}
            </ul>

        </span>
    );

} 