import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';

// HtmlWebpackPlugin requires us to append to body
// Appending a child this way, gets around React warning about appending directly to body
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
render(<App />, root);
