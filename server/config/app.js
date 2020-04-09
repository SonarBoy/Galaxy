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
    saveUninitialize: true,
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

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



/* *
 * ExtractJWT INCLUDED EXTRACTIONS
 *
 *   fromHeader(header_name) creates a new extractor that looks for the JWT in the given http header
 * 
 *   fromBodyField(field_name) creates a new extractor that looks for the JWT in the given body field. 
 *   You must have a body parser configured in order to use this method.
 * 
 *   fromUrlQueryParameter(param_name) creates a new extractor that looks for the JWT in the 
 *   given URL query parameter.
 * 
 *   fromAuthHeaderWithScheme(auth_scheme) creates a new extractor that looks for the JWT in the 
 *   authorization header, expecting the scheme to match auth_scheme.
 * 
 *   fromAuthHeaderAsBearerToken() creates a new extractor that looks for the JWT in the authorization 
 *   header with the scheme 'bearer'
 * 
 *   fromExtractors([array of extractor functions]) creates a new extractor using an array of extractors 
 *   provided. Each extractor is attempted in order until one returns a token.
 * 
 */




let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromHeader("authorization");
jwtOptions.secretOrKey = db.secret;

/* *
new JwtStrategy(options, verify)

options is an object literal containing options to control how the token is extracted from the request or verified.

    secretOrKey is a string or buffer containing the secret (symmetric) or PEM-encoded public key 
    (asymmetric) for verifying the token's signature. REQUIRED unless secretOrKeyProvider is provided.

    secretOrKeyProvider is a callback in the format function secretOrKeyProvider(request, rawJwtToken, done), 
    which should call done with a secret or PEM-encoded public key (asymmetric) for the given key and request 
    combination. done accepts arguments in the format function done(err, secret). Note it is up to the implementer 
    to decode rawJwtToken. REQUIRED unless secretOrKey is provided.

    jwtFromRequest (REQUIRED) Function that accepts a request as the only parameter and returns either the JWT as a 
    string or null. See Extracting the JWT from the request for more details.

    issuer: If defined the token issuer (iss) will be verified against this value.

    audience: If defined, the token audience (aud) will be verified against this value.

    algorithms: List of strings with the names of the allowed algorithms. For instance, ["HS256", "HS384"].

    ignoreExpiration: if true do not validate the expiration of the token.

    passReqToCallback: If true the request will be passed to the verify callback. i.e. verify(request, jwt_payload, done_callback).

    jsonWebTokenOptions: passport-jwt is verifying the token using jsonwebtoken. Pass here an options object for any other 
    option you can pass the jsonwebtoken verifier. (i.e maxAge) verify is a function with the parameter
*/


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

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, '../../public/index.html'));
  });

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






