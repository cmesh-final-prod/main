import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

const MENU = [
  {
    id: 1,
    text: "EVENTS",
    path: "/meshes",
    icon: "dashboard",
    icon_clicked: "dashboard"
  }
  // {
  //   id: 2,
  //   text: "dashboard",
  //   path: "/dashboard",
  //   icon: "dashboard",
  //   icon_clicked: "check"
  // }
];

class Sidemenu extends Component {
  state = { activeItem: null };

  componentDidMount() {
    const { pathname } = this.props.location;
    return MENU.map(item => {
      const { path, id } = item;
      return pathname === `/manage/app${path}`
        ? this.setState({ activeItem: id })
        : "";
    });
  }

  renderMenu() {
    const { url } = this.props;
    return MENU.map(item => {
      const { id, text, path, icon, icon_clicked } = item;

      return (
        <Link
          key={id}
          to={`${url}${path}`}
          onClick={() => this.setState({ activeItem: id })}
        >
          <div className={`center-align white-text`}>
            <i className="material-icons small">
              {this.state.activeItem === id ? icon_clicked : icon}
            </i>
            <p className="hide-on-med-and-down">{text}</p>
          </div>
        </Link>
      );
    });
  }

  render() {
    return <div>{this.renderMenu()}</div>;
  }
}

export default withRouter(Sidemenu);
