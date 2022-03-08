import React, {Component} from 'react';
import './new-item-form.css';

export default class NewItemForm extends Component {

  state = {
    label: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    });
  };
  
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: ''
    });
  };

  render(){
    return (
      <form className='d-flex new-item-form'
            onSubmit={this.onSubmit}>
        <input type="text"
                className="form-control new-item-input"
                onChange={this.onLabelChange}
                value = {this.state.label}
                placeholder="type to add" />
        <button type="button"
                  className="btn btn-info"
                  onClick ={this.onSubmit}>Add</button>
      </form>
    );
  }
};
