import React from 'react';
import './header.scss';
import { Jumbotron } from 'react-bootstrap';

function Header () {

    return (
        <Jumbotron>
            <div className='content'>
                <h1 className='title'>
                    Hi! It's your to do list
                </h1>
            </div>
        </Jumbotron>
    )
}

export default Header;