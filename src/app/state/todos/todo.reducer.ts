import { createReducer, on } from '@ngrx/store';
import {
  addTodo,
  removeTodo,
  changeStatusTodo,
  loadTodos,
  loadTodosSuccess,
  loadTodosFailure,
} from './todo.actions';
import { Todo } from '../../todo/todo.model';

export interface TodoState {
  todos: Todo[];
  error: string;
  status: string;
  // status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TodoState = {
  todos: [],
  error: null,
  status: 'pending',
};

export const todoReducer = createReducer(
  // Supply the initial state
  initialState,
  // Add the new todo to the todos array
  on(addTodo, (state, { description, dueDate, priorityLevel, title }) => ({
    ...state,
    todos: [...state.todos,
    {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      priorityLevel,
      status: 'todo',
    }],
  })),
  // Remove the todo from the todos array
  on(removeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  })),

  on(changeStatusTodo, (state, { id, status }) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id == id) {
        let t: Todo = {
          id: todo.id,
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
          priorityLevel: todo.priorityLevel,
          status,
        };
        // t.status = status;
        // console.log("PRINT ", status)
        return t;
      } else return todo;
    }),
  })),

  // Trigger loading the todos
  on(loadTodos, (state) => ({ ...state, status: 'loading' })),
  // Handle successfully loaded todos
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: todos,
    error: null,
    status: 'success',
  })),
  // Handle todos load failure
  on(loadTodosFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
