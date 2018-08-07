import React from 'react';

const Label = ({ text, bg }) => {
  return <div className={`label ${bg}`}>{text}</div>;
};

export default Label;
