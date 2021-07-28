import React from 'react';
import styled from 'styled-components';
import { margin, buttonBorderRadius,darkGray } from '../../../styles/globalStyleVariables';
import { Product } from '../../../generalTypes';
import { Product as ProductComponent } from '../../../components/Product';

const ItemBackground = styled.div`
    background: #ffffff;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    padding: ${margin}rem;
    margin-bottom: 10px;
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
    background: red;
    border: none;
    --webkit-appearance: none;
    color: white;
    border-radius: ${buttonBorderRadius}px;
    padding: 0.5rem 1rem;
`

const H = styled.p`
    font-size: 1.5rem;
    margin: 0;
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
    const image = product.images[0]
    console.log(image)
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
            <Button>Ta bort</Button>
        </ItemBackground>
    );
}


{/* <Image
                        src={urlFor(image.asset._ref).url() || '/noImage.jpg'}
                        alt={image.alt || 'no alt text'}
                        width={image.imageWidth}
                        height={image.imageHeight}
                        layout="responsive"
                    /> */}



export default CartItem;
