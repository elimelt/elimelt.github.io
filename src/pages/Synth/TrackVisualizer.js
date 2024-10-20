import React from 'react';
import styled from 'styled-components';

const VisualizerContainer = styled.div`
  display: flex;
  height: 50px;
  margin-top: 10px;
`;

const Bar = styled.div`
  flex: 1;
  background-color: ${props => props.$isactive ? '#0074D9' : '#AAAAAA'};
  margin: 0 1px;
`;

const TrackVisualizer = ({ sequence }) => {
  return (
    <VisualizerContainer>
      {sequence.map(($isactive, index) => (
        <Bar key={index} $isactive={$isactive} />
      ))}
    </VisualizerContainer>
  );
};

export default TrackVisualizer;