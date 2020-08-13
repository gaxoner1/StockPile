import React from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: //[1,2,3,4],
        [props.labels],
        datasets: [
          {
            label: 'Stock Name',
            fill: false,
            //lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            //borderColor: 'rgba(0,0,0,1)',
            borderColor: "#3e95cd",
            //borderWidth: 2,
            data: //[20, 30, 40, 45, 60, 21, 12, 33]
            [props.prices]
          }
        ]
      }
    }
  }
  render() {
    return (
      <div>
        <Line
          data={this.state.chartData}
          options={{
            title:{
              display:true,
              text:'Stock Price',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
