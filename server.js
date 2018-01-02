const express = require("express")
const app = express();
const path = require("path");
const PORT = 1337;


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


app.use(express.static(path.join(__dirname, './public')))

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log("Server started at port " + PORT)
});
