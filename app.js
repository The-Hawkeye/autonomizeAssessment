const express = require("express");
const routes = require("./router")

const app = express();

app.use(express.json());


app.use("/users", routes);

// app.use((req, res, next) => {
//     next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
// });

module.exports = app