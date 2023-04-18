import { useState } from "react";
import CountHour from "./CountHour";
import "../styles/components/TodoItem.scss";

function TodoItem({ todoItem, handleUpdateTodoList }) {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(todoItem.text);

  function handleThisIncrement() {
    if (todoItem.hour < 8) {
      const updatedTodoItem = { ...todoItem, hour: todoItem.hour + 1 };
      handleUpdateTodoList(updatedTodoItem);
    }
  }

  function handleThisDecrement() {
    if (todoItem.hour > 0) {
      const updatedTodoItem = { ...todoItem, hour: todoItem.hour - 1 };
      handleUpdateTodoList(updatedTodoItem);
    }
  }

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function handleTextUpdate() {
    const updatedTodoItem = { ...todoItem, text };
    handleUpdateTodoList(updatedTodoItem);
    setEditMode(false);
  }

  return (
    <li className="todo-item-container">
      <div
        className={todoItem.completed ? "completed-button" : "complete-button"}
        type="checkbox"
        checked={todoItem.completed}
        onClick={() => {
          handleUpdateTodoList({ ...todoItem, completed: !todoItem.completed });
        }}
      ></div>
      {editMode ? (
        <div className="edit-container">
          <input
            className="edit-input"
            type="text"
            value={text}
            onChange={handleTextChange}
            onBlur={handleTextUpdate}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleTextUpdate();
              }
            }}
          />
          <div className="edited-button" onClick={handleTextUpdate}></div>
        </div>
      ) : (
        <div className="todo-text-container">
          <div className="todo-text" onClick={() => setEditMode(true)}>
            {todoItem.text}
          </div>
        </div>
      )}
      <CountHour
        hour={todoItem.hour}
        handleIncrement={handleThisIncrement}
        handleDecrement={handleThisDecrement}
      />
    </li>
  );
}

export default TodoItem;
