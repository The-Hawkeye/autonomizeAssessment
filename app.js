const express = require("express");
const routes = require("./routes/router")

const app = express();

app.use(express.json());


app.use("/users", routes);

app.use((req, res) => {

    res.status(404).json({message:"Not Found or incorrect endpoint"})
})

module.exports = app