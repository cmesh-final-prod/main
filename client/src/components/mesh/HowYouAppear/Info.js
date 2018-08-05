import React from 'react';

const Info = ({ firstName, lastName, photos, onChange, onFocus, headline }) => {
  const renderInputField = () => {
    return (
      <div className="row">
        <div className="input-field col s10 offset-s1">
          <label htmlFor="headline" className="grey-text">
            Edit Headline
          </label>
          <br />

          <input
            id="headline"
            type="text"
            value={headline}
            placeholder="Position at Company"
            className="text-color-1 validate"
            onChange={event => onChange(event.target.value)}
            onFocus={() => onFocus()}
            required
          />

          <span className="helper-text" data-error="required" />
        </div>
      </div>
    );
  };

  return (
    <div className="text-color-1">
      <div className="">
        <img src={photos[0]} alt="" className="circle" />
        <br />
        <span className="responsive edit-name">
          {`${firstName} ${lastName.substring(0, 1)}.`}
        </span>
        <br />
        {renderInputField()}
      </div>
    </div>
  );
};

export default Info;
