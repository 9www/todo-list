import { useContext } from "react";
import "../../styles/pages/TodoList/Todo.scss";
import TodoItem from "../../components/TodoItem.js";
import { TodoContext } from "../../App";

function Todo() {
  const { todoItems, handleUpdateTodoList } = useContext(TodoContext);

  const totalHours = todoItems.reduce((acc, todoItem) => {
    return acc + todoItem.hour;
  }, 0);

  return (
    <div className="todo-page-container">
      <div className="title">To-do List</div>
      <div className="todo-items-container">
        {todoItems.map((todoItem, key) => (
          <TodoItem
            key={todoItem.id}
            todoItem={todoItem}
            handleUpdateTodoList={handleUpdateTodoList}
          />
        ))}
      </div>
      {totalHours === 0 ? (
        <></>
      ) : (
        <div className="total-hours-text">{totalHours}</div>
      )}
    </div>
  );
}

export default Todo;
