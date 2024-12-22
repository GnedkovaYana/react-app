import React from 'react';
import {RootWrapper} from './components/common/RootWrapper';
import {TodoItems} from './components/TodoItems/TodoItems'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient(); //создает один раз, здесь можно настроить кеш, и др

//необходимо обернуть приложение в провайдер, используем некоторый компонент QueryClientProvider, где есть прокс клиент и передаем туда наш
//сконфигурируемый клиент, экземпляр класса квериклиент
export const App = () => {
  return (
    <RootWrapper>
      <QueryClientProvider client={queryClient}> 
        <TodoItems />
      </QueryClientProvider>
     </RootWrapper>
  );
}
//все что мы будем передавать между <RootWrapper></RootWrapper>
// будет попадать в свойство {props.children} и выводить (в RootWrapper.jsx) 
