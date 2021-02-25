import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import ReactDom from 'react-dom';

import App from './app';

const body = window.document.getElementsByTagName('body');
const app = window.document.createElement('div');

app.setAttribute('class', 'excel-to-js');
body[0].append(app);

ReactDom.render(
  (<App />),
  app,
);
