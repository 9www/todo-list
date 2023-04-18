import { useState, useEffect } from "react";
import axios from "axios";

function todoApi() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("/todos").then((response) => {
      setTodos(response.data);
    });
  }, []);

  const createTodo = (todo) => {
    axios.post("/todo", todo).then((response) => {
      setTodos([...todos, response.data]);
    });
  };

  const updateTodo = (id, todo) => {
    axios.post(`/todo/${id}`, todo).then((response) => {
      const updatedTodos = todos.map((t) => {
        if (t.id === id) {
          return response.data;
        }
        return t;
      });
      setTodos(updatedTodos);
    });
  };

  const updateSchedule = (schedule) => {
    axios.post("/schedule", schedule).then((response) => {
      console.log(response);
    });
  };

  return { todos, createTodo, updateTodo, updateSchedule };
}

export default todoApi;
