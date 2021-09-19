import React, { JSXElementConstructor } from 'react';
import styled from 'styled-components';
import { breakPoints } from '../generalTypes';
import { useState, useEffect } from 'react';

const Cols = styled.div<({columns:number})>`
    display: flex;
    gap: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
`

const Col = styled.div`
    width: 100%;
`

const Masonry = ({ breakPoints, children }: {breakPoints: breakPoints, children:Array<Element>}, ref:any) => {
    const [colCount, setColCount] = useState(1);
    const [cols, setCols] = useState<Array<Array<Element>>>([]);

    useEffect(() => {
        const _cols:Array<Array<Element>> = []
        for(let i = 0; i < colCount; i++) {
            _cols.push([])
        }

        for(let i = 0; i < children.length; i++) {
            _cols[i % colCount].push(children[i])
        }
        setCols(_cols)
    }, [colCount]);

    useEffect(() => {
        console.log({cols})
    }, [cols]);
    
    const updateColCount = () => {
        const width = window.innerWidth
        if(width < breakPoints.S) setColCount(1)  
        else if(width < breakPoints.M) setColCount(2)  
        else if(width < breakPoints.L) setColCount(3)  
        else setColCount(4) 
    }

    useEffect(() => {
        updateColCount()
        window.addEventListener('resize', updateColCount)
        return () => {
            window.removeEventListener('resize', updateColCount)
        }
    }, []);

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
