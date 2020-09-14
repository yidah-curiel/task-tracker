  import React from 'react';
  import {Line} from 'react-chartjs-2';
  import { makeStyles } from '@material-ui/core/styles';
  import CardContent from '@material-ui/core/CardContent';

  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100%'
    },
    chartContainer: {
      position: 'relative', 
      
      [theme.breakpoints.up('md')]: {
        padding: "5%",
      }
    },

  }));

  const LineGraph = ({labels, dataset}) => {
    const classes = useStyles();

    console.log(dataset)
    const data = {
      labels: labels, //['8/9', '9/9', '10/9', '11/9', '12/9', '13/9', '14/9'],
      datasets: [
        // propiedades para una linea en la grafica
        {
          label: 'Tareas Realizadas',
          fill: false,
          pointRadius: 0,
          lineTension: 0.56,
          borderColor: '#303f9f',
          backgroundColor: '#303f9f',
          borderWidth: 2,
          // cada punto de esta linea
          data: dataset//[9, 14, 16, 8, 10, 13, 7, 5, 10]
        },
        // propiedades para otra linea en la grafica
       /* {
          label: 'Tareas Cortas',
          fill: false,
          pointRadius: 0,
          lineTension: 0.56,
          borderDash: [4, 4],
          borderColor: '#a5d6a7',
          backgroundColor: '#a5d6a7',
          borderWidth: 2,
          data: [0, 3, 5, 9, 2, 10, 11, 6, 10]
        } */
      ]
    }

    const options={
      legend:{
        display:true,
        labels: {
          usePointStyle: true,
        }
      },
      layout: {
        padding: 0
    },
      scales: {
          // xAxes affect the vertical lines of your dataset
          xAxes: [{
              gridLines: {
                  color: "transparent",
              }
          }]
      } 
  }

      return (
        <CardContent>
                <div className={classes.chartContainer}>
          <Line
            data={data}
            options={options}
          />
        </div>
              </CardContent>
      );
  }

  export default LineGraph;