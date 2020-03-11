let planetModel = require('../model/Planet');


module.exports.getPlanetList = (request,response,next) =>
{
    planetModel.find((error,planetList) => {

        if(error){
            //https://developer.mozilla.org/en-US/docs/Web/API/Console/error
            return console.error(error);
        } else {

            
            //! Put in for testing.
            /*
            response.render('planets/index', {
                title: 'Planet List',
                planetList: planetList
            });
            */

            response.json({success:true,msg:"Planets Found",planetList: planetList});

        }
    });
}


module.exports.addPlanetGet = (request,response,next) =>
{
    //! Put in for testing.
    /*
    response.render('planets/add', {
        title: 'Add New Celestial Object'
    });
    */
}

module.exports.addPlanetPost = (request,response,next) => 
{
    let newObject = planetModel({
        "Name": request.body.Name,
        "Description":request.body.Description
    });

    planetModel.create(newObject,(error,planetModel) => 
    {
        if(error){
            response.json({success:false,msg:"Failed to create planet."});
            console.log(error);
        } else {
            //! Put in for testing
            //response.redirect('/Planets');
        }
    });
}


module.exports.editPlanetGet = (request, response, next) => {
    let id = request.params.id;

    planetModel.findById(id, (error, planetObject) => {

        if (error) {
            console.log(error);
            response.end(error);
        } else {
            response.render('planets/edit', {
                title: 'Edit Object',
                planet: planetObject
            });
        }
    });
}

module.exports.editPlanetPost = (request,response,next) => 
{
    let id = request.params.id;

    let updatedPlanet = planetModel({
        "_id": id,
        "Name": request.body.Name,
        "Description":request.body.Description
    });

    planetModel.update({_id:id},updatedPlanet,(error) => 
    {
        if(error){
            response.json({success:false,msg:"Failed to create planet."});
            console.log(error);
        } else {
            //! Put in for testing
            //response.redirect('/Planets');
        }
    });
}

module.exports.deletePlanet = (request,response,next) =>
{
    let id = request.params.id;

    planetModel.remove({ _id:id}, (error) =>
    {
        if(error){
            response.json({success:false,msg:"Failed to create planet."});
            console.log(error);
        } else {
            //! Put in for testing
            //response.redirect('/Planets');
        }
    });
}

