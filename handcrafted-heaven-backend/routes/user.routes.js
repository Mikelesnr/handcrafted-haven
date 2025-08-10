const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../utilities/middleware");

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

router.get(
  "/me",
  protect,
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get authenticated user'
     #swagger.description = 'Returns the profile of the currently authenticated user'
     #swagger.responses[200] = {
         description: 'Authenticated user profile',
         schema: { $ref: '#/components/schemas/User' }
     }
     #swagger.responses[401] = {
         description: 'Unauthorized'
     }
     #swagger.responses[404] = {
         description: 'User not found'
     }
     #swagger.responses[500] = {
         description: 'Server error while fetching profile'
     }
  */
  userController.getAuthenticatedUser
);

router.put(
  "/:id",
  protect,
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
  protect,
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
