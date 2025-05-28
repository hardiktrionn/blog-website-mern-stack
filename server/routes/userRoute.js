const express = require('express');

const router = express.Router();
const {getAllUsers,deleteUser}=require("../controller/userController")


// Admin routes for user management
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;