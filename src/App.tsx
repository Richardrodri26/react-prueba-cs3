import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import { IToDo, TFilters } from './interfaces';
import { useStore } from './context/store/TodosStore';
import { MdOutlineDoneOutline } from 'react-icons/md'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Navbar } from './components';
import { useStoreUi } from './context/store';


function App() {
  //zustand
  const { ZusTodos, addTodo, removeTodo, toggleCompleted, editTodo } = useStore();
  const { darkMode } = useStoreUi();

  // haciendo funcionalidad luego refactorizar para que sea todo manipulable desde un solo objecto
  const [todos, setTodos] = useState<IToDo[]>([]);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [onEdit, setOnEdit] = useState<IToDo | false | string>(false)

  const [titleEdit, setTitleEdit] = useState('');
  const [descriptionEdit, setDescriptionEdit] = useState('');

  const [filters, setFilters] = useState<TFilters>();
  const [search, setSearch] = useState('')

  const onTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  const onTitleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTitleEdit(e.target.value)
  }

  const onDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setDescription(e.target.value)
  }

  const onDescriptionEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setDescriptionEdit(e.target.value)
  }
  const onSubmitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = uuidv4();
    const newTodo = [...todos, { title, description, id, isCompleted: false }]
    setTodos(newTodo)

    addTodo({ id, title, description, isCompleted: false })

    setDescription('')
    setTitle('')
  }

  const onEditToDo = (index: number, id: string) => {
    const newTodos = [...todos];

    newTodos[index].title = titleEdit
    newTodos[index].description = descriptionEdit


    setTodos(newTodos)
    setOnEdit(false)
    setDescriptionEdit('')
    setTitleEdit('')

    editTodo(newTodos)
  }

  const deleteToDo = (id: string) => {
    const newTodos = [...todos];
    const DeletedTodos = newTodos.filter(todo => todo.id !== id)
    setTodos(DeletedTodos)

    removeTodo(id)

  }

  const editToDo = (index: number, id: string) => {
    setOnEdit(id)

  }

  const onToggleCompleted = (id: string) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(todo => todo.id === id)

    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)

    toggleCompleted(id)
  }

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
    setFilters('search')
  }


  return (
    <main className={`h-auto container mx-auto flex flex-col justify-center items-center w-full ${darkMode ? 'dark' : 'ligh'}`}>
      <Navbar />
      <section className='flex flex-col md:flex-row gap-5 justify-center items-center min-h-screen w-full md:px-[10] bg-zinc-300 text-black dark:bg-slate-800 dark:text-white'>
        <div className='w-[90%] md:w-1/2 flex flex-col justify-center items-center gap-5'>
          <h1 className="w-full text-4xl font-bold uppercase text-center" >Todo list app</h1>

          <label htmlFor="">Busca por la descripcion</label>
          <input className='text-black rounded-full py-2 px-4' type="text" onChange={onSearch} value={search} />

          <form
            onSubmit={onSubmitTodo}
            className='flex flex-col gap-5 justify-center items-center'
          >
            <label htmlFor="">Agrega un TO DO</label>
            <input type="text" className='border-2 border-sky-600 text-black rounded-full py-2 px-4' onChange={onTitle} value={title} />
            <textarea className='border-2 border-sky-600 text-black rounded-md py-2 px-4' onChange={onDescription} value={description} />


            <button className='py-2 px-4 bg-sky-400 text-white dark:text-black rounded-lg'>Agregar todo</button>
          </form>

          <div className='flex gap-3'>
            <button className='py-2 px-4 shadow-md bg-slate-600 rounded-lg text-white' onClick={() => { setFilters('all') }}>Todas</button>
            <button className='py-2 px-4 shadow-md bg-slate-600 rounded-lg text-white' onClick={() => { setFilters('completed') }}>Completadas</button>
            <button className='py-2 px-4 shadow-md bg-slate-600 rounded-lg text-white' onClick={() => { setFilters('incompleted') }}>Por hacer </button>
          </div>

        </div>

        <div className='md:w-1/2 flex flex-col gap-5 justify-center items-center w-[80%] mx-auto'>
          {ZusTodos.filter(todo => {
            if (filters === 'completed') return todo && todo.isCompleted
            if (filters === 'incompleted') return todo && !todo.isCompleted
            if (filters === 'search') return todo && todo.description.toLowerCase().includes(search.toLowerCase())
            return todo && true

          }).map((todo, index) => (
            <>
              <div className='w-auto md:max-w-[250px] md:min-w-[200px] p-2 leading-relaxed flex flex-col justify-center items-center rounded-md shadow-md bg-slate-600' key={index}>
                <div className={`text-white p-4`}>
                  {
                    (onEdit === todo.id)
                      ? (
                        <>
                          <form
                            className='flex flex-col gap-5 justify-center items-center'
                          >
                            <label htmlFor="">Edita tu toDo</label>
                            <input type="text" className='border-2 border-sky-600 text-black rounded-full py-2 px-4' onChange={onTitleEdit} value={titleEdit} />
                            <textarea className='border-2 border-sky-600 text-black rounded-md py-2 px-4' onChange={onDescriptionEdit} value={descriptionEdit} />


                            <button onClick={() => onEditToDo(index, todo.id)} className='py-2 px-4 bg-sky-600 text-white rounded-lg'>guardar</button>
                          </form>
                        </>
                      ) :
                      (
                        <>
                          <p className={`${todo.isCompleted ? 'line-through' : ''}`}>Titulo: {todo.title}</p>
                          <p>Descripción: {todo.description}</p>
                        </>
                      )
                  }
                </div>
                <div className='flex gap-5'>
                  <button
                    className='text-red-500'
                    onClick={() => { deleteToDo(todo.id) }}
                  >
                    <span><AiOutlineDelete /></span>
                  </button>
                  <button
                    className='text-yellow-500'
                    onClick={() => editToDo(index, todo.id)}
                  >
                    <span><AiOutlineEdit /></span>
                  </button>
                  <button
                    onClick={() => { onToggleCompleted(todo.id) }}
                    className='text-green-600'
                  >
                    <span><MdOutlineDoneOutline /></span>
                  </button>
                </div>
              </div>
            </>
          ))
          }
        </div>
      </section>
    </main>
  )
}

export default App
