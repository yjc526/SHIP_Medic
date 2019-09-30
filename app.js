var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require("body-parser");
var helmet = require('helmet');

var app = express();

app.use(helmet());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine("html", require("ejs").renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("edcodingkey_yjc"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({resave:false, 
  saveUninitialized:true, 
  secret:"encodingkey_yjc",
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 3600000
  },rolling:true
}));

app.use('/', require('./routes/index'));

/*
app.use('/register', require('./routes/register'));
app.use('/delete_account', require('./routes/delete_account'));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/account_page", require("./routes/account_page"));
app.use("/pw_check", require("./routes/pw_check"));
app.use("/update_account", require("./routes/update_account"));
app.use("/about", require("./routes/about"));
app.use("/key", require("./routes/key"));
app.use("/key_check", require("./routes/key_check"));
app.use("/key_check_page", require("./routes/key_check_page"));
app.use("/key_delete", require("./routes/key_delete"));
app.use("/cs", require("./routes/cs"));
app.use("/cs_qna", require("./routes/cs_qna"));
app.use("/dup_check",require("./routes/dup_check"));
app.use("/404",require("./routes/404"));
*/


/*
var logoutRouter = require("./routes/logout");
app.use("/logout", logoutRouter);
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.redirect("404");
  //next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err.stack);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
