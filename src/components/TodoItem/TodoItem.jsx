import React, {useState} from 'react';
import styled, {css} from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox';
import {useCheckTodoItem, useDeleteTodoItem, usePriorityTodoItem} from '../../data/hooks/useData';
import {Priority} from './Priority';

const checkedCss = css`
  color: #B5B5BA;
  text-decoration: line-through;
`
//перенос строки
const Title = styled.span(props => {
  return `
    width: 40%;
    font-size: 15px;
    overflow-wrap: break-word; 
    ${props.checked ? checkedCss : ''};
  `;
})

const Delete = styled.span`
  display: inline-block;
  min-width: 13px;
  min-height: 13px;
  background-image: url(assets/images/png/delete.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px;
  cursor: pointer;
`;

// на иконку удаления повесить обработчки который будет вызыывать конфирм 
//если конфирм тру то вызываем удаление по айди, айди надо прокинуть снаружи
export const TodoItem = ({id, title, checked, itemPriority}) => {
  const {mutate: deleteMutate} = useDeleteTodoItem();
  const { mutate: checkMutate } = useCheckTodoItem();
  
  const [priority, setCurrentPriority] = useState(itemPriority);

  
  
  const handlerDelete = () => {
    const confirm = window.confirm('Вы уверены, что хотите удалить этот элемент?')
    if (confirm) {
      deleteMutate({id});
    }
  };

  const handlerCheck = () => {
    checkMutate({id: id, checked: !checked});
  };

  const handlePriorityChange = (newPriority) => {
    setCurrentPriority(newPriority);
  };

  
  return (
    <TodoItemContainer>
      <TodoItemCheckbox checked={checked} onCheck={handlerCheck}/>
      <Title checked={checked}>
        {title}
      </Title>
      <Priority id={id} checked={checked} priority={priority} setPriority={handlePriorityChange} />
      <Delete onClick={handlerDelete}/>
    </TodoItemContainer>
  )
}

//содержит сам элемент