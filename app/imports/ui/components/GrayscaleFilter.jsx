// adapted from: http://codepen.io/dudleystorey/pen/DcBIH

import React from 'react';
import './GrayscaleFilter.css';

const GrayscaleFilter = () => (
  <div style={{ display: 'none' }}>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
      <filter id="greyscale">
        <feColorMatrix
          type="matrix"
          values="0.3333 0.3333 0.3333 0 0
                  0.3333 0.3333 0.3333 0 0
                  0.3333 0.3333 0.3333 0 0
                  0      0      0      1 0"
        />
      </filter>
    </svg>
  </div>
);

export default GrayscaleFilter;
