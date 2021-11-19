import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/dist/client/image";
import { imageHeight } from "../../styles/globalStyleVariables";
import {  motion } from "framer-motion";


const Cart = styled.div`
    height: ${imageHeight}rem;
    width: 2rem;
    position: relative;
    appearance: none;
    border: none;
    background: none;
    --webkit-appearance: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    `

const CartP = styled.p`
    font-size: 0.7rem;
    transform: translate(2px, -1px);
    `

export const CartIcon = ({cartItems}: {cartItems: number | string}, ref:any) => {
    const [animation, setAnimation] = useState(false)
    
    const variants = {
        inactive: {},
        active: {
            y: [0, -10, 0],
            transition: { stiffness: 1, mass: 100 }
        }
    }


    const triggerAnimation = () => {
            setAnimation(true)
            setTimeout(() => {
                setAnimation(false)
            }, 2000);
    }
    
    useEffect(()=>{
        window.addEventListener('updatecart', triggerAnimation)
        return () => window.removeEventListener('updatecart', triggerAnimation)
    }, [])

    
    return (
        <Cart as={motion.div} animate={animation ? "active" : "inactive"} variants={variants} ref={ref}>
            <CartP>{cartItems}</CartP>
            <Image
                src="/shop-cart.svg"
                alt="hamburger"
                layout="fill"
                objectFit="contain"
                />
        </Cart>
    )
}