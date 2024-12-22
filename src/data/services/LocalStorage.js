const TODO_ITEMS_LOCAL_STORAGE_KEY = 'TODO_ITEMS_LOCAL_STORAGE_KEY'; 

export const LocalStorage = {
  getTodoItemsFromLocalStorage: () => {   
    return new Promise((resolve, reject) => { 
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
    
        resolve(data); 
      }, 100);  
    })
  },

   

  saveTodoItemToLocalStorage: (todoItem) => { 
    return new Promise((resolve, reject) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const newTodoItems = [...todoItems, todoItem];
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(newTodoItems));
        resolve();
      })
    });
  },

  deleteTodoItemFromLocalStorage: (todoItemId) => {
       return new Promise((resolve, reject) => {
        LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
          const deleteTodoItems =  todoItems.filter(item => item.id !== todoItemId);
          localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(deleteTodoItems));
          resolve();
      })
    });
  },

  checkTodoItemLocalStorage: (id, checked) => {
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
