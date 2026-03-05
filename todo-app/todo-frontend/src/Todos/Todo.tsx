import React from 'react'

export type TodoItem = {
  id: string;
  text: string;
  done: boolean;
};

type Props = {
  todo: TodoItem;
  onToggle: (todo: TodoItem) => void;
  onDelete: (todo: TodoItem) => void;
};

const Todo: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
  return (
    <div>
      <span>{todo.text}</span>{" "}
      <span>{todo.done ? "done" : "not done"}</span>
      <button onClick={() => onToggle(todo)}>toggle</button>
      <button onClick={() => onDelete(todo)}>delete</button>
    </div>
  );
};

export default Todo;