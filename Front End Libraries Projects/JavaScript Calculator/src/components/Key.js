import React from 'react';

class Key extends React.Component {
  performCalculation = () => {
    this.props.performCalculation(this.props.btnId);
  };
  render() {
    return (
      <div
        className="key"
        id={this.props.btnId}
        onClick={this.performCalculation}
      >
        {this.props.btnOb.text}
      </div>
    );
  }
}

export default Key;
