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
          <div className="col s5 m-avatar m2">
            <img src={photos} alt="" className="circle z-depth-3" />
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
              <a href={profileLink} className="m-view transparent grey-text">
                view
                <img src={linkedinLogo3} alt="" className="" />
              </a>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default ListItem;
