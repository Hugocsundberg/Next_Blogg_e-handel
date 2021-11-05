import React, { JSXElementConstructor } from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { breakPoints, Post as PostType, Product as ProductType } from "../generalTypes"
import { Dispatch, SetStateAction, ReactNode } from 'react';
import { updateColCount } from '../functions'

const Cols = styled.div`
    display: flex;
    gap: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    `

const Col = styled.div`
    width: 100%;
    `

const Masonry = ({ cols, setCols, children, result, skeleton, breakPoints }: {cols:Array<Array<React.ReactNode>>, setCols:Dispatch<SetStateAction<ReactNode[][]>>, children:Array<JSX.Element>, result:(Array<PostType> | Array<ProductType>), skeleton?:Array<Object>, breakPoints:breakPoints }, ref:any) => {
    const [colCount, setColCount] = useState<number | undefined>(undefined);

    const _updateColCount = () => {
        updateColCount(setColCount, breakPoints)
      }

    useEffect(()=>{
        _updateColCount()
        window.addEventListener('resize', _updateColCount)
        return () => {
            window.removeEventListener('resize', _updateColCount)
          }
    }, [])
    
    // Set columns whenever new chilfren are added or colcount changes.
    useEffect(() => {
        // Local '_children variable used to merge child arrays into single array'
        if(colCount) {
            const _cols:Array<Array<React.ReactNode>> = []
            // Add new columns 
            for(let i = 0; i < colCount; i++) {
                _cols.push([])
            }
            // Fill columns 
            for(let i = 0; i < children.length; i++) {
                _cols[i % colCount].push(children[i])
            }
            setCols(_cols)
        }
    }, [colCount, result, skeleton]);

    return (
        <Cols>
            {cols.map((col, i)=>(
                <Col key={i}>
                    {col.map((child, i)=>(
                        <div key={i}>
                            {child}
                        </div>
                    ))}
                </Col>
            ))}
        </Cols>
    );
}

export default Masonry;
