import React from "react";
import TodoItem from "./TodoItem";
import { Col, Row } from "react-bootstrap";

const TodoBoard = ({
  todoList,
  onUpdateTask,
  onDeleteTask,
  onToggleAllTasks,
}) => {
  // isComplete가 true인 항목을 먼저 정렬
  const sortedTodoList = [...todoList].sort(
    (a, b) => b.isComplete - a.isComplete
  );

  return (
    <div>
      <Row>
        <Col
          xs={12}
          className="d-flex justify-content-between align-items-center"
        >
          <h2>Todo List</h2>
          {/* 모든 할 일의 isComplete를 토글하는 버튼 */}
          <button
            className={`button-complete ${
              todoList.every((item) => item.isComplete) ? "" : "completed"
            }`}
            onClick={onToggleAllTasks}
          >
            {todoList.every((item) => item.isComplete)
              ? "모두 끝남으로 변경"
              : "모두 아직으로 변경"}
          </button>
        </Col>
      </Row>
      {sortedTodoList.length > 0 ? (
        sortedTodoList.map((item) => (
          <TodoItem
            key={item._id}
            item={item}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
      {/* <TodoItem/> will be here once we get the todoList */}
    </div>
  );
};

export default TodoBoard;
