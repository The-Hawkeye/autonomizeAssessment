
const axios = require("axios");
const User = require("../model/userModel")




const getFriends = async(followers_url, following_url)=>{



    // const {followers_url, following_url}
    // console.log(followers_url,following_url,"URLS")

    const updatedFollowingUrl = following_url.split("{")[0];
    // console.log(updatedFollowingUrl,"updated url")

    const followers = await axios.get(followers_url);
    const following = await axios.get(updatedFollowingUrl);


    // console.log(followers.data,following.data,"BOth Data");

    const followersLogins = followers.data.map(follower => follower.login);
    const followingLogins = following.data.map(follow => follow.login);

    // console.log(followersLogins,"fls");
    // console.log(followingLogins,"ffls");

    // const commonLogins = await User.find({ login: { $in: [...followersLogins, ...followingLogins] } });

    const finalData = followersLogins.filter(el=> followingLogins.includes(el));
    // console.log(finalData,"Final Data");

    return finalData;

}





exports.getUserByUsername = async(req,res)=>{
    const {username} = req.params;

    // console.log(username)

    let data = await User.findOne({login:username});

    if(data)
    {
        if(data.isDeleted)
        res.json({message:"Data is deleted"})
        else
        res.status(200).json(data);
    }
    else
    {
        const ans  = await axios.get(`https://api.github.com/users/${username}`)

        // console.log(ans.data,"data from api")

        const {followers_url, following_url} = ans.data;

        friends = await getFriends(followers_url,following_url);

        data = await User.create({...ans.data, isDeleted:false,friends:friends});

        res.status(200).json(data);

    }
    
    // else
    //     res.status(200).json(data);


   

    // console.log(data)

    


}


exports.searchByUsernameAndLocation = async(req,res)=>{
    try{

        const {username, location} = req.query;

        // console.log(username,location ,"sdhjfklasf")

        const data  = await User.find({ location: { $regex: new RegExp(location, 'i') },});

        if(!data)
        {
            res.json({message:"No Data Found In THE DB"})
        }
        else
        {
            // console.log(data,"data from mongo")
            res.json(data)
        }

    }catch(e){
        res.json({
            Status:"Failed",
            message:"Failed to Search Data"
        })
    }
}

exports.softDelete = async(req,res)=>{
    try{
    const {username} = req.params;
    // console.log(username)

    const data  = await User.findOneAndUpdate({login:username},{isDeleted:true},{new:true});


    // console.log(data);

    res.json({status:"Success",message:"Document deleted succesfully"})

    }
    catch(e)
    {
        res.json({message:"Error deleting the data",Error:e})
    }


}


exports.updateData = async(req,res)=>{
    try{

        const {username} = req.params;
        // console.log(username);
        console.log(req.body)
        let ans  = await User.findOne({login:username});//find will return An array not an object so use findOne only
        // console.log(ans,"ans");
        console.log(ans.isDeleted,"is del");

        if(ans.isDeleted)
        {
            // console.log("it is deleted")
            res.json({message:"Data is already deleted"})
        }
        else{
        const data  = await User.findOneAndUpdate({login:username},req.body,{new:true});
        // console.log(data,"data")
        if(!data)
        {
            res.json({message:"Failed updataing the data"});
        }else
            res.json({Message:"Data updated successfully",UpdatedData:data})
        // console.log(first)

        }

    }catch(e){
        res.send("Error in updating user details "+e);
    }
}

exports.sortData = async(req,res)=>{


    const queryObj = req.query.sort;
    // console.log(queryObj);

    // let queryStr = JSON.stringify(queryObj)
    queryStr = queryObj.split(",").join(" ");

    const data  = await User.find({isDeleted:false}).sort(queryStr)

    // console.log(data,"sorted data");

    res.json({message:"Sorted",sortedData:data});



}

