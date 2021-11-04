import React from "react";
import styled from "styled-components";
import Image from "next/dist/client/image";
import { imageHeight } from "../../styles/globalStyleVariables";

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
    return (
        <Cart ref={ref}>
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