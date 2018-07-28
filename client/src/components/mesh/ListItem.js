import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    return (
      <li className="collection-item avatar">
        <img src={this.props.photos} alt="" className="circle" />
        <span className="title">{this.props.firstName}</span>
        <p>
          {this.props.headline}
          <br />
          <a href={this.props.profileLink} className="btn light-blue">
            View Profile
          </a>
        </p>
      </li>
    );
  }
}

export default ListItem;
