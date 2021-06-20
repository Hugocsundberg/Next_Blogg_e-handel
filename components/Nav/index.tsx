import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { BlurDiv, OptionText, BottomContainer, Cart, HamburgerContainer, ImageDiv, Logo, OptionDiv, Spacer } from './elements'
import { Options } from './config'
import { rem } from '../../styles/globalStyleVariables'
import { GetStaticProps } from 'next';
import { Spiral as Hamburger } from 'hamburger-react'


const Post = () => {
    const [ isExpanded, setIsExpanded ] = useState(false)
    // const burgerHandler = ():void => {
    //     setIsExpanded(!isExpanded)
    // }

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
                <HamburgerContainer>
                    <Hamburger
                    size={rem * 1.8}    
                    toggled={isExpanded} 
                    toggle={setIsExpanded}
                    easing="cubic-bezier(0.165, 0.84, 0.44, 1)"
                    duration={0.6}
                    />
                </HamburgerContainer>
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

export async function getStaticProps(context) {

    return {
      props: {}, // will be passed to the page component as props
    }
  } 

export default Post;
