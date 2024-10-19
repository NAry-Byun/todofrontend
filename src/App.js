import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const addTask = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: true,
      });
      if (response.status === 200) {
        console.log("성공");
        //1. 입력한 값이 안사라짐 해결
        setTodoValue("");
        //2. 추가한 값이 안보임 해결
        getTasks();
      } else {
        throw new Error("task can not be added");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const getTasks = async () => {
    const response = await api.get("/tasks");
    console.log("get", response);
    setTodoList(response.data.data);
  };

  // updateTask 함수 추가
  const updateTask = async (id, isComplete) => {
    try {
      const response = await api.put(`/tasks/${id}`, {
        isComplete,
      });
      if (response.status === 200) {
        getTasks();
      } else {
        throw new Error("Task cannot be updated");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  // deleteTask 함수 추가
  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      } else {
        throw new Error("Task cannot be deleted");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  // 모든 항목의 isComplete를 토글하는 함수
  const toggleAllTasks = async () => {
    const allComplete = todoList.every((item) => item.isComplete);
    const updatedList = todoList.map((item) => ({
      ...item,
      isComplete: !allComplete, // 모두 완료 또는 모두 미완료로 변경
    }));

    // 모든 할 일을 백엔드에 업데이트
    try {
      await api.put("/tasks/toggle-all", { isComplete: !allComplete });
      setTodoList(updatedList); // 프론트엔드에서도 상태를 변경
    } catch (err) {
      console.log("Error toggling all tasks", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
        onToggleAllTasks={toggleAllTasks}
      />
    </Container>
  );
}

export default App;
