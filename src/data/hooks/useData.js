//слой бизнес логике по работе с сущностями, слой данных

//реакт квери создает хранилище, хранит там данные по ключу, когда вы обращаетесь к данным по ключу, он видит что их нет
//вызывает функцию загрузки данных, кладет их в хранилище и отдает по ключу
//Неважно с какого места вы подключитесь к данным по поределенному ключу, эти данные у вас будут доступны одинаково для всех потребителей
//НО данные в хранилище по умолчанию удаляются если нет потребителей этих данных, 
//реакт квери позволяет настроить механизм кэширования, вы можете запросить данные, положить в хранилище, дальше компонент умрет, но данные будут лежать какое то время в кэше
//реакт квери это хук для получения данных


import {LocalStorage} from '../services/LocalStorage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {TodoItem} from '../entity/TodoItem'


//тайминг 1:10


export const useData = () => { //при подключении в разных местах  хука , создает новый экзепляр этой функции,
  //подключается заново юзквери но запрашивает данные из одного хранилища по одному ключу, 
  //значит даннеы будут синхронизированными м/у разными компонентами,
  // все компоненты что используют юздата будут удалены из дерева то юзквери удалит эти данные если не настроен механизм кэширования, 
  //позволяет получать доступ к данным со всех мест, одновременно обновлять   
  const {data, isLoading} = useQuery({
    queryKey: ['todo'], //ключ по которому ваши данные будут лежать внутри приложения, обычно описывает какую-то сущность
    queryFn: LocalStorage.getTodoItemsFromLocalStorage, //функция загрузки данных если данных в хранилище нет по ключу todo
  });

  return {
    data,
    isLoading,
  };
}

//useMutation хук для изменения данных, он не меняет даные внутри хранилища, он меняет данные где то например на сервере, 
//и можно уже отправить событие внутрь реакт квери, сказаь перезапроси данные там все прошло успешно
// useMutation нужен только для изменения данных, изменяет он их только во вызову функции mutate 
//когда вызываем mutate, вызывается функция mutationFn, после того даннеы были успешно установлены (наш промис вернул резолт)
//вызывает onSuccess, там мы используем клиент, и мы гооврим invalidateQueries - пометить все даннные как устаревшми по ключу

export const useSaveNewTodoItem = () => {
  const client = useQueryClient();//клиент это некоторый интерфейс для взаимодействия с квери хранилищем

  const {mutate, isPending, isSuccess} = useMutation({ //возращает функцию mutate, этот тот тригерр который нужно вызывать когда мы хотим какие то даннеы поменять
    //когда мы будем вызывать mutate() прокидывать туда данные, эти данные попадут во внутрь mutationFn 
    mutationFn: ({title}) => { //функция которая будет вызываться когда мы хотим эти данные обновить, 
      const newTodoItem = new TodoItem(new Date().getTime(), title, false);
      return LocalStorage.saveTodoItemToLocalStorage(newTodoItem)
    },
    onSuccess: () => { //функция которая срабоатет если произошел резолт (в локал сторедж, saveTodoItemToLocalStorage) нашего промиса, сохранение прошло успешно
      client.invalidateQueries(['todo']); //принимает ключ для данных которые нужно сбрость, 
    },
  }); 
  
  //когда вызыали invalidateQueries он сбросил все данные по ключу туду, в этот момент useQuery понимает что нет данных начинает
  //их перезапрашивать, функция LocalStorage.getTodoItemsFromLocalStorage заново запросилась, но надпись загрузка данных не появляется еще как впервый раз 
  //и данннеы не сбрасываются и данные не сбрасываются, делает обновление в фоне
  return {
    mutate,
    isPending,
    isSuccess
  }
}

export const useDeleteTodoItem = () => {

  //подключть хук мутации вызвать метод из локал сторедж по удалению эелемента 
  //обновить данные реакт квери по ключу
  const client = useQueryClient();
  const {mutate, isPending, isSuccess} = useMutation({ 
    mutationFn: ({id}) => { 
      return LocalStorage.deleteTodoItemFromLocalStorage(id);
    },
    onSuccess: () => { 
      client.invalidateQueries(['todo']);
    },
  }); 
  return {
    mutate,
    isPending,
    isSuccess
  }
}

export const useCheckTodoItem = () => {
  const client = useQueryClient();
  const {mutate, isPending, isSuccess} = useMutation({ 
    mutationFn: ({id, checked }) => { 
      return LocalStorage.checkTodoItemLocalStorage(id, checked);
    },
    onSuccess: () => { 
      client.invalidateQueries(['todo']);
    },
  }); 
  return {
    mutate,
    isPending,
    isSuccess
  }
}


export const usePriorityTodoItem = () => {
  const client = useQueryClient();
  const {mutate, isPending, isSuccess} = useMutation({
    mutationFn: ({id, priority}) => {
      return LocalStorage.priorirtyTodoItemLocalStorage(id, priority);
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });
  return {
    mutate,
    isPending,
    isSuccess
  };
};
