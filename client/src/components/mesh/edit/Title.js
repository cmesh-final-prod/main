import React from 'react';

const Title = ({ text }) => {
  return (
    <div className="valign-wrapper">
      <div className="edit-header">
        <h5 className="center color-4-text responsive edit-title">{text}</h5>
      </div>
    </div>
  );
};

export default Title;
