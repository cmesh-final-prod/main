import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListItem extends Component {
  render() {
    return (
      <li className="collection-item avatar">
        <img src={this.props.photos} alt="" className="circle" />
        <span className="title">{this.props.firstName}</span>
        <p>
          {this.props.headline}
          <br />
          <Link to={this.props.profileLink} className="btn light-blue">
            View Profile
          </Link>
        </p>
      </li>
    );
  }
}

export default ListItem;
