import React, { useState } from 'react';
// import axios from 'axios';
import ChapterList from './ChapterList.component'
export default function Chapters() {
    const [renders, setRenders] = useState(0);
    if (renders < 1) {
        setRenders(1);
        // setTimeout(setShowSearchEngine(true), 3500);

    }
    return (
        <div>
            <div className='component-container'>
                <div className='header'>
                    <div id="title-div">
                        <p id="title-font">Chapters</p>
                    </div>
                </div>
                <div className='main'>
                    <ChapterList />

                    {/* <div className="gcse-search">
                    </div> */}
                </div>
                <div className='search'>
                    <div className='searchbar-container'>
                        <input className='searchbar'>
                        </input>

                    </div>
                </div>
            </div>
        </div>
    );

}