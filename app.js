const express = require('express')
const app = express()
const port = 80

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
      res.sendFile('main.html', {root: __dirname })
});  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})