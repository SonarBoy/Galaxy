//* Imports
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');

//* Passport and Authentication
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;

//* Auditing and Error Handling
let cors = require('cors');
let flash = require('connect-flash');

//* Java Web Token imports
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;




//* Router Imports
let indexRouter = require('../routes/index');
let planetRouter = require('../routes/planetsRouter');
let userRouter = require('../routes/userRouter');
let celestialObjectRouter = require('../routes/celestialObjectsRouter');
let galaxyRouter = require('../routes/galaxyRouter');





//* EXPLAIN HERE
let mongoose = require('mongoose');
let db = require('./db');

//* mongoose.connect(URI,options) = connect to mongo database;
/** 
 * * bufferCommands - This is a mongoose-specific option (not passed to the MongoDB driver) that disables mongoose's buffering mechanism
 * * user/pass - The username and password for authentication. These options are mongoose-specific, they are equivalent to the MongoDB driver's auth.user and auth.password options.
 * * autoIndex - By default, mongoose will automatically build indexes defined in your schema when it connects. This is great for 
 * * development, but not ideal for large production deployments, because index builds can cause performance degradation. If you set autoIndex to false, mongoose 
 * * will not automatically build indexes for any model associated with this connection.
 *  
 * * Example Options: 
 * * const options = {
 * * useNewUrlParser: true,
 * * useUnifiedTopology: true,
 * * useCreateIndex: true,
 * * useFindAndModify: false,
 * * autoIndex: false, // Don't build indexes
 * * poolSize: 10, // Maintain up to 10 socket connections
 * * serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
 * * socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
 * * family: 4 // Use IPv4, skip trying IPv6
* * };
 */

mongoose.connect(db.URI);

let MongoDB = mongoose.connection;
MongoDB.on('error',console.error.bind(console,"Connection Error: "));
MongoDB.once('open',() =>
{
    console.log("Connected to MongoDB...");
});


//* EXPLAIN HERE
/**
 * * app.set(name,value) assigns setting name to value. You may store any value that you
 * * want, but certain names can be used to configure the behaviour of the sever.
 * 
 * * https://expressjs.com/en/api.html#app.set
 */

/**
 * * app.use([path,] callback [,callback]) mounts the specified middleware function or functions
 * * at the specified path: the middleware function is executed when the base of the requested path matches path.
 * * 
 * *
 * *
 * * path = The parh for which the middleware function is invoked; can be any of:
 * 
   //*  - A string representing a path.
   //*  - A path pattern.
   //*  - A regular expression pattern to match paths.
   //*  - An array of combinations of any of the above.
 */
let app = express();
app.set('views',path.join(__dirname,'../views'));
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../../public')));
app.use(express.static(path.join(__dirname,'../../node_modules')));

app.use(cors());

app.use(session({
    secret:"SomeSecret",
    saveUnitialize: true,
    resave: true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



//* Passport Section

/**
 * serializeUser :determines which data of the user object should be stored in the 
 * session. The result of the serializeUser method is attached to the session as 
 * req.session.passport.user = {}. Here for instance, it would be (as we provide the 
 * user id as the key) req.session.passport.user = {id: 'xyz'}
 * 
 * deserializeUser corresponds to the key of the user object that was given to the done 
 * function (see 1.). So your whole object is retrieved with help of that key. That key 
 * here is the user id (key can be any key of the user object i.e. name,email etc). In deserializeUser 
 * that key is matched with the in memory array / database or any data resource.
 * 
 * * https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
 * 
 */
let userModel = require('../model/User');
let User = userModel.User;

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromHeader("authorization");
jwtOptions.secretOrKey = db.secret;

//* http://www.passportjs.org/packages/passport-jwt/
let strategy = new JWTStrategy(jwtOptions,(jwt_payload,done) => 
{
    User.findById(jwt_payload.id).then(user => {
        return done(null,user);
    }).catch(error => {
        return done(error,false);
    });
})

passport.use(strategy);

//* Appsection.
app.use('/api',indexRouter);
app.use('/api/Planets',planetRouter);
app.use('/api/celestialObjects',celestialObjectRouter);
app.use('/api/Galaxy',galaxyRouter);
app.use('/api/Users',userRouter);

//! Put back into the user router later
//passport.authenticate('jwt',{session:false}),


app.use(function(request,response,next){
    next(createError(404));
});

app.use(function(error,request,response,next){
    response.locals.message = error.message;
    response.locals.error = request.app.get('env') === 'development' ? error : {};

    response.status(error.status || 500);
    response.render('error');
})


module.exports = app;






