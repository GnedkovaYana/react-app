//слой отвечающий за данные

const TODO_ITEMS_LOCAL_STORAGE_KEY = 'TODO_ITEMS_LOCAL_STORAGE_KEY'; 
//Эта константа используется как ключ для хранения и извлечения данных из localStorage. 
//localStorage — это объект, который позволяет хранить данные в браузере.

export const LocalStorage = { //Этот объект содержит методы для работы с localStorage.
  getTodoItemsFromLocalStorage: () => {    //Этот метод возвращает Promise, который через 500 миллисекунд (0.5 секунды) попытается извлечь данные из localStorage.
    return new Promise((resolve, reject) => { //ассинхронный вызов кода
      setTimeout(() => {
        
      const rawData = localStorage.getItem(TODO_ITEMS_LOCAL_STORAGE_KEY);
        const defaultResult = []; 
        if (!rawData) {
          resolve(defaultResult);
          return;
        }
        const data = JSON.parse(rawData);
    
        if (!Array.isArray(data)) {
          resolve(defaultResult);
          return;
        }
    
        resolve(data); //необходимо вызывать resolve или reject, чтобы завершить ассинхронную функцию
      }, 100);  
    })
  },

   

  saveTodoItemToLocalStorage: (todoItem) => {   //Этот метод также возвращает Promise и используется для сохранения нового элемента в localStorage.
    return new Promise((resolve, reject) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const newTodoItems = [...todoItems, todoItem];
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(newTodoItems));
        resolve();
      })
    });
  },

  //getTodoItemsFromLocalStorage: Извлекает список задач из localStorage.
//saveTodoItemToLocalStorage: Сохраняет новую задачу в localStorage.

  //метод
  deleteTodoItemFromLocalStorage: (todoItemId) => {
    //получить массив элементов
      //сделать фильтр по элементам ч/з фильтр у массива, оставить только нужные элементы
       // Сохранить отфильтрованный список в localStorage
       
       return new Promise((resolve, reject) => {
        LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
          const deleteTodoItems =  todoItems.filter(item => item.id !== todoItemId);
          localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(deleteTodoItems));
          resolve();
      })
    });
  },

  checkTodoItemLocalStorage: (id, checked) => {
 //получить массив элементов
      //найти нужный элемент поставить ему чек, 
       // Сохранить  в localStorage
       
       return new Promise((resolve, reject) => {
        LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
          const checkedTodoItems = todoItems.map(item =>
            item.id === id ? {...item, isDone: checked}: item);
          localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(checkedTodoItems));
          resolve();
      })
    });
  },

  priorirtyTodoItemLocalStorage: (id, priority) => {
    return new Promise((resolve, reject) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const priorityTodoItems = todoItems.map(item =>
          item.id === id ? { ...item, priority } : item);
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(priorityTodoItems));
        resolve();
      });
    });
  }
};
