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
  for (let i in search_query) {
    arg_query = { search_text: { $regex: new RegExp(search_query[i]), $options: 'i' } }
    arg_group = arg_group.concat(arg_query)
  }
  arg_template = arg_template.concat(arg_group)
  arg_object['$and'] = arg_template
  let all_lines = [];
  Data.find(arg_object, async function (err, data) {
    try {
      const data = await Data.find(arg_object);
      let line_number = 1
      let data_length = data.length - 1
      for (const answer in data) {
        let searchText = data[answer]['search_text'];
        let splitText = searchText.split('\n');
        for (let line in splitText) {
          for (let q in search_query) {
            if (splitText[line].toLowerCase().includes(search_query[q].toLowerCase())) {
              let numbered_line = [line_number + ": " + splitText[line]]
              all_lines.push(numbered_line)
              line_number = line_number + 1
            }
          }
        }

        // for (let line in all_lines) {
        //   console.log("ALL LINES", all_lines[line], all_lines.length)
        // }


        ticker_tracker.push(data[answer]['ticker'])

        data['all_lines'] = all_lines
        data['loading'] = false

        const companies = await Companies.find({ ticker: data[answer]['ticker'] });

        search_reply = {
          'ticker': data[answer]['ticker'],
          'title': data[answer]['title'],
          'url': data[answer]['url'],
          'release_date': data[answer]['release_date'],
          'document_date': data[answer]['document_date'],
          'name': companies[0]['name'],
          'market_cap': companies[0]['primary_share'][0]['market_cap'],
          'industry': companies[0]['gics_industry'],
          'sector': companies[0]['gics_sector'],
          'listing_date': companies[0]['listing_date'],
          'principal_activities': companies[0]['principal_activities'],
          'last_price': companies[0]['primary_share'][0]['last_price'],
          'last_trade_date': companies[0]['primary_share'][0]['last_trade_date'],
          'delisting_date': companies[0]['delisting_date'],
          'website': companies[0]['website'],
          'mailing_address': companies[0]['mailing_address'],
          'phone_number': companies[0]['phone_number'],
          'fax_number': companies[0]['fax_number'],
          'registry_name': companies[0]['registry_name'],
          'registry_phone_number': companies[0]['registry_phone_number'],
          'foreign_exempt': companies[0]['foreign_exempt'],
          'dividend_amount': companies[0]['last_dividend']['dividend_amount'],
          'dividend_type': companies[0]['last_dividend']['type'],
          'dividend_created': companies[0]['last_dividend']['created_date'],
          'share_type': companies[0]['primary_share']['type'],
          'pe': companies[0]['primary_share'][0]['pe'],
          'eps': companies[0]['primary_share'][0]['eps'],
          'average_daily_volume': companies[0]['primary_share'][0]['average_daily_volume'],
          'securities_outstanding': companies[0]['primary_share'][0]['securities_outstanding'],
          'all_lines': data['all_lines'],
          'loading': data['loading'],
          'line_length': all_lines.length,

        }

        answers.push(search_reply);

      }

      // sort by market cap or whatever
      answers.sort((a, b) => {
        const mcapA = a.line_length; // ignore upper and lowercase .tolowercase
        const mcapB = b.line_length; // ignore upper and lowercase
        if (mcapA > mcapB) {
          return -1;
        }
        if (mcapA > mcapB) {
          return 1;
        }

        // names must be equal
        return 0;
      });

      uniqueArray = [...new Set(ticker_tracker)]
      let unique_count = [{ 'unique_count': uniqueArray.length }]


      let package = []
      package.push(answers)
      package.push(unique_count)

      console.log("LENGTH", data.length)
      return res.json(package);
    } catch (err) {
      console.log(err);
    }

  });

})

app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));