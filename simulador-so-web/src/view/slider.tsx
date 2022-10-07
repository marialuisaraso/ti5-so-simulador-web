import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}`;
}

type DiscreteSliderProps = {
  value: number;
  handleChange: Function;
};

const DiscreteSlider = ({ value, handleChange }: DiscreteSliderProps) => {
  return (
    <Box sx={{ width: 200, marginLeft: 2 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={3}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks
        value={value}
        onChange={(event: Event, newValue: number | number[]) => handleChange(newValue)}
        min={1}
        max={10}
        color="secondary"
      />
    </Box>
  );
};

export default DiscreteSlider;
