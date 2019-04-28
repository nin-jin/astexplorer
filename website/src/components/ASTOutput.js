import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import visualizations from './visualization';

const {useState} = React;

function formatTime(time) {
  if (!time) {
    return null;
  }
  if (time < 1000) {
    return `${time}ms`;
  }
  return `${(time / 1000).toFixed(2)}s`;
}

export default function ASTOutput({parseResult={}, position=null}) {
  const [selectedOutput, setSelectedOutput] = useState(0);
  const {ast=null} = parseResult;
  let output;

  if (parseResult.error) {
    output =
      <div style={{padding: 20}}>
        {parseResult.error.message}
      </div>;
  } else if (ast) {
    output = React.createElement(
      visualizations[selectedOutput],
      {parseResult, position}
    );
  }

  let buttons = visualizations.map(
    (cls, index) =>
      <button
        key={index}
        value={index}
        onClick={event => setSelectedOutput(event.target.value)}
        className={cx({
          active: selectedOutput == index,
        })}>
        {cls.name}
      </button>
  );

  return (
    <div className="output highlight">
      <div className="toolbar">
        {buttons}
        <span className="time">
          {formatTime(parseResult.time)}
        </span>
      </div>
    {output}
    </div>
  );
}

ASTOutput.propTypes = {
  parseResult: PropTypes.object,
  position: PropTypes.number,
};

