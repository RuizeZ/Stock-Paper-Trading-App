const express = require('express');
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c823s8qad3i9d12p6hqg"
const finnhubClient = new finnhub.DefaultApi()
const app = express()
const port = process.env.PORT || 3000
var total_data = {};
//send all the file
app.use(express.static(__dirname + '/src'))

function getInfo(companyName) {
  Promise1 = new Promise((resolve, reject) => {
    finnhubClient.companyProfile2({
      'symbol': companyName
    }, (error, data, response) => {
      total_data['company'] = data;
      resolve();
    });
  })

  // get start date and end date
  var date = new Date();
  endDate = Math.round(date.getTime() / 1000);
  date.setMonth(date.getMonth() - 6);
  startDate = Math.round(date.getTime() / 1000);
  Promise2 = new Promise((resolve, reject) => {
    finnhubClient.stockCandles(companyName, "5", startDate, endDate, (error, data, response) => {
      total_data['history'] = data;
      resolve();
    });
  })
  return Promise.all([Promise1, Promise2]);
}

app.get('/search/:name', async (req, res) => {
  companyName = req.params['name']
  await getInfo(companyName);
  res.json(total_data);
})
// custom 404 page
app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 - Not Found')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.type('text/plain')
  res.status(500)
  res.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))