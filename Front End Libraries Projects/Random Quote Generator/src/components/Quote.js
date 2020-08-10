import React, { Component } from 'react'

export default class QuotesProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      color: [
        "#4c217c",
        "#858390",
        "#1e4636",
        "#a33ca2",
      ]
    }
  }

  getQuote = () => {
    fetch('https://quota.glitch.me/random')
      .then(response => response.json())
      .then(json => this.setState({ quote: json }))
  }

  fetchNewQuote = () => {
    this.getQuote();
  }

  componentDidMount() {
    this.getQuote();
  }

  render() {
    const randomNum = Math.floor(Math.random() * 4);

    return (
      <div className="wrapper" style={{ backgroundColor: this.state.color[randomNum] }}>
        <div id="quote-box">
          <div className="quote-text">
            <p id="text" >
              {this.state.quote.quoteText}
            </p>
          </div>
          <div className="quote-author">
            <span id="author" className="font-italic"  >
              - {this.state.quote.quoteAuthor}
            </span>

          </div>
          <div className="buttons">
            <a
              className="btn btn-primary btn-lg active"
              id="tweet-quote"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: this.state.color[randomNum] }}
              href={
                'https://twitter.com/intent/tweet?text="' +
                this.state.quote.quoteText + " -" +
                this.state.quote.quoteAuthor
              }>
              Tweet
          </a>
            <button
              type="button"
              className="btn btn-primary btn-lg active"
              id="new-quote"
              style={{ backgroundColor: this.state.color[randomNum] }}
              onClick={this.fetchNewQuote}>
              New Quote
          </button>
          </div>
        </div>

      </div>
    )
  }
}

