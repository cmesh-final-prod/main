import React from 'react';

const Oops = () => {
  return (
    <div className="row">
      <div className="col s10 offset-s1 oops center z-depth-2">
        <div className="row">
          <div className="col s4 oops-icon right-align">
            <i className="material-icons red-text text-darken-1 oops-icon">
              location_off
            </i>
          </div>
          <div className="col s8 oops-title grey-text left-align">Oops!</div>
        </div>
      </div>
    </div>
  );
};

export default Oops;
