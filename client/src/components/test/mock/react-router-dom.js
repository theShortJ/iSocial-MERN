import React from 'react';
const mockedReactRrouterDom = require('react-router-dom');

// Just render plain div with its children
mockedReactRrouterDom.BrowserRouter = ({children}) => <div>{children}</div>

module.exports = mockedReactRrouterDom;
