import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { BlurDiv, OptionText, BottomContainer, RightSideContainer, Cart, HamburgerContainer, ImageDiv, Logo, OptionDiv, Spacer, CartP } from './elements'
import { getOptions } from './config'
import { rem } from '../../styles/globalStyleVariables'
import { GetStaticProps } from 'next';
import { Spiral as Hamburger } from 'hamburger-react'
import Link from 'next/link'
import { AboutMe, Product, NavOption } from '../../generalTypes';
import { getOptionsHeight } from './functions';
import { useRouter } from 'next/router'
import { getFromStorage } from '../../functions';


const Nav = ({ aboutMe, spacer = true }: {aboutMe: Array<AboutMe>, spacer?:boolean}) => {
    
    const [currentPath, setcurrentPath] = useState('');
    const [isDesktop, setisDesktop] = useState(false);
    const router = useRouter()
    const _route = router.route.replace('/', '')
    const [ isExpanded, setIsExpanded ] = useState(false)
    const [ cartItems, setcartItems ] = useState<string | number>('-')
    const desktopSize:number = 800
    
    const updateCartItems = () => {
        const cart:Array<Product> | null | undefined = getFromStorage('cart')
        if(Array.isArray(cart)) {
            setcartItems(cart.length)
        }
    }
    
    const resizeHandlerIsDesktop = (): void => {
        if(window.innerWidth > desktopSize) setisDesktop(true)
        else setisDesktop(false)
    }

    useEffect(()=>{
        if(process.browser) {   
            //Set path
            let path = window.location.toString().replace(/(?<!\/)\/[^\/].+/, '')
            path = path.replace(/\/$/, '')
            setcurrentPath(path)

            //Update Cart
            updateCartItems()
            window.addEventListener('updatecart', updateCartItems)

            //Check if desktop
            resizeHandlerIsDesktop()
            window.addEventListener('resize', resizeHandlerIsDesktop)

            return () => {
                window.removeEventListener('updatecart', updateCartItems)
                window.removeEventListener('resize', resizeHandlerIsDesktop)
            }
        }
    }, [])

    return (
        <>
        {spacer ? <Spacer/> : ''}
        <BlurDiv isExpanded={isExpanded} optionsHeight={isDesktop ? 0 : getOptionsHeight(aboutMe)}>
            {isDesktop ? '' : getOptions(aboutMe, _route, isDesktop, ).map((option:Option, key:any)=>(
                <a key={key} href={`${currentPath}${option.link}`}>
                    <OptionDiv>   
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
                </a>
            ))}
            <BottomContainer className="topOverlay">
                {
                isDesktop ? '' :
                <HamburgerContainer>
                    <Hamburger
                    size={rem * 1.8}    
                    toggled={isExpanded} 
                    toggle={setIsExpanded}
                    easing="cubic-bezier(0.165, 0.84, 0.44, 1)"
                    duration={0.6}
                    />
                </HamburgerContainer>
                }
                
                <Link href="/" scroll={false}>
                    <Logo>Marina Sundberg</Logo>
                </Link>
                <RightSideContainer>
                    {
                    isDesktop ? 
                    getOptions(aboutMe, _route, isDesktop, router.asPath === `/post/${aboutMe[0].slug.current}` ).map((option:NavOption, key:any)=>(
                        <a key={key} href={`${currentPath}${option.link}`}>
                            <OptionDiv noBorder={true} isActive={option.isActive}>   
                                {option.text === 'Kundvagn' ?
                                <Link href="/cart">
                                    <Cart>
                                        <CartP>{cartItems}</CartP>
                                        <Image
                                            src="/shop-cart.svg"
                                            alt="hamburger"
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    </Cart>
                                </Link>
                                :
                                <ImageDiv>
                                    <Image
                                        src={option.image}
                                        alt={option.text}
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </ImageDiv>
                                }  
                                    <OptionText>
                                        {option.text}
                                    </OptionText>
                                </OptionDiv>
                        </a>
                    )) 
                    : 
                    <Link href="/cart">
                        <Cart>
                            <CartP>{cartItems}</CartP>
                            <Image
                                src="/shop-cart.svg"
                                alt="hamburger"
                                layout="fill"
                                objectFit="contain"
                            />
                        </Cart>
                    </Link>
                    }
                </RightSideContainer>
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

export default Nav;
