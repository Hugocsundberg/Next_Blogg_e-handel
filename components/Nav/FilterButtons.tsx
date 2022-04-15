import React, { useState } from "react";
import styled from "styled-components";
import FilterButton from "./FilterButton";

const Container = styled.div`
  display: flex;
  gap: 0.75rem;
  padding-left: 24px;
  margin-bottom: 16px;
`;

const FilterButtons = () => {
  const filters = ["filter1", "filter2", "filter3"];

  return (
    <Container>
      {filters.map((filter, i) => (
        <FilterButton key={i} name={filter}></FilterButton>
      ))}
    </Container>
  );
};

export default FilterButtons;
