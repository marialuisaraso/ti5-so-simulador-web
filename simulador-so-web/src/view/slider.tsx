import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}`;
}

export default function DiscreteSlider() {
  return (
    <Box sx={{ width: 200, marginLeft: 2 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={3}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={10}
        color='secondary'
      />
    </Box>
  );
}
