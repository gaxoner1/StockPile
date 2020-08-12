import React from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: [props.prices],
        datasets: [
          {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [props.labels]
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
