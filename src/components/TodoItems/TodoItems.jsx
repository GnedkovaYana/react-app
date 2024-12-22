import React, {useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';
import styled from 'styled-components';
import {priorityOptions} from '../TodoItem/Priority';

const PriorityFilter = styled.select`
  margin-left: 10px;
  background-color: white;
  border: 1px solid #ccc;
`;

const SortButton = styled.button`
  margin-left: 10px;
  background-color: #EFDECD;
  color: black;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;


export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');  //
  const [filterPriority, setFilterPriority] = useState(null);
  const [sortAscending, setSortAscending] = useState(true);
  const {data: todoItems, isLoading} = useData();

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  };

  const normalizeString = (str) => str.replace(/\s+/g, '').toLowerCase();

  const filteredBySearchItems = todoItems.filter((todoItem) => {
    const clearedTodoItemTitle = normalizeString(todoItem.title);
    const clearedSearchValue = normalizeString(searchValue);
    const isSearched = clearedTodoItemTitle.includes(clearedSearchValue);
    return searchValue.length >= 3 ? isSearched : true;
  });

  const filteredByPriorityItems = filterPriority
    ? filteredBySearchItems.filter(item => item.priority === filterPriority)
    : filteredBySearchItems;

  const sortedItems = [...filteredByPriorityItems].sort((a, b) => {
    const priorityOrder = { 'сложно': 3, 'средне': 2, 'просто': 1};
    return sortAscending
      ? priorityOrder[a.priority] - priorityOrder[b.priority]
      : priorityOrder[b.priority] - priorityOrder[a.priority];
  });


  const todoItemsElements = sortedItems.map((item) => (
    <TodoItem
      key={item.id}
      title={item.title}
      checked={item.isDone}
      id={item.id}
      itemPriority={item.priority}
    />
  ));

  const handlePriorityChange = (e) => {
    setFilterPriority(e.target.value);
  };

  const handleSortToggle = () => {
    setSortAscending(!sortAscending);
  };

return (
  <TodoItemsContainer>
    <SearchInput value={searchValue} setValue={setSearchValue} />
    <PriorityFilter value={filterPriority} onChange={handlePriorityChange}>
      {priorityOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </PriorityFilter>
    <SortButton onClick={handleSortToggle}>
      {sortAscending ? 'Сортировать по убыванию' : 'Сортировать по возрастанию'}
    </SortButton>
    {todoItemsElements}
    <NewTodoItem />
  </TodoItemsContainer>

);
};