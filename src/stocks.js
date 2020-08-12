import React from 'react';
import Chart from './components/chart.js';

require('dotenv').config();

const keys = {
  stockKey: process.env.REACT_APP_API_KEY,
};
console.log(`apikey is: ${keys.stockKey}`)

class Stocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockPlotX : [],
      stockPlotY: [],
      stockQuery:"",
      priceData:[]
    }
  }

  componentDidMount() {
    this.stockQuery(); //TODO
    //this.twitterQuery(); //TODO
  }

  handleInput = e => {
    this.setState ({
      stockQuery: e.target.value
    });
    console.log(this.state.stockQuery)
  }

  search = e => {
    const userQuery = this.state.stockQuery
    e.preventDefault();
    this.stockQuery(userQuery)
  }

  stockQuery = async query => {
    try {
      const startDate = this.prevHundred();
      const endDate = Date.now()
      console.log(startDate)
      let response = await fetch(
        `https://finnhub.io/api/v1/stock/candle?symbol=${query}&resolution=D&from=${startDate}&to=${endDate}&token=${keys.stockKey}`,
        { mode: "cors" }
      );
      let stockJson = await response.json(); //return API
      let stockData = JSON.stringify(stockJson); //to json string
      //this.saveResult(stockData)
      //push historic data to state
      //console.log(stockData)
      let stockPrice = JSON.parse(stockData).c //to Json Obj
      let priceDate = JSON.parse(stockData).t
      console.log(stockPrice)
      //this.saveResult(stockPrice)
      this.setState ({
        stockPlotX: stockPrice,
        stockPlotY: priceDate
      })
      console.log(`price array state: ${this.state.stockPlotY}`)
    } catch (err) {
      console.log(`todo Handle Error- ${err}`)
    }
      console.log(`this was searched: ${query}`)
  }

  prevHundred = () => {
    const now = new Date() //returns UNIX timestamp for API call
    const startTimeStamp = now.setDate(now.getDate()-100);
    return Math.floor(startTimeStamp/1000); //to 10 digit UNIX Format
  }

  // saveResult = stockObj => {
  //   for (i in stockObj) {
  //     console.log(stockObj[i])
  //   }
  // }


  render() {
    return (
      <div>
        <div>
          <Chart label={this.state.stockPlotY} prices={this.state.stockPlotX} />
        </div>
        <div id='searchwrap'>
          <form id="search" onSubmit={this.search}>
            <input
              type="text"
              placeholder="Search Stock"
              value={this.state.stockQuery}
              onChange={this.handleInput}
            />
            <button type="submit">Search</button>
          </form>
        </div>
    </div>
  );
}
}
export default Stocks;
