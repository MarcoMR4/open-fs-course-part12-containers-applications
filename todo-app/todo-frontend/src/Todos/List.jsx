import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

    return (
      <>
        {todos.map(todo => {
          return (
            <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
              <Todo
                todo={todo}
                onDelete={onClickDelete(todo)}
                onToggle={onClickComplete(todo)}
              />
            </div>
          )
        }).reduce((acc, cur) => [...acc, <hr key={Math.random()} />, cur], [])}
      </>
    )
}

export default TodoList
