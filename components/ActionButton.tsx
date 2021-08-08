import React from 'react';
import { Background, Button } from './GlobalElements/ActionButtonElements';

const ActionButton = ({ text, onClick }: {text:string, onClick:any}) => {
    return (
        <>
        <Background className="bottomOverlay" onClick={onClick}>
            <Button color="white" bgcolor="black">{text}</Button>
        </Background>
        </>
    );
}

export default ActionButton;
