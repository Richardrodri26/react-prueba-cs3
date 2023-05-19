import { create } from 'zustand'
import { IToDo } from '../../interfaces'

interface ITodosState {
    ZusTodos: IToDo[]
    addTodo: (todo: IToDo) => void;
    toggleCompleted: (id:string) => void;
    removeTodo: (id: string) => void;
    editTodo: (id:IToDo[]) => void;
}

export const useStore = create<ITodosState>((set) => ({
  ZusTodos: [],

  addTodo : (todo) => {
    set((state) => ({
        ZusTodos: [
            ...state.ZusTodos,
            todo
          ]
    }))
  },

  removeTodo: (id) => {
    set((state) => ({
        ZusTodos: state.ZusTodos.filter(todo => todo.id !== id),
    }))
  },

  toggleCompleted: (id) => {
    set((state) => ({
        ZusTodos: 
            state.ZusTodos.map((todo) => todo.id === id ? ({...todo, isCompleted: !todo.isCompleted} as IToDo) : todo)
    }))
  },

  editTodo: (todo: IToDo[]) => {
    set((state) => ({
        ZusTodos:
            state.ZusTodos = todo
    }))
  }
  

}))