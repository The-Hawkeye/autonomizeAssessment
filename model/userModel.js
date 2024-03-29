const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique:true
  },
  id: {
    type:Number,
    required:true,
    unique:true
  },
  node_id: String,
  avatar_url: String,
  gravatar_id: String,
  url: String,
  html_url: String,
  followers_url: String,
  following_url: String,
  gists_url: String,
  starred_url: String,
  subscriptions_url: String,
  organizations_url: String,
  repos_url: String,
  events_url: String,
  received_events_url: String,
  type: String,
  site_admin: Boolean,
  name: String,
  company: String,
  blog: String,
  location: String,
  email:{
    type : String,
    required:true,
    unique:true
  },
  hireable: Boolean,
  bio: String,
  twitter_username: String,
  public_repos: Number,
  public_gists: Number,
  followers: Number,
  following: Number,
  created_at: Date,
  updated_at: Date,
  isDeleted:{
    type : Boolean ,
    default:false
  },
  friends:[String]
});

// Create the Mongoose model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
