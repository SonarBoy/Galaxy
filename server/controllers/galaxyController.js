let galaxyModel = require('../model/Galaxy');

module.exports.getGalaxyList = (request,response,next) => {
    galaxyModel.find((error,galaxyList) =>{

        if(error){
            return console.log(error);
        }else{
            response.json({success:true,msg:"Galaxy Found",galaxyList: galaxyList});
        }
    })
}

module.exports.getGalaxyAdd = (request,response,next) => {
    /*
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
            //! PLEASE DEFINE ALL ENDPOINT RESPONSES BEFORE TESTING
            response.json({success:true,msg:"Successfully added Galaxy!"})
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
           response.json({success:true,msg:"Galaxy Found",galaxy:galaxyModelReturn});
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
                response.json({success:true,msg:"Successfully editited Galaxy!"})
            }
        });
}

module.exports.getGalaxyDelete = (request,response,next) =>{
    let id = request.params.id;

    galaxyModel.remove({_id:id},(error) =>{
        if(error){
            console.log(error);
        }else{
            response.json({success:true,msg:"Successfully deleted Galaxy!"})
        }
    });
}