import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTodo, removeTodo, loadTodos, changeStatusTodo } from '../state/todos/todo.actions';
import { selectAllTodos } from '../state/todos/todo.selectors';
import { Todo } from './todo.model';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.page.html',
  styleUrls: ['todo.page.scss'],
})
export class TodoPage implements OnInit {

  // variables..
  public allTodos$ = this.store.select(selectAllTodos);
  obj: Todo = {
    title: '',
    description: '',
    dueDate: '',
    priorityLevel: 'low',
  };
  public showSystem: boolean = false;
  public activeNavBtn: string = 'all';
  public statusArr: string[] = ['todo', 'pending', 'completed'];
  public statusArrNav: string[] = ['all', 'todo', 'pending', 'completed'];
  constructor(private store: Store) { }
  public tempArr: Todo[] = []


  // functions..
  toggleSystem() {
    this.showSystem = !this.showSystem;
  }
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
    this.showSystem = false;
  }
  removeTodo(todo: Todo) {
    this.store.dispatch(removeTodo({ id: todo.id }));
  }
  downloadFile(data: any) {
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'myFile.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  changeNavStatus(status: string) {
    this.activeNavBtn = status;
    // let data: any;
    // this.allTodos$.forEach(e => {
    //   data = e;
    // })
    // this.tempArr = [];
    // data.map(e => {
    //   if (e.status == status || status=='all') this.tempArr.push(e)
    // })
  }


  downloadCsv() {
    let data: any;
    console.log(this.allTodos$);
    this.allTodos$.forEach(e => {
      data = e;
    })
    this.downloadFile(data);
  }

}