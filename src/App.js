import React, { createContext, useState } from "react";

import "./styles/App.scss";
import TodoList from "./pages/TodoList/TodoList";
function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [inputTodoItem, setInputTodoItem] = useState({ text: "", hour: 0 });
  const [isSelected, setIsSelected] = useState(0);

  function increment() {
    if (inputTodoItem.hour < 8) {
      setInputTodoItem({ ...inputTodoItem, hour: inputTodoItem.hour + 1 });
    }
  }
  function decrement() {
    if (inputTodoItem.hour > 0) {
      setInputTodoItem({ ...inputTodoItem, hour: inputTodoItem.hour - 1 });
    }
  }

  function handleUpdateTodoList(updatedTodoItem) {
    const updatedTodoList = todoItems.map((todoItem) => {
      if (todoItem.id === updatedTodoItem.id) {
        return {
          ...todoItem,
          ...updatedTodoItem,
          completed: updatedTodoItem.hasOwnProperty("completed")
            ? updatedTodoItem.completed
            : todoItem.completed,
        };
      } else {
        return todoItem;
      }
    });
    setTodoItems(updatedTodoList);
  }
  return (
    <TodoContext.Provider
      value={{
        todoItems,
        setTodoItems,
        inputTodoItem,
        setInputTodoItem,
        isSelected,
        setIsSelected,
        increment,
        decrement,
        handleUpdateTodoList,
      }}
    >
      <div className="App">
        <TodoList />
      </div>
    </TodoContext.Provider>
  );
}

export default App;
export const TodoContext = createContext();
