import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TodoState } from './todo.reducer';

export const selectTodos = (state: AppState) => state.todos;
// export const selectNavStatus = (state: AppState) => state.navStatus;
export const selectAllTodos = createSelector(
  selectTodos,
  (state: TodoState) => state.todos
);

export const navStatus = createSelector(
  selectTodos,
  (state: TodoState) => state.navStatus
);
export const filteredTodos = createSelector(
  selectTodos,
  (state: TodoState) => state.filteredTodos
);
