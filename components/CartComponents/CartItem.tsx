import React from 'react';
import styled from 'styled-components';
import { margin, buttonBorderRadius,darkGray, boxShadowBigElement } from '../../styles/globalStyleVariables';
import { Product } from '../../generalTypes';
import { Product as ProductComponent } from '../../components/Product';
import { isReserved, removeProductFromStorage } from '../../functions';
import { useEffect, useState } from 'react';

const ItemBackground = styled.div`
    background: #ffffff;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    padding: ${margin}rem;
    margin-bottom: 10px;
    border-radius: 10px;
    box-shadow: ${boxShadowBigElement};
`

const FlexLeft = styled.div`
    position: relative;
    display: flex;
    width: 70%;
`

const ImageContainer = styled.div`
    position: relative;
    width: 50%;
`

const Button = styled.button`
    background: #DD0000;
    font-weight: bold;
    box-shadow: 0px 2px 3px rgba(255, 41, 41, 0.35);
    border: none;
    --webkit-appearance: none;
    color: white;
    border-radius: ${buttonBorderRadius}px;
    padding: 0.5rem 1rem;
    cursor: pointer;
`

const H = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
    margin-bottom: 0.25rem;
    color: ${darkGray};
`

const P = styled.p`
    font-size: 1rem;
    margin: 0;
    color: ${darkGray};
`

const FlexContainer = styled.div`
    margin-left: ${margin / 2}rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
`

const UpperContainer = styled.div`
`
const LowerContainer = styled.div`
    display: flex;
    align-items: center;
    gap: .6rem;
`

const ReservedText = styled.p`
font-size: .8rem;
`

const Dot = styled.div`
    border-radius: 50%;
    background: #ff8800;
    height: .6rem;
    width: .6rem;
    min-width: .6rem;
`


const CartItem = ({ product }: {product: Product}) => {
    const [timeRemaining, settimeRemaining] = useState(isReserved(product.lastReservedAt));

    useEffect(() => {
        const interval = setInterval(()=>{
            settimeRemaining(isReserved(product))
        }, 60 * 1000)
        return () => {
            clearInterval(interval)
        };
    }, []);

    const removeObject = () => {
        removeProductFromStorage('cart', product)
        fetch('/api/unreserve', {
            body: JSON.stringify(product.id), 
            method: 'post', 
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
        })
    }

    return (
        <ItemBackground>
            <FlexLeft>
                <ImageContainer>
                    <ProductComponent 
                        imageHeight={product.imageHeight}
                        imageWidth={product.imageWidth}
                        alt={product.alt || 'no alt text'}
                        images={product.images}
                        slug={product.slug.current}
                        removeMargin={true}
                    />
                </ImageContainer>
                <FlexContainer>
                    <UpperContainer>
                        <H>{product.title}</H>
                        <P>{`${product.price} kr`}</P>
                    </UpperContainer>
                    <LowerContainer>
                        <Dot></Dot>
                        <ReservedText>{timeRemaining <= 1 ? 'Produkten kommer snart att tas bort från kundkorgen' : `Produkten är reserverad i ${timeRemaining} minuter till`}</ReservedText>
                    </LowerContainer>
                </FlexContainer>
            </FlexLeft>
            <Button onClick={removeObject}>Ta bort</Button>
        </ItemBackground>
    );
}

export default CartItem;
