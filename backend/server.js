const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { Data, Companies } = require('./data.js');
const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute = 'mongodb+srv://unpzonapp:Y4zkPQECWbVEUb0e@cluster0.q8mkepv.mongodb.net/matrix?retryWrites=true&w=majority';

mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.post("/searchData", (req, res, next) => {
  console.log("REQUEST---", req.body.search_obj)
  // console.log("SPLIT OUT ...", req.body.search_obj.split(/"+/).map(e => e.trim()).filter(e => e.length > 0))
  let answers = []
  let uniqueArray = []
  let all_them = []
  let search_query = req.body.search_obj
  let arg_group = [];
  let arg_template = [];
  let arg_object = {}
  let ticker_tracker = []

  async function getdata () {
    const data = await Companies.find({});
    console.log(data[0])
  }

  // data.map((_data, index)=>{
  //   _data["searchable_announcements"].map(()=>{

  //   })
  // })
  getdata();

})

app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));