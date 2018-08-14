import React from 'react';

// importing assets
import linkedinLogo3 from 'assets/in-3.png';

const ViewLn = ({ profileLink, bg, onClick }) => {
  return (
    <a
      href={profileLink}
      className={`label grey-text color-5-border ${bg}`}
      rel="noopener noreferrer"
      target="_blank"
      onClick={() => onClick(true)}
    >
      <div>view</div>
      <img src={linkedinLogo3} alt="" className="" />
    </a>
  );
};

export default ViewLn;
