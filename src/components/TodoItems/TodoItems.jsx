
//умный компонент, побольшей части будет управлять элементами чем сожержать верстку
//будет наполнять нашу страницу элементами

//в сервисе в локасторедж мб поход не в локал сторедж а на бэк и это уже будут запросы
//это значит что при каждом рирендере вашего компонента будет происходит запрос
//надо запрашивать только один раз

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


  //хук не может быть под условным ренедерингом, нельзя хук поместить ниже ифа, хуки должны вызываться на каждый рендер компонента
  const {data: todoItems, isLoading} = useData();

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  };
  // Фукнция filter вызывает для каждого элемента переданный ей колбек
  // И формирует в filteredBySearchItems новый массив элементов, для которых колбек вернул true
  // Для проверки вхождения подстроки в строку нужно использовать indexOf
    // const clearedTodoItemTitle = очистка от пробелов + приведение к одному из регистров
    // const clearedSearchValue = очистка от пробелов + приведение к одному из регистров
    // const isSearched = проверка вхождения строки поиска в строку заголовка
    // return isSearched

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

//функция map конструирует новый массив из элементов которые будут получены путем вызова колбека который передали в функцию мап
//на каждый рендер мы будем проходить по массиву наших filteredBySearchItems, конструировать новый массив который будет содержать 
//<TodoItem key={item.id} title={item.title} checked={item.isDone} /> и это будем рендерить
//это значит что если в какой то момент поменяется масив данных, мы заново их перезапросим
//важно, что  в filteredBySearchItems попадет новый массив данных, при каждом рендере будут отрисовываться новый массив элементов
//
//что она вернет то и будет содержимым этого нового массива
//key={item.id} когда формируем список каждый элемент должен содержать уникальный ключ, при создании одинаковых элементов реакту надо их как то отличать
//чтобы он мог точно определить какие элементы в окончательном дереве элементов html поменялись

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