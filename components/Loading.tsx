import React from "react";
import { SquareLoader } from "react-spinners";
import { FlexCenterCenter } from "./GlobalElements";

const Loading = () => {
  return (
    <FlexCenterCenter height="100vh">
      <SquareLoader></SquareLoader>
    </FlexCenterCenter>
  );
};

export default Loading;
