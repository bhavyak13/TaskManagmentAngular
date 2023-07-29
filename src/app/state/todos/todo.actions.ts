import { createAction, props } from '@ngrx/store';
import { Todo } from '../../todo/todo.model';

export const addTodo = createAction(
  '[Todo Page] Add Todo',
  props<{
    title: string,
    description: string,
    dueDate: string,
    priorityLevel: string
  }>()
);

export const removeTodo = createAction(
  '[Todo Page] Remove Todo',
  props<{ id: string }>()
);
export const changeStatusTodo = createAction(
  '[Todo Page] Change Status Todo',
  props<{ id: string, status: string }>()
);

export const changeNavStatusTodo = createAction(
  '[Todo Page] Change Nav Status Todo',
  props<{ status: string }>()
);


export const loadTodos = createAction('[Todo Page] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo API] Todo Load Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailure = createAction(
  '[Todo API] Todo Load Failure',
  props<{ error: string }>()
);
