const express = require("express")
const app = express();
const path = require("path");
const morgan = require('morgan');
const bodyParser = require('body-parser');

// const PORT = 3000;


// const validFrontendRoutes = ['/'];
// const indexPath = path.join(__dirname, './public/index.html');
// validFrontendRoutes.forEach(stateRoute => {
//   app.get(stateRoute, (req, res, next) => {
//     res.sendFile(indexPath);
//   });
// });

// /* Static middleware */
// app.use(express.static(path.join(__dirname, './public')))
// app.use(express.static(path.join(__dirname, './node_modules')))


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./apiRoutes'));

app.use(express.static(path.join(__dirname, '../public')))

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// app.listen(PORT, () => {
//   console.log("Server started at port " + PORT)
// });

// const port = process.env.PORT || PORT;
// app.listen(port, function () {
//   console.log("Knock, knock");
//   console.log("Who's there?");
//   console.log(`Your server, listening on port ${port}`);
// });

module.exports = app;
