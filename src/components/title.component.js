// import React from 'react';
export default function title(props) {
    return (

        <div className='header'>
            <div className="title-div">
                <div className='title-text-container'>

                    <span className="title-font">{props.title}</span>
                    <div className='username-title'>

                        <span className='username-title-font'>{props.userGraphData.displayName}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
