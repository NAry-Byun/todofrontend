import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, onDeleteTask, onUpdateTask }) => {
  const formattedDate = new Date(item.updatedAt).toLocaleString();
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <span className="todo-date">마지막 업데이트 : {formattedDate}</span>
            <button
              className="button-delete"
              onClick={() => onDeleteTask(item._id)}
            >
              삭제
            </button>
            <button
              className={`button-complete ${
                item.isComplete ? "completed" : ""
              }`}
              onClick={() => onUpdateTask(item._id, !item.isComplete)}
            >
              {item.isComplete ? "아직" : "끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
