import { useContext } from "react";
import "../../styles/pages/TodoList/TodoList.scss";
import Todo from "./Todo.js";
import Schedule from "./Schedule.js";
import CountHour from "../../components/CountHour.js";
import { TodoContext } from "../../App";

function TodoList() {
  const {
    todoItems,
    setTodoItems,
    inputTodoItem,
    setInputTodoItem,
    isSelected,
    setIsSelected,
    increment,
    decrement,
  } = useContext(TodoContext);

  function handleClickPage(n) {
    return setIsSelected(n);
  }

  function handleAddItem() {
    if (inputTodoItem.text !== "") {
      setTodoItems([
        ...todoItems,
        {
          id: Date.now(),
          text: inputTodoItem.text,
          hour: inputTodoItem.hour,
          completed: false,
        },
      ]);
      setInputTodoItem({ ...inputTodoItem, text: "", hour: 0 });
    }
  }

  return (
    <div className="todo-list-container">
      <div className="header-container">
        <div
          onClick={() => handleClickPage(0)}
          className={isSelected === 0 ? "title-selected" : "title"}
        >
          To-do
        </div>
        <div
          onClick={() => handleClickPage(1)}
          className={isSelected === 1 ? "title-selected" : "title"}
        >
          Schedule
        </div>
      </div>
      <div className="page-container">
        {isSelected === 0 ? <Todo /> : <Schedule />}
      </div>
      {isSelected === 0 ? (
        <div className="add-container">
          <div className="add-button" onClick={handleAddItem}></div>
          <input
            className="add-input"
            type="text"
            value={inputTodoItem.text}
            onChange={(e) =>
              setInputTodoItem({ ...inputTodoItem, text: e.target.value })
            }
          />
          <CountHour
            inputTodoItem={inputTodoItem}
            hour={inputTodoItem.hour}
            handleIncrement={increment}
            handleDecrement={decrement}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TodoList;
