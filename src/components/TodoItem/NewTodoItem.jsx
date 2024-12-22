import React, {useState, useRef, useEffect} from 'react';
import {TodoItemContainer} from './TodoItemContainer';
import {TodoItemCheckbox} from './TodoItemCheckbox';
import styled from 'styled-components';
import {useSaveNewTodoItem} from '../../data/hooks/useData';


const Input = styled.input`
  flex-grow: 1;

  &::placeholder {   
    font-size: 15px;
    color: rgba(63,63,63,0.6);
  }
`
//внутри нашей стилей styled элементе можно использовать & 
//для доступа к этому же элемнту, 
 
export const NewTodoItem = () => {
  const {mutate, isPending, isSuccess} = useSaveNewTodoItem(); //определяем функцию useSaveNewTodoItem
  const [value, setValue] = useState(''); //храним состояние внутри стейта
  const inputRef = useRef();


//useEffect — это хук в React, который позволяет выполнять побочные эффекты в функциональных компонентах. 
//Функция, переданная в useEffect, будет выполняться каждый раз, когда изменяется любой элемент массива зависимостей (в данном случае isPending или isSuccess).
//
  useEffect(() => {
    if (!isPending && isSuccess) {
      setValue('');
    }
  }, [isPending, isSuccess]);


  //использует useEffect для очистки значения поля ввода после успешного завершения операции. 
  //Условие if (!isPending && isSuccess) проверяет, что операция завершена успешно и больше не находится в состоянии ожидания, 
  //после чего вызывается setValue('') для очистки поля ввода.

  //запись дел, задач, значения забиваются
  const onInputChange = (event) => {
    const newValue = event.nativeEvent.target.value;
    const clearedValue = newValue.replace(/\d/, '');//запрет на написание цифр
    setValue(clearedValue);
  }

  //сохраняем состояние задачи, 
  const onInputKeyPressed = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
 
    if (value === '') {
      alert('Значение поля не должно быть пустым');
      return;
    }

    mutate({title: value});
  }

  return (
    <TodoItemContainer>
      <TodoItemCheckbox disabled={true} />
      <Input 
        ref={inputRef}
        value={value}
        onChange={onInputChange}
        onKeyDown={onInputKeyPressed}
        placeholder='Write a task...'
        disabled={isPending}
      />
    </TodoItemContainer>
  )
}

//содержит контейнер, который будет общий для элемента, 
//и содержит чекбокс