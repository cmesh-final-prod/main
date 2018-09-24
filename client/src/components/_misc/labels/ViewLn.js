import React from "react";

const ViewLn = ({ profileLink, bg, onClick }) => {
  return (
    <a
      href={profileLink}
      className={`label ${bg}`}
      rel="noopener noreferrer"
      target="_blank"
      onClick={() => onClick(true)}
    >
      <div>
        view <span className="bold-text color-4-border"> in </span>
      </div>
    </a>
  );
};

export default ViewLn;
