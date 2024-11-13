const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const projectController = require("../controllers/projectController");
const clientController = require("../controllers/clientController");

// User routes
router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);

// Project routes
router.post("/projects", projectController.createProject);
router.get("/projects", projectController.getAllProjects);
router.get("/projects/:id", projectController.getProjectById);

// Client routes
router.post("/clients", clientController.createClient);
router.get("/clients", clientController.getAllClients);
router.get("/clients/:id", clientController.getClientById);

module.exports = router;
