import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import Forum from './forum/Forum.component';
import Chapters from './chapter/Chapters.component';
import axios from 'axios';
import * as microsoftTeams from "@microsoft/teams-js";
const host = 'https://urop-react-backend.azurewebsites.net/';
const tokenUrl = host + 'token';
export default function Navbar() {
    const [selectForum, setSelectForum] = useState(true);
    const [selectChapters, setSelectChapters] = useState(false);
    const [graphData, setGraphData] = useState({});
    useEffect(() => {
        //retrieve username from azure AD
        const getTeamsToken = () => {
            microsoftTeams.app.initialize();
            microsoftTeams.authentication.getAuthToken()
                .then(tokenFromTeams => {
                    alert(tokenFromTeams);
                    return axios.post(tokenUrl, {
                        token: tokenFromTeams,
                    });
                })
                .then(result => {
                    console.log('result.data.id', result.data.id)
                    setGraphData(result.data);
                })
                .catch(err => {
                    console.log('error, couldnt get token', err);
                });

        }
        getTeamsToken();
    }, [graphData]);
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
                {selectForum && <Forum userGraphData={graphData} />}
                {selectChapters && <Chapters userGraphData={graphData} />}
            </div>


        </div>
    );
}