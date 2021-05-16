import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Navigator from './app/modules/navigation/routes';
import { Container } from 'react-bootstrap';
import store from './store';
import { Notification } from './app/modules/common/ui/components/notify';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Container className="py-4">
      <Provider store={store}>
        <Navigator />
      </Provider>
      <Notification />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
