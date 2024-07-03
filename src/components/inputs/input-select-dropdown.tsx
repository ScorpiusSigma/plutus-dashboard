'use client';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FC, useState } from 'react';

interface IInputSelectDropdownProps {
  width?: string;
  options: (string | number)[];
  label: string;
  valuePrefix?: string;
}

const InputSelectDropdown: FC<IInputSelectDropdownProps> = ({ width, options, label, valuePrefix }): JSX.Element => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState<string | number>('');

  const getStyles = (name: string | number, selectedItem: string | number, theme: Theme): any => {
    return {
      fontWeight: selectedItem === name ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
    };
  };

  const handleChange = (event: SelectChangeEvent<string | number>): void => {
    setSelectedItem(event.target.value);
  };

  return (
    <FormControl
      sx={{
        width: width || '200px',
        height: '30px',
        bgcolor: theme.palette.grey[800],
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme.palette.grey[800],
            borderRadius: 0,
          },
          '&:hover fieldset': {
            borderColor: '#8a5cff',
            borderRadius: 0,
          },
          '&.Mui-focused fieldset': {
            borderColor: '#8a5cff',
            borderRadius: 0,
            borderWidth: '1px',
          },
        },
        '& input': {
          py: '4px',
          px: '14px',
          width: width,
        },
      }}
    >
      <Select
        displayEmpty
        value={selectedItem}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (!selected) {
            return label;
          }
          return selected.toString() + valuePrefix;
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: width,
            },
          },
        }}
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{ height: '30px', color: theme.palette.grey[400] }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option} style={getStyles(option, selectedItem, theme)}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InputSelectDropdown;
