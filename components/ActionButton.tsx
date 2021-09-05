import React from 'react';
import { Background, Button } from './GlobalElements/ActionButtonElements';

const ActionButton = ({ text, onClick, disabled = false }: {text:string, onClick:any, disabled?:boolean}) => {
    console.log(disabled)
    return (
        <>
        <Background className="bottomOverlay" onClick={onClick}>
            <Button disabled={disabled} color="white" bgcolor={disabled ? 'lightgray' : 'black'}>{text}</Button>
        </Background>
        </>
    );
}

export default ActionButton;
