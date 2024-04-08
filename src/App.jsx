import { useState } from 'react'

import Todo from './components/Todo'

import Search from './components/Search'

import TodoForm from './components/TodoForm'

import Filter from './components/Filter'

import './App.css'


function App() {
  const [todos, setTodos] = useState([
    
  ])

  const [search, setSearch] = useState("")
  // state para o filtro por status
  const [filter, setFilter] = useState("All")
  // state para ordenar o filtro
  const [sort, setSort] = useState("Asc")

  const addTodo = (text, category) => {
    const newTodos = [...todos, {
      id: Math.floor(Math.random() * 1000),
      text: text,
      category: category,
      isCompleted: false,
    }
    ]
    setTodos(newTodos)
  }

  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    )
    setTodos(filteredTodos)
  }

  const completeTodo = (id) => {
    // pegando todas as tarefas
    const newTodos = [...todos]

    // procurando a tarefa pelo id e fazendo efeito de toggling
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)

    // atualizando o array de tarefas
    setTodos(newTodos)
  }

  return (
    <div className='app'>
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

      <div className='todo-list'>
        {todos
          .filter((todo) =>
            filter === "All"
              ? true
              : filter === "Completed"
                ? todo.isCompleted
                : !todo.isCompleted
          )
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) =>
            sort === "Asc"
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          )
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))
        }
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  )
}

export default App
