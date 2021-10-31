import React, { JSXElementConstructor } from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { breakPoints, Post as PostType, Product as ProductType } from "../generalTypes"
import { Dispatch, SetStateAction, ReactNode } from 'react';
import { updateColCount } from '../functions'

const Cols = styled.div<({columns:number})>`
    display: flex;
    gap: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    `

const Col = styled.div`
    width: 100%;
    `

const Masonry = ({ cols, setCols, children, result, skeleton, breakPoints }: {cols:ReactNode[][], setCols:Dispatch<SetStateAction<ReactNode[][]>>, children:Array<Array<JSX.Element>>, result:(Array<PostType> | Array<ProductType>), skeleton?:Array<Object>, breakPoints:breakPoints }, ref:any) => {
    const [colCount, setColCount] = useState(3);

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
        const _children:Array<any> = [];
            if(children)
            for(let i = 0; i < children.length; i++) {
                _children.push(...children[i]);
            }
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

    return (
        <Cols columns={colCount}>
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
