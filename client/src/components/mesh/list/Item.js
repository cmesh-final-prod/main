import React, { Component } from 'react';
import M from 'materialize-css';

// importing assets
import linkedinLogo3 from 'assets/in-3.png';

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

  render() {
    const { firstName, lastName, headline, profileLink, photos } = this.props;
    let boo;
    if (this.props.organizer) {
      boo = 'organizer';
    }

    return (
      <li className="m-listItem">
        <div className="row">
          <div className="col s5 m-avatar m2">
            <img
              src={photos}
              alt=""
              className="circle z-depth-3 materialboxed"
            />
          </div>
          <div className="col s7 m10">
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
            <div className="row m-labels">
              <a
                href={profileLink}
                className={`m-view grey-text ${this.renderViewBg()}`}
                rel="noopener noreferrer"
                target="_blank"
                onClick={() => this.setState({ viewed: true })}
              >
                view
                <img src={linkedinLogo3} alt="" className="" />
              </a>
              <p>
                {this.props.hiring ? 'hiring' : ''}
                {this.props.lookingForJob ? 'looking' : ''}
              </p>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default Item;
