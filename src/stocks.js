import React from 'react';
import Chart from './components/chart.js';

require('dotenv').config();

const keys = {
  stockKey: process.env.REACT_APP_API_KEY,
};

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

  saveArrayState = (price) => {
    let tempArry = []

    for (var val in price) {
      tempArry.push(price[val])
    }
      console.log (`tmp array :${tempArry}`)
      console.log (`tempArry type: ${typeof ((tempArry))}`)
    this.setState({
      stockPlotY: [tempArry]
    })
    console.log (`price passed to state type: ${typeof (this.state.stockPlotY)}`)
  }

  stockQuery = async query => {
    try {
      const startDate = this.prevHundred();
      const endDate = Date.now()
      console.log(startDate)
      console.log(endDate)
      let response = await fetch(
        `https://finnhub.io/api/v1/stock/candle?symbol=${query}&resolution=D&from=${startDate}&to=${endDate}&token=${keys.stockKey}`,
        { mode: "cors" }
      );
      let stockJson = await response.json(); //return API
      console.log(`stockJSON dot c: ${typeof (stockJson.c)}`)
      //let stockData = JSON.stringify(stockJson); //to json string
      //this.saveResult(stockData)
      //push historic data to state
      //console.log(stockData)
      let stockPrice = stockJson.c //c is close price from API call
      let priceDate = stockJson.t //t is time from API call

      this.saveArrayState(stockPrice)
      // console.log(Object.values(stockPrice))
      // //this.saveResult(stockPrice)
      // this.setState ({
      //   stockPlotX: Object.values(stockPrice)(stockPrice),
      //   stockPlotY: Object.values(priceDate)
      // })
      // console.log(`price array state: ${Object.values(stockPrice)}`)
      // console.log(`price array type: ${typeof (Object.values(stockPrice))}`)
      //
      // console.log(`date array state: ${this.state.stockPlotY}`)
      // console.log(`date array type: ${typeof this.state.stockPlotY}`)

    } catch (err) {
      console.log(`todo Handle Error- ${err}`)
    }
      console.log(`this was searched: ${query}`)
  }

//NEED better way to get historic datagoing back in time UNIX stamps
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
