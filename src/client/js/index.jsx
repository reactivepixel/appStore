import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';

import AppStore from './components/AppStore';

const app = List.of(
  Map({id: 1, text: 'App1'}),
  Map({id: 2, text: 'App2'}),
  Map({id: 3, text: 'App3'})
);

ReactDOM.render(
  <AppStore app={app} />,
  document.getElementById('app')
);
