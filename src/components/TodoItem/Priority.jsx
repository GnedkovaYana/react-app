import React from 'react';
import styled from 'styled-components';
import { usePriorityTodoItem } from '../../data/hooks/useData';

export const priorityOptions = [
  { color: '', value: '', label: '' },
  { color: '#E4717A', value: 'сложно', label: 'сложно' },
  { color: '#FFCF48', value: 'средне', label: 'средне' },
  { color: '#71BC78', value: 'просто', label: 'просто' },
];

const PrioritySelect = styled.select`
  margin-left: 10px;
  background-color: white;
  border: 1px solid #ccc;

  color: ${props => {
    const option = priorityOptions.find(opt => opt.value === props.value);
    return option ? option.color : 'black';
  }};

  &:focus {
    color: black;
  }
`;

export const Priority = ({ id, checked, priority, setPriority }) => {
  const { mutate } = usePriorityTodoItem();

  const onChangeHandler = (e) => {
    setPriority(e.target.value);
    mutate({id, checked, priority: e.target.value});
  };

  return (
    <PrioritySelect value={priority} onChange={onChangeHandler}>
      {priorityOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </PrioritySelect>
  );
};
