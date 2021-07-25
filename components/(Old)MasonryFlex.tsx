// @ts-nocheck
//@ts-ignore
import styled from 'styled-components'
import { darkGray, margin } from '../styles/globalStyleVariables'
import { Content, Product as ProductType } from '../generalTypes';
import { useEffect, useRef, useState } from 'react';
import Product from "./Product"
import { getCols } from '../functions';

const ContainerFlex = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    background: #ffcdfa;
    position: relative;
`

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: red;
`

function MasonryFlex<T>({ items }:{items:Array<Content>}) {
    const [cols, setCols] = useState<number>(0);
    const [contentArray, setcontentArray] = useState<Array<Array<Content>>>([]);
    const [renderArray, setrenderArray] = useState<Array<Array<Content>>>([]);
    const sizeHandler = () => {
        setCols(getCols(window.innerWidth))
    }
    useEffect(() => {
        sizeHandler()
        window.addEventListener('resize', sizeHandler)
        return () => {
            window.removeEventListener('resize', sizeHandler)
        };
    }, []);

    useEffect(()=>{
        if(cols !== 0) {
            //Creates an array with arrays corresponding to columns
            const _array = []
            for(let i = 0; i < cols; i++) {
                _array.push([]);
            }
            setrenderArray(_array)
        }
    }, [cols])

    useEffect(()=>{
        if(cols !== 0 && contentArray[0]) {
            const _array = contentArray
            console.log(cols)
            console.log(_array)
            console.log(items)
            //Adds products to columns              
            for(let i = 0; i < items.length; i++) {
                //Get shortest column
                let shortestColumn:number | undefined = undefined
                //Based on aspect ratio (Lower = taller)
                for(let j = 0; j < cols; j++) { //For every column
                    let columnHeight:number = 0
                    for(let k = 0; k < _array[j].length; k++) { //For every product in column
                        columnHeight += _array[j][k].imageWidth / _array[j][k].imageHeight 
                    }
                    if(shortestColumn == undefined || columnHeight <= shortestColumn) shortestColumn = j
                }
                //Add product to shortest column
                renderArray[(shortestColumn as number)].push(items[i])
            }
        }
    }, [contentArray])

    useEffect(()=>{
        setcontentArray(renderArray)
        console.log(renderArray)
    }, [renderArray])

    // const [contentArray, setcontentArray] = useState<Array<Array<ProductType>>>([]); //array:Array<Array<ProductType>> = [] 
    // const [colsState, setCols] = useState<number>(0)
    // // const contentArray = useRef<Array<Array<ProductType>>>([])
    // useEffect(()=>{
    //     setCols(cols)
    // })
    
    return (
        <ContainerFlex>
            {/* <h1>{renderArray[0][0].title ?? 'no'}</h1> : '' */}
            {renderArray.map((col)=>(
                <FlexColumn>
                    {col.map((product, key)=>(
                        <Product imageHeight={product.imageHeight} imageWidth={product.imageWidth} alt={product.alt || 'no alt text'} image={product.image} key={key}></Product>
                    ))}
                </FlexColumn>
        ))}
        </ContainerFlex>
    );
}

export default MasonryFlex;
