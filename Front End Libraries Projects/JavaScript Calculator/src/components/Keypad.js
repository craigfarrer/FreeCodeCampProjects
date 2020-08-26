import React from 'react';
import Key from './Key';

const Keypad = props => {
  const keys = Object.keys(props.keys);

  return (
    <div id="keypad">
      {keys.map(key => {
        return (
          <Key
            key={key}
            btnId={key}
            btnOb={props.keys[key]}
            performCalculation={props.performCalculation}
          />
        );
      })}
    </div>
  );
};

export default Keypad;
