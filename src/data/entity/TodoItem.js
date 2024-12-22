//класс
//определяет функцию-конструктор TodoItem, которая используется для создания объектов, представляющих задачи

export function TodoItem(id, title, isDone, priority) {
  this.id = id;
  this.title = title;
  this.isDone = isDone;
  this.priority = priority;
}