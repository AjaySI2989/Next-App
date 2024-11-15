'use client';
import React from 'react';

interface SelectBoxProps {
  options: number[]; 
  onSelect: (selectedValue: number) => void; 
}

export const SelectBox: React.FC<SelectBoxProps> = ({ options, onSelect }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    onSelect(selectedValue);
  };

  return (
    <select onChange={handleChange}
    style={{
        width: '15%',
        backgroundColor: '#FFF', 
        color: '#000', 
        fontWeight: 'bold',
        padding: '8px 10px', 
        fontSize: '16px', 
        border: 'solid 1px #ccc', 
        borderRadius: '4px', 
        cursor: 'pointer', 
        margin: '10px 0', 
      }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
