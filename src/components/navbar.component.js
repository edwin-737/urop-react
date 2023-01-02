import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                {/* <button type="button" className="btn shadow-none" data-toggle="collapse" data-target=".collapse navbar-collapse">
                    <span className='icon-bar'></span>
                    <span className='icon-bar'></span>
                    <span className='icon-bar'></span>

                </button> */}
                <Link to='/' className="navbar-brand" >SUTD Portal</Link>
                {/* <div style={{ backgroundColor: 'black' }}> */}

                {/* </div > */}
                <div className="collapse navbar-collapse" >
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Forum</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/chapter" className="nav-link">Chapters</Link>
                        </li>
                    </ul>
                </div>
            </nav >
        );
    }
}