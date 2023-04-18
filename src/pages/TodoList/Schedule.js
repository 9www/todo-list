import { useContext } from "react";
import "../../styles/pages/TodoList/Schedule.scss";
import TodoItem from "../../components/TodoItem.js";
import { TodoContext } from "../../App";

function Schedule() {
  const { todoItems, handleUpdateTodoList } = useContext(TodoContext);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  let groupedItems = [{ date: "Today", items: [], totalHours: 0 }];

  for (let i = 0; i < todoItems.length; i++) {
    const todoItem = todoItems[i];
    if (todoItem.completed) {
      continue;
    }
    const lastGroup = groupedItems[groupedItems.length - 1];
    if (lastGroup.totalHours + todoItem.hour > 8) {
      if (formatDate(tomorrow) === lastGroup.date) {
        groupedItems.push({ date: "Tomorrow", items: [], totalHours: 0 });
      } else {
        groupedItems.push({
          date: formatDate(tomorrow),
          items: [],
          totalHours: 0,
        });
      }
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    groupedItems[groupedItems.length - 1].items.push(todoItem);
    groupedItems[groupedItems.length - 1].totalHours += todoItem.hour;
  }

  return (
    <div className="schedule-page-container">
      <div className="title">Schedule</div>
      <div className="todo-items-container">
        {groupedItems.map((group, key) => (
          <div key={key}>
            <div className="date-group-text">{group.date}</div>
            {group.items.map((todoItem) => (
              <TodoItem
                key={todoItem.id}
                todoItem={todoItem}
                handleUpdateTodoList={handleUpdateTodoList}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
