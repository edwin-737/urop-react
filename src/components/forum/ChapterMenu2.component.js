import React, { useEffect, useState } from 'react';
import axios from 'axios';
const host = 'https://urop-react-backend.azurewebsites.net/';
const chapterUrl = host + 'chapter';
export default function ChapterMenu2(props) {
    const [chapterData, setChapterData] = useState([]);
    const [chapterCards, setChapterCards] = useState([]);
    const [retrieved, setRetrieved] = useState(false);
    const [rendered, setRendered] = useState(false);
    useEffect(() => {
        if (!chapterData.length || rendered)
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
    }, [chapterData, rendered]);
    useEffect(() => {
        if (retrieved)
            return;
        const getChapterData = async () => {
            await axios({
                method: 'get',
                url: chapterUrl,
            })
                .then(items => {
                    console.log('in getChapterData items.data', items.data);
                    setChapterData(items.data);
                    setRetrieved(true);
                })
                .catch(err => console.log(err));
        }
        getChapterData();
    }, [retrieved]);
    return (

        <span className='dropdown dropdown-7'>
            +
            <ul className="dropdown_menu dropdown_menu--animated dropdown_menu-7">
                {chapterCards}
            </ul>
        </span>
    )
}