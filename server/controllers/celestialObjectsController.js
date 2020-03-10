var celestialObjectModel = require('../model/CelestialObjects');

//*STEP 1: First GET request of all the documents in the celestialObjectsCollection 
//*We will also go into detail about how the steps work in this format.
module.exports.getCelestialObjectsList = (request,response,next) => 
{

    //*Ask the model object to find the celestial object colletion
    celestialObjectModel.find((error,celestialObjectList) =>{

        
        if(error){
            return console.error(error);
        }else{
            
            //*Otherwise render the index.ejs page in the /views/celestialObjects directory
            //*passing the title and celestialObjectList properties in the response object.
            response.render('celestialObjects/index',{
                title: 'Celestial Object List',
                celestialObjectList: celestialObjectList,
                displayName: request.user ? request.user.displayName : ""
            });
        }
    });
}

//*STEP 2: First GET request to the add Celestial Object
module.exports.addCelestialObjectsDisplay = (request,response,next) =>
{
    response.render('celestialObjects/add',{
        title:'Add New Celestial Object'
    });
}

//*STEP 3: POST request to add a new planet to the celestialObjects collection
module.exports.addCelestialObjects = (request,response,next) =>
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
            response.redirect('ObjectList');
        }
    });

}

//* STEP 4: Specify the POST request to delete the celestial object.
module.exports.deleteCelestialObjects = (request,response,next) => 
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
            response.redirect('../ObjectList');
        }
    });
}

module.exports.editCelestialObjectsGET = (request,response,next) =>
{
    let id = request.params.id;

    celestialObjectModel.findById(id, (error,celestialObjectReturn) =>{

        if(error){
            console.log(error);
            response.end(error);
        }else{
            response.render('celestialObjects/edit',{
                title:"Edit Celestial Object",
                celestialObject: celestialObjectReturn,
                displayName: request.user ? request.user.displayName : ""
            });
        }
    });
}

module.exports.editCelestialObjectsPOST = (request,response,next) => 
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
            response.redirect('../ObjectList');
        }

    });
}

