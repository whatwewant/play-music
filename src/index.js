/**
* @Author: eason
* @Date:   2017-03-26T00:56:38+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-03-26T01:28:42+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

app.model(require('./models/playlist'));

app.model(require('./models/player'));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
