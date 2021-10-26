import React, { JSXElementConstructor } from 'react';
import styled from 'styled-components';
import { breakPoints } from '../generalTypes';
import { useState, useEffect } from 'react';
import { Product as ProductType } from "../generalTypes"

const Cols = styled.div<({columns:number})>`
    display: flex;
    gap: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
`

const Col = styled.div`
    width: 100%;
    `

const Masonry = ({ breakPoints, children, result, skeleton }: {breakPoints: breakPoints, children:Array<Array<JSX.Element>>, result:Array<ProductType>, skeleton:Array<Object> }, ref:any) => {
    
    const [colCount, setColCount] = useState(3);
    const [cols, setCols] = useState<Array<Array<React.ReactNode>>>([]);
    
    const updateColCount = () => {
        const width = window.innerWidth
        if(width < breakPoints.S) setColCount(1)  
        else if(width < breakPoints.M) setColCount(2)  
        else if(width < breakPoints.L) setColCount(3)  
        else setColCount(4) 
    }
    
    // Local '_children variable used to merge child arrays into single array'
    const _children:Array<any> = [];
    for(let i = 0; i < children.length; i++) {
        _children.push(...children[i]);
    }

    // Set columns whenever new chilfren are added or colcount changes.
    useEffect(() => {
        const _cols:Array<Array<React.ReactNode>> = []
        // Add new columns 
        for(let i = 0; i < colCount; i++) {
            _cols.push([])
        }
        // Fill columns 
        for(let i = 0; i < _children.length; i++) {
            _cols[i % colCount].push(_children[i])
        }
        setCols(_cols)
    }, [colCount, result, skeleton]);
    
    useEffect(() => {
        window.addEventListener('resize', updateColCount)
        return () => {
            window.removeEventListener('resize', updateColCount)
        }
    }, []);

    useEffect(()=>{
        updateColCount()
    })

    return (
        <Cols ref={ref} columns={colCount}>
            {cols.map((col)=>(
                <Col>
                    {col.map(child=>(
                        <div>
                            {child}
                        </div>
                    ))}
                </Col>
            ))}
        </Cols>
    );
}

export default Masonry;
