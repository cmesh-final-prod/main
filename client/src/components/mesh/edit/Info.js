import React from 'react';

const Info = ({
  firstName,
  lastName,
  photos,
  onChange,
  onFocus,
  headline,
  hiring,
  lookingForJob
}) => {
  const renderQLabels = () => {
    const Q = [
      {
        id: 1,
        text: 'hiring',
        render: hiring,
        className: 'hiring light-blue white-text'
      },
      {
        id: 2,
        text: 'looking for opportunities',
        render: lookingForJob,
        className: 'looking white light-blue-text'
      }
    ];

    return Q.map(q => {
      if (q.render) {
        return (
          <div key={q.id} className={`q-label ${q.className}`}>
            {q.text}
          </div>
        );
      }
    });
  };

  const renderInputField = () => {
    return (
      <div className="edit-input row">
        <div className="input-field col s10 edit-headline offset-s1">
          <input
            id="headline"
            type="text"
            value={headline}
            placeholder="Position at Company"
            className="text-color-1 validate center"
            onChange={event => onChange(event.target.value)}
            onFocus={() => onFocus()}
            required
          />

          <span className="helper-text" data-error="required">
            Edit Headline
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="edit-basic-profile text-color-1">
      <img src={photos[0]} alt="" className="circle" />
      <br />
      <span className="responsive edit-name">
        {`${firstName} ${lastName.substring(0, 1)}.`}
      </span>
      <br />
      {renderInputField()}
      <div className="center-align">{renderQLabels()}</div>
    </div>
  );
};

export default Info;
