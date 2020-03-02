var express = require('express');
var router = express.Router();

var userRouter = require('../controllers/userControllers');

//https://expressjs.com/en/4x/api.html#app.get
//https://expressjs.com/en/4x/api.html#app.post.method
//https://www.w3schools.com/tags/ref_httpmethods.asp

/*
    app.get(path,callback[, callback ...])

    path: The path of which the middleware function is invoked;
    can be any of:
        - a string represents a path
        - a path pattern
        - regular expression pattern to math paths
        - array of combinations of any of the above.

    callback functions:
        - middleware function.
        - a series of middleware functions

    You can provide multiple callback functions that behave just 
    like middleware, except that these callbacks can invoke next('route') 
    to bypass the remaining route callback(s).
*/


/*
    app.post(path, callback[, callback ...])

    path: The path of which the middleware function is invoked;
    can be any of:
        - a string represents a path
        - a path pattern
        - regular expression pattern to math paths
        - array of combinations of any of the above.

    callback functions:
        - middleware function.
        - a series of middleware functions

    You can provide multiple callback functions that behave just 
    like middleware, except that these callbacks can invoke next('route') 
    to bypass the remaining route callback(s).
*/

router.get('/',userRouter.getUserList);

router.get('/add',userRouter.getAddUser);
router.post('/add',userRouter.postAddUser);

router.get('/edit/:id',userRoute.getEditUser);
router.post('/edit/:id',userRoute.postEditUser);

router.get('/delete/:id',userRouter.getDeleteUser);

router.get('/register',userRouter.postAddUser);

router.get('/forgotPassword',userRouter.forgotPasswordGet);
//router.get('/forgotPassword',userRouter.forgotPasswordPost);

module.exports = router;

