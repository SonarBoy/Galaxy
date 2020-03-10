let galaxyModel = require('../model/Galaxy');

module.exports.getGalaxyList = (request,response,next) => {
    galaxyModel.find((error,galaxyList) =>{

        if(error){
            return console.log(error);
        }else{

            /*
            ! Remove after testing
            response.render('galaxy/index',{
                title: 'Galaxy List',
                galaxyList: galaxyList,
                displayName: request.user ? request.user.displayName : ""
            });
            */
        }
    })
}

module.exports.getGalaxyAdd = (request,response,next) => {
    /*
    ! Remove after testing.
    response.render('galaxy/add',{
        title:'Add new Galaxy Object',
        displayName: request.user ? request.user.displayName : ""
    });
    */
}

module.exports.postGalaxyAdd = (request,response,next) =>{
    let newObject = galaxyModel({
        "Name": request.body.Name,
        "Designation": request.body.Designation,
        "Type": request.body.Type,
        "Diameter": request.body.Diameter,
        "DistanceFromEarth": request.body.DistanceFromEarth,
        "Mass": request.body.Mass,
        "Constellation": request.body.Constellation,
        "Discovered": request.body.Discovered,
        "Stars": request.body.Stars
    });

    galaxyModel.create(newObject,(error,galaxyModel) =>{
        if(error){
            console.log(error);
            response.end(error);
        }else{
            //! Remove after testing
            //response.redirect('./ObjectList');
        }
    });
}

module.exports.getGalaxyEdit = (request,response,next) =>{
    let id = request.params.id;

    galaxyModel.findById(id,(error,galaxyModelReturn) =>{
        if(error){
            console.log(error);
            response.end(error);
        }else{

            /*
            ! Remove after testing.
            response.render('galaxy/edit',{
                title:"Edit Galaxy Object",
                galaxyObject: galaxyModelReturn,
                displayName: request.user ? request.user.displayName : ""
            })
            */
        }
    });
}

module.exports.postGalaxyEdit = (request,response,next) =>{
    let id = request.params.id;

    let updatedGalaxyObject = galaxyModel({
        "_id":id,
        "Name": request.body.Name,
        "Designation": request.body.Designation,
        "Type": request.body.Type,
        "Diameter": request.body.Diameter,
        "DistanceFromEarth": request.body.DistanceFromEarth,
        "Mass": request.body.Mass,
        "Constellation": request.body.Constellation,
        "Discovered": request.body.Discovered,
        "Stars": request.body.Stars
    });

    galaxyModel.update({
        _id:id
        },updatedGalaxyObject, (error) =>{
            if(error){
                console.log(error);
                response.end(error);
            }else{
                //! Remove after testing.
                //response.redirect('../ObjectList');
            }
        });
}


module.exports.getGalaxyDelete = (request,response,next) =>{
    let id = request.params.id;

    galaxyModel.remove({_id:id},(error) =>{

    if(error){
        console.log(error);
    }else{
        //! Remove after testing.
        //response.redirect('../ObjectList');
    }
    });
}