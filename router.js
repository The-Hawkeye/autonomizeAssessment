const express = require("express");
const userController = require("./controllers/userController")
const router = express.Router();


router.get("/search",userController.sortData);
router.get("/:username", userController.getUserByUsername);
router.get("/", userController.searchByUsernameAndLocation);

router.delete("/:username",userController.softDelete)
router.patch("/:username",userController.updateData)

module.exports = router;