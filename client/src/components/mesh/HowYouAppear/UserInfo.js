import React from 'react';

const UserInfo = ({ firstName, lastName, photos, headline }) => {
  return (
    <div className="text-color-1">
      <div className="">
        <p>
          <img src={photos[0]} alt="" className="circle" />
          <br />
          <span className="responsive edit-name">
            {`${firstName} ${lastName.substring(0, 1)}.`}
          </span>
          <br />
          <span className="edit-headline">
            {headline} <i className="tiny material-icons">edit</i>
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
