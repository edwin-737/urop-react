import * as React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
const studentUrl = 'https://urop-react-backend.azurewebsites.net/student';
function Questions() {
    // function alertUpdate() {
    //     alert("updated");
    // }

    /*----- Added code ----*/
    const [studentData, setStudentData] = useState([]);
    useEffect(() => {
        Axios.get(studentUrl)
            .then((res) => {
                setStudentData(res.data.map(k => k.username));
            });
    }, []);
    // const [questionCardArray, setQuestionCardArray] = useState([]);

    // var studentUsernameArr = [];
    // var cardsArr = [];
    return (
        <div id="title-div">
            <p id="title-font">Questions</p>
            <div id="questions-container">
                <div id="question-title-div">
                    <p id="question-title-font"> Student Queries</p>
                </div>
                <div className="question-card">
                    <p className='question-body'>
                        Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                        nulla parilorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit,
                        sed quia non numquam [do] eius m
                        <br />
                        by:{studentData}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Questions;