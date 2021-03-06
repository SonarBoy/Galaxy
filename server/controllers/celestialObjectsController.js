var celestialObjectModel = require('../model/CelestialObjects');

//*STEP 1: First GET request of all the documents in the celestialObjectsCollection 
//*We will also go into detail about how the steps work in this format.
module.exports.getCelestialObjectsList = (request,response,next) => 
{

   //*Ask the model object to find the celestial object colletion
   celestialObjectModel.find((error,celestialObjectList) => {

    if(error){
        //https://developer.mozilla.org/en-US/docs/Web/API/Console/error
        return console.error(error);
    } else {
        //* Successfully found the celestial objects returns json
        response.json({success:true,msg:"Celestial Objects Found",celestialObjectList: celestialObjectList});
    }
});
}

//*STEP 2: First GET request to the add Celestial Object
module.exports.getCelestialObjectsAdd = (request,response,next) =>
{
    response.render('celestialObjects/add',{
        title:'Add New Celestial Object'
    });
}

//*STEP 3: POST request to add a new planet to the celestialObjects collection
module.exports.postCelestialObjectsAdd = (request,response,next) =>
{

    //* Create a new object that is of type celestial object and 
    //* populate it with the variables from the request.
    let newObject = celestialObjectModel({"Name":request.body.Name,
    "Description":request.body.Description});

    //* Call the create function passing on the newObject and the model 
    //* you want to add it into.
    celestialObjectModel.create(newObject, (error,celestialObjectModel) =>{

        if(error){
            //* if there is an error spit it out to the console.
            console.log(error);
            response.end(error);
        }else{
            //* Otherwise reditect the navigation to the ObjectList.
            //response.redirect('ObjectList');
            response.json({success:true,msg:"Successfully added CelestialObject!"})
        }
    });

}

//* STEP 4: Specify the POST request to delete the celestial object.
module.exports.getCelestialObjectsDelete = (request,response,next) => 
{
    let id = request.params.id;
    celestialObjectModel.remove({_id:id},(error) =>{

        if(error){
            console.log(error);
            response.send(error);
        }else{
            //JESUS THANK YOU FOR HELPING ME WITH THIS.
            //NOTE:WHEN SPECIFYING REDIRECTION WITH MULTIPLE ROUTER OBJECTS
            //THINK ABOUT IT LIKE A DIRECTORY STRUCTURE WHEN PROGRAMMING IT.
            response.json({success:true,msg:"Successfully deleted Celestial Objects!"})
        }
    });
}

module.exports.getCelestialObjectsEdit = (request,response,next) =>
{
    let id = request.params.id;

    celestialObjectModel.findById(id, (error,celestialObjectReturn) =>{

        if(error){
            console.log(error);
            response.end(error);
        }else{
           response.json({success:true,msg:"Galaxy Found",galaxy:galaxyModelReturn});
        }
    });
}

module.exports.postCelestialObjectsEdit = (request,response,next) => 
{
    let id = request.params.id;

    let updatedCelestialObject = celestialObjectModel({
        "_id": id,
        "Name": request.body.Name,
        "Description": request.body.Description
    });

    celestialObjectModel.update({
        _id:id
    }, updatedCelestialObject, (error) =>{

        if(error){
            console.log(error);
            response.end(error);
        }else{
            response.json({success:true,msg:"Successfully deleted Galaxy!"})
        }

    });
}

