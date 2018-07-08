import React, { Component } from 'react';

class List extends Component {
  render() {
    return (
      <div>
        <h1>Mesh List</h1>
        <h3>Mesh ID: {this.props.match.params.meshId}</h3>
      </div>
    );
  }
}

export default List;
