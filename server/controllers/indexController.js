let passport = require('passport');
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

module.exports.processLoginPage = (request,response,next) => 
{   
    /* 
    * passport.authenticate() 
    * Authenticates a user by specifying which strategy to employ. 
    * On failure Passport will respond with a 401 Unauthorized status.
    * http://www.passportjs.org/docs/authenticate/
    */
    passport.authenticate('local',
        (error,user,info) => {

            if(error){
                console.log(error);
                return next(error);
            }

            if(!user){
                return response.json({success:false,msg: "Failed to Login.",user:user});
            }
            /* 
            * passport.logIn() 
            * Used to establish a login session.
            * When the login operation completes, user will be assinged to request.user
            * http://www.passportjs.org/docs/login/
            */
            request.logIn(user,(error) => {

                if(error){
                    console.log(error);
                    return next(error);
                }

                const payload = {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    email:user.email
                }

                /* 
                * jwt.sign(payload, secretOrPrivateKey, [options, callback])
                * (Asynchronous) If a callback is supplied, the callback is called with the err or the JWT.
                * (Synchronous) Returns the JsonWebToken as string
                * 
                * OPTIONS:
                * payload: could be an object literal buffer or string representing valid JSON.
                * secretOrPrivateKey: is a string or object containing either the secret for HMAC algorithms or the PEM
                * encoded private key
                * algorithm (default: HS256)
                * expiresIn: expressed in seconds or a string describing a time span zeit/ms.
                * https://github.com/auth0/node-jsonwebtoken
                */
                const authToken = jwt.sign(payload, DB.secret,{
                    expiresIn: 604800
                });

                return response.json({success:true, msg: 'User logged in Successfully',
                user:{
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    email: user.email
                }, token: authToken});


                })

            })(request,response,next);
}


module.exports.processRegisterPage = (request,response,next) => 
{
    let newUser = new userModel.User({
        username: request.body.username,
        email: request.body.email,
        displayName: request.body.displayName
    });

    userModel.User.register(
        newUser,
        request.body.password,
        (error) => {
            
            if(error){
                console.log('Error: Inserting New User');

                if(error.name == "UserExistsError"){
                    console.log('Registration Error: User Already Exists');
                }

                return response.json({success:false,msg: 'Failed to login.'});
            }else{
                return response.json({success:true,msg: 'User registered Successfully!'});
            }
        });
}

module.exports.performLogout = (request,response,next) =>
{
    /* 
    * passport.logout() 
    * Passport exposes a logout() function on req (also aliased as logOut()) 
    * that can be called from any route handler which needs to terminate a login session. 
    * Invoking logout() will remove the req.user property and clear the login session (if any
    * http://www.passportjs.org/docs/logout/
    */
    request.logout();
    return response.json({success:true,msg: 'User Logout Successful!'});
}

