import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #e0e0e0;
  padding-left: 24px;
  padding-right: 24px;
`;

const P = styled.p`
  margin-top: 12px;
  margin-bottom: 12px;
`;

const FilterButton = ({ name }: { name: string }) => {
  return (
    <Container>
      <P>{name}</P>
    </Container>
  );
};

export default FilterButton;
