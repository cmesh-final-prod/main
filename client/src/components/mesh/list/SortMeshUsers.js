import React, { Component } from 'react';
import * as L from 'components/_misc/LOG-TYPES';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

let allClass;
let hiringClass;
let lookingForJobClass;

class SortMeshUsers extends Component {
  state = {
    all: true,
    hiring: false,
    lookingForJob: false,
    sortOption: 'all'
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
      const a = user.hiring ? hiring++ : '';
      const b = user.lookingForJob ? lookingForJob++ : '';
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
        componentServed: 'mesh-list-sortMeshUsers',
        meshId: this.props.selectedMesh.data.meshId,
        userId: this.props.currentUser.data._id
      }
    };
    this.props.createLog(createLogProps);
  }

  renderButtonClass() {
    const active = 'grey white-text color-5-border';
    const inActive = 'grey lighten-5 grey-text color-5-border';
    switch (this.state.sortOption) {
      case 'all':
        allClass = active;
        hiringClass = inActive;
        lookingForJobClass = inActive;
        return;
      case 'hiring':
        allClass = inActive;
        hiringClass = active;
        lookingForJobClass = inActive;
        return;
      case 'lookingForJob':
        allClass = inActive;
        hiringClass = inActive;
        lookingForJobClass = active;
        return;
      default:
        allClass = active;
        hiringClass = inActive;
        lookingForJobClass = inActive;
        return;
    }
  }

  renderSortOptions() {
    const { isPopulated } = this.props.selectedMesh;
    if (isPopulated) {
      const SORT_OPTIONS = [
        {
          id: 'all',
          name: 'all',
          className: allClass,
          render: this.state.all
        },
        {
          id: 'hiring',
          name: 'hiring',
          className: hiringClass,
          render: this.state.hiring
        },
        {
          id: 'lookingForJob',
          name: 'looking for opportunities',
          className: lookingForJobClass,
          render: this.state.lookingForJob
        }
      ];

      return SORT_OPTIONS.map(option => {
        return option.render ? (
          <div
            key={option.id}
            className={`${option.className} label`}
            onClick={() => this.handleClick(option.id)}
          >
            {option.name}
          </div>
        ) : (
          ''
        );
      });
    }
  }

  render() {
    this.renderButtonClass();
    return (
      <div className="horizontal-menu sort-options color-4 color-5-border z-depth-1">
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
