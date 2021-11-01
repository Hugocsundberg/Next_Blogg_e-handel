import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { BlurDiv, OptionText, BottomContainer, RightSideContainer, Cart, HamburgerContainer, ImageDiv, Logo, OptionDiv, Spacer, CartP } from './elements'
import { getOptions } from './config'
import { rem } from '../../styles/globalStyleVariables'
import { Spiral as Hamburger } from 'hamburger-react'
import Link from 'next/link'
import { AboutMe, Product as ProductType, NavOption } from '../../generalTypes';
import { getOptionsHeight } from './functions';
import { useRouter } from 'next/router'
import { getFromStorage, isReserved, removeProductFromStorage } from '../../functions';


const Nav = ({ aboutMe, spacer = true }: {aboutMe: Array<AboutMe>, spacer?:boolean}) => {
    const [currentPath, setcurrentPath] = useState('');
    const [componentLoaded, setcomponentLoaded] = useState(false);
    const [isDesktop, setisDesktop] = useState(false);
    const [ isExpanded, setIsExpanded ] = useState(false)
    const [ cartItems, setcartItems ] = useState<string | number>('-')
    const router = useRouter()
    const _route = router.route.replace('/', '')
    const desktopSize:number = 800

    const updateCartItems = () => {
        const cart:Array<Object> | null | undefined = getFromStorage('cart')
        if(Array.isArray(cart)) {
            setcartItems((cart as Array<ProductType>).length)
        }
    }
    
    const resizeHandlerIsDesktop = (): void => {
        if(window.innerWidth > desktopSize) setisDesktop(true)
        else setisDesktop(false)
    }

    useEffect(()=>{
        //set component loaded
        setTimeout(() => {
            setcomponentLoaded(true)
        }, 1);

        if(process.browser) {   
            //Set path
            let path = window.location.origin
            setcurrentPath(path)
            
            //Update Cart
            updateCartItems()
            window.addEventListener('updatecart', updateCartItems)
            
            //Check if desktop
            resizeHandlerIsDesktop()
            window.addEventListener('resize', resizeHandlerIsDesktop)
            
            const interval = setInterval(()=>{
                const cart = getFromStorage('cart')
                cart.forEach((cartItem)=>{
                    if(!isReserved((cartItem as ProductType).lastReservedAt)) {
                        removeProductFromStorage('cart', cartItem as ProductType)
                    }
                })
            }, 3 * 1000)

            return () => {
                window.removeEventListener('updatecart', updateCartItems)
                window.removeEventListener('resize', resizeHandlerIsDesktop)
                clearInterval(interval)
            }
        }

    }, [])

    return (
        <>
        {spacer ? <Spacer/> : ''}
        <BlurDiv componentIsLoaded={componentLoaded} isExpanded={isExpanded} optionsHeight={isDesktop ? 0 : getOptionsHeight(aboutMe)}>
            {isDesktop ? '' : getOptions(aboutMe, _route, router.asPath === `/post/${aboutMe[0].slug.current}`).map((option:NavOption, key:any)=>(
                <a key={key} href={`${currentPath}${option.link}`}>
                    <OptionDiv isActive={option.isActive}>   
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
                    getOptions(aboutMe, _route, router.asPath === `/post/${aboutMe[0].slug.current}` ).map((option:NavOption, key:any)=>(
                        <a key={key} href={`${currentPath}${option.link}`}>
                            <OptionDiv noBorder={true} isActive={option.isActive}>   
                                {option.text === 'Kundvagn' ?
                                <Link href="/kundvagn">
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

export default Nav;
