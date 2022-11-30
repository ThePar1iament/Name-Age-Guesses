import React, { useState, useEffect } from 'react';
import Form from './Form.js';

import '../style.css';

export default function App() {
  return (
    <div className="container">
      <div className="header">
        <h1 className="text-center">Name Age Guesses</h1>
      </div>
      <div className="d-flex m-4 flex-column">
        <Form />
      </div>
    </div>
  );
}
