import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';

import StoreApp from './components/StoreApp';

const apps = List.of(
  Map({id: 1, text: 'CoolBeans', rating: '1-5', review: false}),
  Map({id: 2, text: 'RocketShip', rating: '1-5', review: false}),
  Map({id: 3, text: 'FindMeFood', rating: '1-5', review: false})
);

ReactDOM.render(
  <StoreApp apps={apps} />,
  document.getElementById('app')
);
