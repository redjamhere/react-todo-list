import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Alert from '@material-ui/lab/Alert';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { ListItemText } from '@material-ui/core';

var todoItems: Array<any> = [];
todoItems.push({index: 1, value: "learn react", done: false});
todoItems.push({index: 2, value: "Go shopping", done: true});
todoItems.push({index: 3, value: "buy flowers", done: true});

interface TodoListProps {
  items: Array<any>;
  removeItem: any;
  markTodoDone: any;
}

class TodoList extends React.Component<TodoListProps, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    let items = this.props.items.map((item, index) => {
      return (
        <TodoListItem 
          key = {index} 
          item = {item} 
          index = {index}
          removeItem={this.props.removeItem}
          markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <ul className="list-group"> {items} </ul>
    );
  }
}

interface TodoListItemProps {
  index: any;
  removeItem: any;
  markTodoDone: any;
  item: any;
}

class TodoListItem extends React.Component<TodoListItemProps, {}> {
  constructor(props: any) {
    super(props);

    this.onHandleClose = this.onHandleClose.bind(this);
    this.onHandleDone = this.onHandleDone.bind(this);
  }
  
  onHandleClose(): void {
    let index = parseInt(this.props.index);
    this.props.removeItem(index);
  }

  onHandleDone(): void {
    let index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }

  render() {
    let todoClass = this.props.item.done ? "done" : "undone";
    return(
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemText primary=""/>
        </ListItem>
      </List>

      // <li className="list-group-item">
      //   <div className={todoClass}>
      //     <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onHandleDone}>{this.props.item.value}</span>
      //     <button type="button" className="close" onClick={this.onHandleClose}>&times;</button>
      //   </div>
      // </li>
    );
  }
}

interface TodoFormProps {
  addItem: any;
}

class TodoForm extends React.Component<TodoFormProps, {}> {
  private itemName: React.RefObject<HTMLInputElement>;
  private form: React.RefObject<HTMLFormElement>;

  constructor(props: TodoFormProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.itemName = React.createRef();
    this.form = React.createRef()
  }


  componentDidMount() {
    this.itemName.current?.focus();
  }

  onSubmit(event: any):void {
    event.preventDefault();
    let newItemValue: any = this.itemName.current?.value;
    
    if(newItemValue) {
      this.props.addItem({newItemValue});
      this.form.current?.reset();
    }
  }

  render() {
    return(
      <form ref={this.form} onSubmit={this.onSubmit} className="form-inline">
        {/* <input type="text" ref={this.itemName} className="form-control" placeholder="Добавить новую задачу..."/> */}
        <TextField inputProps={{'ref': this.itemName}} className="form-control" id="standard-basic" label="Добавить задачу..."/>
        <Button type="submit" variant="contained">Добавить</Button>
      </form>
    );
  }
}

class TodoHeader extends React.Component<{}, {}> {
  render() {
    return <h1>Лист задач (DEMO)</h1>;
  }
}

interface TodoAppProps {
  initItems: any;
}

interface TodoAppState {
  todoItems: Array<any>;
}

var todoItems: Array<any>;


class TodoApp extends React.Component<TodoAppProps, TodoAppState> {
  constructor(props: TodoAppProps) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {todoItems: todoItems};
  }

  addItem(todoItem: any): void {
    todoItems.unshift({
      index: todoItems.length + 1,
      value: todoItem.newItemValue,
      done: false
    });
    this.setState({todoItems: todoItems});
  }

  removeItem(itemIndex: number): void {
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }

  markTodoDone(itemIndex: number) {
    let todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({todoItems: todoItems});
  }

  render() {
    return (
      <div id="main">
        <Alert severity="warning">Вы используете раннюю версию приложения, возможны ошибки!</Alert>
        <div className="app-wrap">
          <div className="list-block">
            <TodoList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
          </div>
          <div className="controls-block">
            <TodoForm addItem={this.addItem} />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
<TodoApp initItems={todoItems}/>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
