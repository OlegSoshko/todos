import React from 'react';
import './header.scss';
import { Jumbotron } from 'react-bootstrap';
import { IHeaderProps } from './types';

function Header (props: IHeaderProps) {
    const {
        title = '',
    } = props;

    return (
        <div className='header'>
            <Jumbotron>
                <h1 className='title'>
                    { title }
                </h1>
            </Jumbotron>
        </div>
    )
}

export default Header;