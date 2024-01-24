
const axios = require("axios");
const User = require("../model/userModel")




const getFriends = async(followers_url, following_url)=>{


    const updatedFollowingUrl = following_url.split("{")[0];

    const followers = await axios.get(followers_url);
    const following = await axios.get(updatedFollowingUrl);


    const followersLogins = followers.data.map(follower => follower.login);
    const followingLogins = following.data.map(follow => follow.login);


    const finalData = followersLogins.filter(el=> followingLogins.includes(el));


    return finalData;

}





exports.getUserByUsername = async(req,res)=>{
    const {username} = req.params;


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


        const {followers_url, following_url} = ans.data;

        friends = await getFriends(followers_url,following_url);

        data = await User.create({...ans.data, isDeleted:false,friends:friends});

        res.status(200).json(data);

    }

}


exports.searchByUsernameAndLocation = async(req,res)=>{
    try{

        const {username, location} = req.query;

        const data  = await User.find({ location: { $regex: new RegExp(location, 'i') },});

        if(!data)
        {
            res.json({message:"No Data Found In THE DB"})
        }
        else
        {
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

    const data  = await User.findOneAndUpdate({login:username},{isDeleted:true},{new:true});


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
        console.log(req.body)
        let ans  = await User.findOne({login:username});//find will return An array not an object so use findOne only
        console.log(ans.isDeleted,"is del");

        if(ans.isDeleted)
        {
            res.json({message:"Data is already deleted"})
        }
        else{
        const data  = await User.findOneAndUpdate({login:username},req.body,{new:true});
        if(!data)
        {
            res.json({message:"Failed updataing the data"});
        }else
            res.json({Message:"Data updated successfully",UpdatedData:data})
        }

    }catch(e){
        res.send("Error in updating user details "+e);
    }
}

exports.sortData = async(req,res)=>{


    const queryObj = req.query.sort;
    queryStr = queryObj.split(",").join(" ");

    const data  = await User.find({isDeleted:false}).sort(queryStr)

    res.json({message:"Sorted",sortedData:data});



}

