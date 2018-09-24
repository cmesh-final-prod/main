import React, { Component } from "react";
import * as L from "components/_misc/LOG-TYPES";

// container elements
import { connect } from "react-redux";
import * as actions from "actions";

let allClass;
let hiringClass;
let lookingForJobClass;

class SortMeshUsers extends Component {
  state = {
    all: true,
    hiring: false,
    lookingForJob: false,
    sortOption: "all"
  };

  componentDidMount() {
    this.renderButtons();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.renderButtons();
    }
  }

  renderButtons() {
    const { users } = this.props.selectedMesh;
    let hiring = 0;
    let lookingForJob = 0;

    users.forEach(user => {
      const a = user.hiring ? hiring++ : "";
      const b = user.lookingForJob ? lookingForJob++ : "";
      return [a, b];
    });

    hiring === 0
      ? this.setState({ hiring: false })
      : this.setState({ hiring: true });
    lookingForJob === 0
      ? this.setState({ lookingForJob: false })
      : this.setState({ lookingForJob: true });
  }

  handleClick(optionId) {
    this.props.onClick(optionId);
    this.setState({ sortOption: optionId });

    const { fingerPrint } = this.props.currentUser;
    const createLogProps = {
      fingerPrint,
      log: {
        logType: `${L.SORT_OPTION_CLICKED}: ${optionId}`,
        componentServed: "mesh-list-sortMeshUsers",
        meshId: this.props.selectedMesh.data.meshId,
        userId: this.props.currentUser.data._id
      }
    };
    this.props.createLog(createLogProps);
  }

  renderSortOptions() {
    const { isPopulated } = this.props.selectedMesh;
    if (isPopulated) {
      const SORT_OPTIONS = [
        {
          id: "all",
          name: "all",
          render: this.state.all
        },
        {
          id: "hiring",
          name: "hiring",
          render: this.state.hiring
        },
        {
          id: "lookingForJob",
          name: "looking for opportunities",
          render: this.state.lookingForJob
        }
      ];

      return SORT_OPTIONS.map(option => {
        const active = "white color-5-text";
        const inActive = "grey-text text-lighten-3";
        let className;
        this.state.sortOption === option.id
          ? (className = active)
          : (className = inActive);
        return option.render ? (
          <div
            key={option.id}
            className={`${className} label`}
            onClick={() => this.handleClick(option.id)}
          >
            {option.name}
          </div>
        ) : (
          ""
        );
      });
    }
  }

  render() {
    return (
      <div className="horizontal-menu sort-options color-4 z-depth-2">
        {this.renderSortOptions()}
      </div>
    );
  }
}

function mapStateToProps({ currentUser, selectedMesh }) {
  return { currentUser, selectedMesh };
}

export default connect(
  mapStateToProps,
  actions
)(SortMeshUsers);
