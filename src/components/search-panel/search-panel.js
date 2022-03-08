import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term: ''
  };


  onLabelChange = (e) => {
    const term = e.target.value;
    this.setState({term});
    this.props.onSearchChange(term);
    
  };
  render(){
    return (
      <input type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.onLabelChange}
        value = {this.state.term}
        />
      );
  }
};