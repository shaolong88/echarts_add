import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import RouterIndex from './routers/index.js';

ReactDOM.render(<RouterIndex />, document.getElementById('root'));
registerServiceWorker();
