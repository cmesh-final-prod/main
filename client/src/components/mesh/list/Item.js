import React, { Component } from 'react';
import M from 'materialize-css';

// importing components
import ViewLn from 'components/_misc/labels/ViewLn';
import Label from 'components/_misc/labels/Label';

class Item extends Component {
  state = { viewed: false, bookmarked: false };

  componentDidMount() {
    const elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);
  }

  renderViewBg() {
    if (this.state.viewed) {
      return 'grey lighten-3';
    } else {
      return 'white';
    }
  }

  renderLabels() {
    const LABELS = [
      {
        text: 'organizer',
        cond: this.props.isOrganizer,
        bg: 'grey lighten-1 white-text grey-border'
      },
      {
        text: 'hiring',
        cond: this.props.hiring,
        bg: 'light-blue white-text light-blue-border'
      },
      {
        text: 'looking for opportunities',
        cond: this.props.lookingForJob,
        bg: 'light-blue-text white light-blue-border'
      }
    ];

    return LABELS.map(label => {
      return label.cond ? (
        <Label key={label.text} text={label.text} bg={label.bg} />
      ) : (
        ''
      );
    });
  }

  renderHiringLabel() {
    return this.props.hiring ? (
      <Label text="hiring" bg="light-blue white-text" />
    ) : (
      ''
    );
  }

  renderLookingLabel() {
    return this.props.lookingForJob ? (
      <Label
        text="looking for opportunities"
        bg="light-blue-text white light-blue-border"
      />
    ) : (
      ''
    );
  }

  render() {
    const { firstName, lastName, headline, profileLink, photos } = this.props;

    return (
      <li className="m-listItem">
        <div className="row">
          <div className="col s3 m-avatar m2">
            <img
              src={photos}
              alt=""
              className="circle z-depth-3 materialboxed"
            />
          </div>
          <div className="col s9 m10">
            <div className="row">
              <div className="col s10 m-info">
                <p>
                  <span className="m-name text-color-1 flow-text">
                    {`${firstName} ${lastName.substring(0, 1)}.`}
                  </span>
                  <br />
                  <span className="m-headline text-color-1 flow-text">
                    {headline}
                  </span>
                </p>
              </div>
              <div className="col s2 m-bookmark">
                <i className="material-icons text-color-1 small">
                  bookmark_border
                </i>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m-labels">
                <ViewLn
                  profileLink={profileLink}
                  bg={this.renderViewBg()}
                  onClick={viewed => this.setState({ viewed })}
                />
                {this.renderLabels()}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default Item;
