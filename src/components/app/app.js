import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import NewItemForm from '../new-item-form';

import './app.css';

export default class App extends Component {

  maxId = 100;
  
  state = {
    todoData: [
      this.createItem('Drink Coffee'),
      this.createItem('Make Awesome App'),
      this.createItem('Have a lunch')
    ],
    term: '',
    filter: 'all'
  }

  toggleProperty(arr,id, propertyName){
    const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propertyName]: !oldItem[propertyName]};
      const newArray = [...arr.slice(0,idx),newItem, ...arr.slice(idx+1)];
      return newArray;
  }

  deleteItem = (id) =>{
    this.setState(({todoData})=>{

      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0,idx), ...todoData.slice(idx+1)];

      return{
        todoData: newArray
      }
    })
  }

  addItem = (text) =>{
    this.setState(({todoData})=>{

      const newArray = [...todoData, this.createItem(text)];
      
      return {
        todoData: newArray
      }
    })
  }

  createItem(label){
    return {
        label,
        important: false,
        done: false,
        id: this.maxId++
      }
    
  } 

  onToggleImportant = (id) => {
    this.setState(({todoData})=>{
      return{
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    }); 
  }

  onToggleDone = (id) => {
    this.setState(({todoData})=>{
      return{
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    }); 
  }
  
  onSearchChange = (term) => {
    this.setState({term});
  };

  onFilterChange = (filter) => {
    this.setState({filter});
  };

  search(items,term){
    if(term.length === 0){
      return items;
    }
    return items.filter((item)=> {
        return item.label.indexOf(term) > -1;
    });
  }

  filter(data, filter){
    switch(filter){
      case 'all':
        return data;
      case 'done':
        return data.filter((item) => item.done);
      case 'active':
        return data.filter((item) => !item.done);
      default:
        return data;
    }

  }

  selectAll = () => {
    const filter = 'all'
    this.setState(({filter}));
  };

  selectActive = () => {
    const filter = 'active'
    this.setState(({filter}));
  }

  selectDone = () => {
    const filter = 'done'
    this.setState(({filter}));
  }
  render(){

    const {todoData, term,filter} = this.state;

    const visibleData = this.filter(this.search(todoData,term), filter)
    
    const doneCount = visibleData.filter((x) => x.done).length;
    
    const todoCount = visibleData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange = {(term) => this.onSearchChange(term)}/>
          <ItemStatusFilter
            filter={filter}
            onFilterChange = {this.onFilterChange}/>
        </div>

        <TodoList 
          todos={visibleData} 
          onDeleted = { this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone = {this.onToggleDone}/>
        <NewItemForm onItemAdded = {this.addItem}/>
      </div>
    );
  }
};
