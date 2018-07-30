import React, { Component } from 'react';
import linkedinLogo1 from 'assets/in-1.png';
import linkedinLogo2 from 'assets/in-2.png';
import linkedinLogo3 from 'assets/in-3.png';

class ListItem extends Component {
  render() {
    const { firstName, lastName, headline, profileLink, photos } = this.props;
    return (
      <li className="m-listItem">
        <div className="row">
          <div className="col s5 m-avatar">
            <img src={photos} alt="" className="circle z-depth-3" />
          </div>
          <div className="col s7">
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
                <i className="material-icons text-color-1">bookmark_border</i>
              </div>
            </div>
            <div className="row m-labels">
              <a href={profileLink} className="m-view transparent z-depth-2">
                view
                <img src={linkedinLogo1} alt="" className="circle" />
              </a>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default ListItem;
