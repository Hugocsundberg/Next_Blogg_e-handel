import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { BlurDiv, OptionText, BottomContainer, Cart, HamburgerContainer, ImageDiv, Logo, OptionDiv, Spacer } from './elements'
import { getOptions, Option } from './config'
import { rem } from '../../styles/globalStyleVariables'
import { GetStaticProps } from 'next';
import { Spiral as Hamburger } from 'hamburger-react'
import Link from 'next/link'
import { AboutMe } from '../../generalTypes';
import { getOptionsHeight } from './functions';


const Post = ({ aboutMe }: {aboutMe: Array<AboutMe>}) => {
    const [ isExpanded, setIsExpanded ] = useState(false)
    return (
        <>
        <Spacer/>
        <BlurDiv isExpanded={isExpanded} optionsHeight={getOptionsHeight(aboutMe)}>
            {getOptions(aboutMe).map((option:Option, key:any)=>(
                <Link href={option.link} key={key}>
                    <OptionDiv >   
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
                </Link>
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
                
                <Link href="/" scroll={false}>
                    <Logo>Marina Sundberg</Logo>
                </Link>
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

export async function getStaticProps() {

    return {
      props: {}, // will be passed to the page component as props
    }
  } 

export default Post;
