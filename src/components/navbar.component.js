import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Forum from './forum/Forum.component';
import Chapters from './chapter/Chapters.component';
export default function Navbar() {
    const [selectForum, setSelectForum] = useState(true);
    const [selectChapters, setSelectChapters] = useState(false);
    return (
        <div>
            <div className="nav">
                <input type="checkbox" id="nav-check" />

                <div className="nav-btn">
                    <label for="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>
                <div className="nav-header">
                    <div className="nav-title">
                        SUTD Portal
                    </div>
                </div>

                <div className='nav-links'>
                    <span onClick={() => {
                        setSelectForum(true);
                        setSelectChapters(false);
                    }}>Forum</span>
                    <span onClick={() => {
                        setSelectForum(false);
                        setSelectChapters(true);
                    }}>Chapter</span>
                </div>
            </div>
            <div>
                {selectForum && <Forum />}
                {selectChapters && <Chapters />}
            </div>
        </div>
    );
}
// export default class Navbar extends Component {
//     render() {
//         return (
//             <div class="nav">
//                 <input type="checkbox" id="nav-check" />
//                 <div class="nav-header">
//                     <div class="nav-title">
//                         SUTD Portal
//                     </div>
//                 </div>
//                 <div class="nav-btn">
//                     <label for="nav-check">
//                         <span></span>
//                         <span></span>
//                         <span></span>
//                     </label>
//                 </div>

//                 <div class="nav-links">
//                     <div >Forum</div>
//                     <div>Chapter</div>
//                 </div>
//             </div>
//         );
//     }
// }