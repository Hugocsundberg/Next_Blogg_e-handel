import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  breakPoints,
  PostLight,
  Product as ProductType,
} from "../generalTypes";
import { Dispatch, SetStateAction, ReactNode } from "react";
import { updateColCount } from "../functions";
import { margin } from "../styles/globalStyleVariables";

const Cols = styled.div`
  display: flex;
  gap: ${margin}rem;
  margin-left: ${margin}rem;
  margin-right: ${margin}rem;
`;

const Col = styled.div`
  width: 100%;
`;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: {
    y: 300,
  },
  show: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      mass: 1,
    },
  },
};

const Masonry = ({
  cols,
  setCols,
  children,
  result,
  skeleton,
  breakPoints,
}: {
  cols: Array<Array<React.ReactNode>>;
  setCols: Dispatch<SetStateAction<ReactNode[][]>>;
  children: Array<JSX.Element>;
  result: Array<PostLight> | Array<ProductType>;
  skeleton?: Array<Object>;
  breakPoints: breakPoints;
}) => {
  const [colCount, setColCount] = useState<number | undefined>(undefined);

  // Sets colcount based on window width
  const _updateColCount = () => {
    updateColCount(setColCount, breakPoints);
  };

  // Sets colcount based on window width
  useEffect(() => {
    _updateColCount();
    window.addEventListener("resize", _updateColCount);
    return () => {
      window.removeEventListener("resize", _updateColCount);
    };
  }, []);

  // Populate columns whenever new chilfren are added or colcount changes.
  useEffect(() => {
    if (colCount) {
      const _cols: Array<Array<React.ReactNode>> = [];
      // Add new columns
      for (let i = 0; i < colCount; i++) {
        _cols.push([]);
      }
      // Fill columns
      for (let i = 0; i < children.length; i++) {
        _cols[i % colCount].push(children[i]);
      }
      setCols(_cols);
    }
  }, [colCount, result]);

  return (
    <Cols as={motion.div}>
      {cols.map((col, i) => (
        <Col
          key={i}
          as={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {col.map((child, i) => (
            <motion.div variants={item} key={i}>
              {child}
            </motion.div>
          ))}
        </Col>
      ))}
    </Cols>
  );
};

export default Masonry;
