import React from 'react';
import styled from 'styled-components';
import { margin, buttonBorderRadius,darkGray, boxShadowBigElement } from '../../../styles/globalStyleVariables';
import { Product } from '../../../generalTypes';
import { Product as ProductComponent } from '../../../components/Product';
import { removeProductFromStorage } from '../../../functions';

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
    width: 62%;
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

const TextContainer = styled.div`
    margin-left: ${margin / 2}rem;
    display: flex;
    flex-direction: column;
    width: 100%;
`


const CartItem = ({ product }: {product: Product}) => {
    const removeObject = () => {
        removeProductFromStorage('cart', product)
    }

    return (
        <ItemBackground>
            <FlexLeft>
                <ImageContainer>
                    <ProductComponent 
                        alt={product.alt || 'no alt text'}
                        images={product.images}
                        slug={product.slug.current}
                        removeMargin={true}
                    />
                </ImageContainer>
                <TextContainer>
                    <H>Produkt</H>
                    <P>{`${product.price}KR`}</P>
                </TextContainer>
            </FlexLeft>
            <Button onClick={removeObject}>Ta bort</Button>
        </ItemBackground>
    );
}

export default CartItem;
