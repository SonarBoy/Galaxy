let userModel = require('../model/User');
let email = require('../../email-Util');

module.exports.getUserList = (request,response,next) =>
{
    /*
        Model.find()
        + The filter are cast to their respective SchemaTypes before the command is sent.

            - filter: Object

            - projection: Object optional fields to return see
                Query.prototype.select() = Specifies which document fields to include or exclude.
                "-" flag will exclude document fields.
                "+" flag will include document fields.


            - options: Object optional see
                Query.prototype.setOptions() = Sets query options.
                (https://mongoosejs.com/docs/api.html#query_Query-setOptions)
                - tailable
                - sort
                - limit
                - skip
                - maxscan
                - batchSize
                - comment
                - snapshot
                - readPreference
                - hint

            - callback: Function
    */

    userModel.User.find((error,userList) =>{

        if(error){
            return console.error(error);
        }else{
            response.json({success:true,msg:"User Found",userList: userList});
        }

    });
}

module.exports.getAddUser = (request,response,next) =>
{
    /*
        .json() method of the Body mixin takes a Response stream and reads it to completion.
        returns a promise that resolves with the result of parsing the body text as JSON.

        Promise = represents the eventual completion (or failure) of an asynchronous operation
        and its resulting value.
    */

    response.json({success:true,msg:"Successfully Displayed Add Page"});
}

module.exports.postAddUser = (request,response,next) =>
{
    var newUser = new userModel.User({
        username: request.body.username,
        email:request.body.email,
        displayName: request.body.displayName
    });


    //https://github.com/saintedlama/passport-local-mongoose
    //Register: convenience method to register a new user instance with a given password.
    userModel.User.register(
        newUser,
        request.body.password,
        (error) => {

            if(error){
                console.log('Error: Inserting new user.' + newUser);
                console.log(error);

                if(error.name == "UserExistsError"){
                    console.log('Registration Error: User already exists.');
                }

                return error;
            }else{
                response.json({success:true,msg:"Successfully added new contact!"});
            }
        }
    )
}

module.exports.getEditUser = (request,response,next) =>
{

}

module.exports.postEditUser = (request,response,next) =>
{
     var id = request.params.id;

     var updatedUser = new userModel.User({
        "_id": id,
        "username": request.body.username,
        "email": request.body.email,
        "displayName": request.body.displayName,
        "password":request.body.password,
        "created":Date.now,
        "updated":Date.now,
    },{});

    /*
        Model.update() updates one document in the database without returning it;

        filter «Object»
        doc «Object»
        [options] «Object» optional see Query.prototype.setOptions()
            https://mongoosejs.com/docs/api.html#model_Model.updateOne

    */
    userModel.update({_id:id},updatedUser,(error) =>{
        if(error){
            console.log(error);
            response.end(error);
        }else{
            response.json({success:true,msg:"Successfully editited new contact!"});
        }
    });
}

module.exports.getDeleteUser = (request,response,next) =>
{
    let id = request.params.id;

    /* 
        Model.deleteOne() = deletes the first doucment that matches conditions from the collection.
            conditions «Object»
            [options] «Object» optional see Query.prototype.setOptions()
            [callback] «Function» 
    */

    userModel.User.deleteOne({_id:id},(error) =>{
        if(error){
            console.log(error);
        }else{
            response.redirect('../');
        }

    });
}

module.exports.forgotPasswordGet = (request,response,next) =>
{
    userModel.User.findOne({email:request.body.email},(error,user) =>{

        if(error){
            console.log("Error");
        }else{
            console.log(user.email);

            user.setPassword("Test",(error,user) =>{
                if(error){
                    return error;
                }else{
                    user.save();
                    email.sendNotificationEmail(user.email,'This is a Test','Your password has been set to test');
                    response.json({success:true,msg:"Password reset email successfully sent."});
                }   
            });
        }
    });
}