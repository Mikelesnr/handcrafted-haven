const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get(
  "/",
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get all users'
     #swagger.description = 'Retrieve all users with associated reviews, orders, and seller profiles'
     #swagger.responses[200] = {
         description: 'Users retrieved successfully',
         schema: [{ $ref: '#/components/schemas/User' }]
     }
     #swagger.responses[500] = {
         description: 'Internal server error while fetching users'
     }
  */
  userController.getAllUsers
);

router.post(
  "/",
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Create new user'
     #swagger.description = 'Create a new user account with hashed password'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'User registration fields',
        required: true,
        schema: {
          name: "Jane Doe",
          email: "jane@example.com",
          password: "SecurePass1!",
          role: "CUSTOMER"
        }
     }
     #swagger.responses[201] = {
         description: 'User created successfully',
         schema: { $ref: '#/components/schemas/User' }
     }
     #swagger.responses[400] = {
         description: 'Invalid input or creation error'
     }
     #swagger.responses[500] = {
         description: 'Server error while creating user'
     }
  */
  userController.createUser
);

router.put(
  "/:id",
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Update user'
     #swagger.description = 'Update user details like name, email, role, or verification status'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'User ID to update',
         required: true,
         type: 'integer'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Fields to update in user record',
        required: true,
        schema: {
          name: "Jane Doe",
          email: "jane@example.com",
          role: "SELLER",
          isEmailVerified: true
        }
     }
     #swagger.responses[200] = {
         description: 'User updated successfully',
         schema: { $ref: '#/components/schemas/User' }
     }
     #swagger.responses[400] = {
         description: 'Invalid input'
     }
     #swagger.responses[404] = {
         description: 'User not found'
     }
     #swagger.responses[500] = {
         description: 'Server error during update'
     }
  */
  userController.updateUser
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Delete user'
     #swagger.description = 'Delete a user by their ID'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'User ID to delete',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'User deleted',
         schema: {
           message: "User deleted successfully"
         }
     }
     #swagger.responses[404] = {
         description: 'User not found'
     }
     #swagger.responses[500] = {
         description: 'Server error during deletion'
     }
  */
  userController.deleteUser
);

module.exports = router;
