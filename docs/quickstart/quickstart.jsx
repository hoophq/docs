import React, { useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function () {
  return (
    <BrowserOnly>
      {() => {
        const QuickstartBuilder = require('./quickstart-builder').default;

        return (
          <QuickstartBuilder />
        )
      }}
    </BrowserOnly>
  );
}
