import * as path from 'path';
import * as express from 'express';
import axios from 'axios';


const port = 3080;
const app = express();




const http = require('http').Server(app);

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/api', (req, res) => {
  axios.get("http://www.colourlovers.com/api/palettes/new?format=json")
  .then(result => res.send(result.data))
  .catch(err => res.send(err))
});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
