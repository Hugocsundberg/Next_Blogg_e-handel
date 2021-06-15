import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { BlurDiv, OptionText, BottomContainer, Cart, Hamburger, ImageDiv, Logo, OptionDiv, Spacer } from './elements'
import { Options } from './config'

const Post = () => {
    const [ isExpanded, setIsExpanded ] = useState(false)
    const burgerHandler = () => {
        setIsExpanded(!isExpanded)
    }

    useEffect(()=>{
        console.log(isExpanded)
    }, [isExpanded])

    return (
        <>
        <Spacer/>
        <BlurDiv isExpanded={isExpanded}>
            {Options.map((option, key)=>(
                <OptionDiv key={key}>
                <ImageDiv>
                    <Image
                        src={option.image}
                        alt={option.text}
                        layout="fill"
                        objectFit="contain"
                    />
                </ImageDiv>
                <OptionText>
                    {option.text}
                </OptionText>
            </OptionDiv>
            ))}
            <BottomContainer>
                <Hamburger onClick={burgerHandler}>
                    <Image
                        src="/hamburger.svg"
                        alt="hamburger"
                        layout="fill"
                        objectFit="contain"
                    />
                </Hamburger>
                <Logo>Marina Sundberg</Logo>
                <Cart>
                    <Image
                        src="/cart.svg"
                        alt="hamburger"
                        layout="fill"
                        objectFit="contain"
                    />
                </Cart>
            </BottomContainer>
        </BlurDiv>
        </>
    );
}

export default Post;
