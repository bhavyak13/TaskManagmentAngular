import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTodo, removeTodo, loadTodos, changeStatusTodo } from '../state/todos/todo.actions';
import { selectAllTodos } from '../state/todos/todo.selectors';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.page.html',
  styleUrls: ['todo.page.scss'],
})
export class TodoPage implements OnInit {
  public allTodos$ = this.store.select(selectAllTodos);

  obj: Todo = {
    title: '',
    description: '',
    dueDate: '',
    priorityLevel: 'low',
  };

  public statusArr: string[] = ['todo', 'pending', 'completed'];

  // this.allTodos$.map((t: Todo[])=>{
  //   this.activeTags = [];
  //   this.inactiveTags=[];
  //   t.forEach(e => {
  //    if (e.status=='active')
  //    {
  //      this.activeTags.push(e);
  //    }
  //    else if (e.status=='inactive')
  //    {
  //      this.inactiveTags.push(e);
  //    }
  //   });
  // });


  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(loadTodos());
  }

  ChangeStatus(todo: Todo, status: string) {
    this.store.dispatch(changeStatusTodo({ id: todo.id, status }));
  }
  addTodo() {
    if (!this.obj.title || !this.obj.description || !this.obj.dueDate) {
      alert("Please fill all details!!");
      return;
    }
    this.store.dispatch(addTodo(this.obj));
    this.obj = {
      title: '',
      description: '',
      dueDate: '',
      priorityLevel: 'low',
    };
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(removeTodo({ id: todo.id }));
  }
}
