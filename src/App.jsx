import { useState, useEffect } from 'react'

// Issue 1: Inline API key (security issue)
const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  // Issue 2: State management bisa lebih baik
  const [state, setState] = useState({
    todos: [],
    input: '',
    filter: 'all',
  })
  
  // Issue 3: useEffect tanpa dependency array yang tepat
  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('todos')
    if (saved) {
      setState(prev => ({ ...prev, todos: JSON.parse(saved) }))
    }
  }, [])
  
  // Issue 4: useEffect yang terlalu sering run
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos))
  }, [state.todos])
  
  // Issue 5: Function yang tidak di-memoize, re-create setiap render
  const addTodo = useCallback(() => {
    if (state.input.trim() === '') {
      alert('Please enter a todo')
      return
    }
    
    // Issue 6: Menggunakan Date.now() sebagai ID (bisa collision)
    const newTodo = {
      id: crypto.randomUUID(),
      text: input,
      completed: false,
      createdAt: new Date().toISOString()
    }
    
    setState(prev => ({ ...prev, todos: [...prev.todos, newTodo], input: '' }))
  }, [state.input])
  
  // Issue 7: Tidak ada error handling
  const deleteTodo = (id) => {
    try {
      setState(prev => {
        const exists = prev.todos.some(todo => todo.id === id)
  
        if (!exists) {
          console.warn('Delete failed: todo not found', id)
          return prev
        }
  
        return {
          ...prev,
          todos: prev.todos.filter(todo => todo.id !== id),
        }
      })
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }
  
  const toggleTodo = (id) => {
    try {
      setState(prev => {
        const exists = prev.todos.some(todo => todo.id === id)
  
        if (!exists) {
          console.warn('Toggle failed: todo not found', id)
          return prev
        }
  
        return {
          ...prev,
          todos: prev.todos.map(todo =>
            todo.id === id
              ? { ...todo, completed: !todo.completed }
              : todo
          ),
        }
      })
    } catch (error) {
      console.error('Error toggling todo:', error)
    }
  }
  
  // Issue 8: Logic filtering yang bisa dipindah ke useMemo
  const filteredTodos = useMemo(() => {
    if (state.filter === 'active') {
      return state.todos.filter(todo => !todo.completed)
    }
    if (state.filter === 'completed') {
      return state.todos.filter(todo => todo.completed)
    }
    return state.todos
  }, [state.todos, state.filter])
  
  // Issue 9: Calculation yang tidak perlu di setiap render
  const stats = useMemo(() => {
    const completed = state.todos.filter(t => t.completed).length
  
    return {
      total: state.todos.length,
      completed,
      active: state.todos.length - completed,
    }
  }, [state.todos])
  
  // Issue 10: Inline event handler dengan arrow function (re-create setiap render)
  return (
    <div className="app">
      <h1>My Todo List</h1>
      
      {/* Issue 11: Tidak ada label untuk accessibility */}
      <div className="input-section">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTodo()
            }
          }}
          placeholder="What needs to be done?"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      {/* Issue 12: Inline styles (inconsistent dengan CSS file) */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setFilter('all')}
          style={{ background: filter === 'all' ? '#28a745' : '#007bff' }}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')}
          style={{ background: filter === 'active' ? '#28a745' : '#007bff' }}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')}
          style={{ background: filter === 'completed' ? '#28a745' : '#007bff' }}
        >
          Completed
        </button>
      </div>
      
      <div className="todo-list">
        {/* Issue 13: Tidak ada handling untuk empty state */}
        {getFilteredTodos().map((todo) => (
          // Issue 14: Key menggunakan index bisa lebih baik dengan ID
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {/* Issue 15: Potential XSS jika text dari user input */}
            <span dangerouslySetInnerHTML={{ __html: todo.text }} />
            <button 
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      
      <div className="stats">
        <p>Total: {stats.total} | Active: {stats.active} | Completed: {stats.completed}</p>
      </div>
      
      {/* Issue 16: Debug code yang tertinggal */}
      {console.log('Rendering with todos:', todos)}
      {console.log('API Key:', API_KEY)}
    </div>
  )
}

export default App