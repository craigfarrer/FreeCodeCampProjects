import React from 'react';
import Display from './Display';
import Keypad from './Keypad';
import * as math from 'mathjs';

const keys = {
  "zero": { text: "0" },
  "one": { text: "1" },
  "two": { text: "2" },
  "three": { text: "3" },
  "four": { text: "4" },
  "five": { text: "5" },
  "six": { text: "6" },
  "seven": { text: "7" },
  "eight": { text: "8" },
  "nine": { text: "9" },
  "equals": { text: "=" },
  "add": { text: "+" },
  "subtract": { text: "-" },
  "multiply": { text: "×" },
  "divide": { text: "÷" },
  "decimal": { text: "." },
  "clear": { text: "AC" }
}

const evaluateFormula = parts => {
  const formula = parts
    .map(part => {
      switch (part) {
        case '×':
          return '*';
        case '÷':
          return '/';
        default:
          return part;
      }
    })
    .join(' ');

  return math.eval(formula);
};

const removeTrailingDecimal = num => {
  return num.endsWith('.') ? num.slice(0, num.length - 1) : num;
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.resetState();
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress);
  }

  resetState = () => {
    return {
      formulaParts: [],
      hasDecimal: false,
      current: '',
      currentType: null
    };
  };

  handleKeyPress = event => {
    switch (event.key) {
      case '0':
        this.performCalculation('zero');
        break;
      case '1':
        this.performCalculation('one');
        break;
      case '2':
        this.performCalculation('two');
        break;
      case '3':
        this.performCalculation('three');
        break;
      case '4':
        this.performCalculation('four');
        break;
      case '5':
        this.performCalculation('five');
        break;
      case '6':
        this.performCalculation('six');
        break;
      case '7':
        this.performCalculation('seven');
        break;
      case '8':
        this.performCalculation('eight');
        break;
      case '9':
        this.performCalculation('nine');
        break;
      case '=':
        this.performCalculation('equals');
        break;
      case '+':
        this.performCalculation('add');
        break;
      case '-':
        this.performCalculation('subtract');
        break;
      case '*':
        this.performCalculation('multiply');
        break;
      case '/':
        this.performCalculation('divide');
        break;
      case '.':
      case ',':
        this.performCalculation('decimal');
        break;
      default:
        break;
    }
  };

  performCalculation = id => {
    this.setState(previousState => this.updateState(previousState, id));
  };

  updateState = (previousState, id) => {
    switch (id) {
      case 'clear':
        return this.resetState();
      case 'decimal':
        return this.updateStateWithDecimal(previousState);
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        return this.updateStateWithOperator(previousState, id);
      case 'equals':
        return this.evaluateState(previousState);
      default:
        return this.updateStateWithNumber(previousState, id);
    }
  };

  updateStateWithNumber = (previousState, id) => {
    switch (previousState.currentType) {
      case null:
      case 'result':
        return {
          ...this.resetState(),
          ...{ current: keys[id].text, currentType: 'number' }
        };
      case 'number':
        if (previousState.current === '0') {
          return {
            current: keys[id].text
          };
        }
        return {
          current: previousState.current + keys[id].text
        };
      case 'operator':
        return {
          formulaParts: [...previousState.formulaParts, previousState.current],
          current: keys[id].text,
          currentType: 'number'
        };
      default:
        return {};
    }
  };

  evaluateState = previousState => {
    let result = null;
    if (
      previousState.formulaParts.length === 0 &&
      previousState.currentType !== 'number'
    ) {
      return previousState;
    }
    switch (previousState.currentType) {
      case null:
      case 'result':
        return previousState;
      case 'number':
        const newFormulaParts = [
          ...previousState.formulaParts,
          removeTrailingDecimal(previousState.current)
        ];
        result = '' + evaluateFormula(newFormulaParts) + '';
        return {
          formulaParts: [...newFormulaParts, '=', result],
          hasDecimal: false,
          current: result,
          currentType: 'result'
        };
      case 'operator':
        result = '' + evaluateFormula(previousState.formulaParts) + '';
        return {
          formulaParts: [...previousState.formulaParts, '=', result],
          hasDecimal: false,
          current: result,
          currentType: 'result'
        };
      default:
        return {};
    }
  };

  updateStateWithOperator = (previousState, id) => {
    if (
      (id === 'add' || id === 'subtract') &&
      previousState.currentType === null
    ) {
      return {
        current: keys[id].text,
        currentType: 'operator'
      };
    } else if (previousState.currentType === 'null') {
      return previousState;
    } else if (previousState.currentType === 'result') {
      return {
        formulaParts: [previousState.current],
        current: keys[id].text,
        currentType: 'operator'
      };
    } else if (previousState.currentType === 'number') {
      return {
        formulaParts: [
          ...previousState.formulaParts,
          removeTrailingDecimal(previousState.current)
        ],
        current: keys[id].text,
        currentType: 'operator',
        hasDecimal: false
      };
    } else if (previousState.currentType === 'operator') {
      return {
        current: keys[id].text
      };
    }
  };

  updateStateWithDecimal = previousState => {
    switch (previousState.currentType) {
      case null:
      case 'result':
        return {
          ...this.resetState(),
          ...{ hasDecimal: true, current: '0.', currentType: 'number' }
        };
      case 'operator':
        return {
          formulaParts: [...previousState.formulaParts, previousState.current],
          hasDecimal: true,
          current: '0.',
          currentType: 'number'
        };
      case 'number':
        if (previousState.hasDecimal) {
          return previousState;
        } else {
          return {
            hasDecimal: true,
            current: previousState.current + '.',
            currentType: 'number'
          };
        }
      default:
        return {};
    }
  };

  render() {
    return (
      <div id="calculator">
        <Display state={this.state} />
        <Keypad
          keys={keys}
          performCalculation={this.performCalculation}
        />
      </div>
    );
  }
}

export default Calculator;
