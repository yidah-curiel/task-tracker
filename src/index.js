import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  colors: {
    primary: "#707070",
    blue: "#0332a0",
    secondary: "#ffc000",  
    white: "#ffffff",
  },
  background: {
    primary: "#ebebeb",
    secondary: "#ffffff"
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
       <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
