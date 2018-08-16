import React from 'react';

// importing components
import Label from 'components/_misc/labels/Label';

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
        className: 'color-1 white-text color-3-border'
      },
      {
        id: 2,
        text: 'looking for opportunities',
        render: lookingForJob,
        className: 'white color-1-text color-3-border'
      }
    ];

    return Q.map(q => {
      return q.render ? (
        <Label key={q.id} bg={q.className} text={q.text} />
      ) : (
        ''
      );
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
            className="color-4-text validate center"
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
    <div className="edit-basic-profile grey lighten-4">
      <div className="row">
        <div className="col s12 color-4-text">
          <img src={photos[0]} alt="" className="circle" />
          <br />
          <span className="responsive edit-name">
            {`${firstName} ${lastName.substring(0, 1)}.`}
          </span>
          <br />
          {renderInputField()}
        </div>
        <div className="col s12">
          <div className="horizontal-menu">{renderQLabels()}</div>
        </div>
      </div>
    </div>
  );
};

export default Info;
