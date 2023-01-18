import React, { useState } from 'react';
// import axios from 'axios';
import ChapterList from './ChapterList.component';
export default function Chapters(props) {
    const [renders, setRenders] = useState(0);
    if (renders < 1)
        setRenders(1);
    return (
        <div>
            <div className='component-container'>
                <div className='header'>
                    <div className="title-div">
                        <div className='title-text-container'>

                            <span className="title-font">Chapters</span>
                            <div className='username-title'>

                                <span className='username-title-font'>{props.userGraphData.displayName}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='main'>

                    <ChapterList />
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