const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, isAdmin } = require("../utilities/middleware");

router.get(
  "/users",
  protect,
  isAdmin,
  /* #swagger.tags = ['Admin']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.summary = 'Get all users'
     #swagger.description = 'Fetch all users with pagination and related data (seller, orders, reviews, images)'
     #swagger.parameters['page'] = {
         in: 'query',
         description: 'Page number for pagination',
         required: false,
         type: 'integer'
     }
     #swagger.parameters['limit'] = {
         in: 'query',
         description: 'Number of users per page',
         required: false,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Users retrieved successfully',
         schema: {
           data: [{ $ref: '#/components/schemas/User' }],
           page: 1,
           totalPages: 5,
           totalItems: 100
         }
     }
     #swagger.responses[401] = { description: 'Not authenticated' }
     #swagger.responses[403] = { description: 'Access denied: Admins only' }
     #swagger.responses[500] = { description: 'Internal server error' }
  */
  adminController.getAllUsers
);

router.get(
  "/users/:id",
  protect,
  isAdmin,
  /* #swagger.tags = ['Admin']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.summary = 'Get user by ID'
     #swagger.description = 'Retrieve a user and their related data by ID'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'User ID',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'User retrieved successfully',
         schema: { $ref: '#/components/schemas/User' }
     }
     #swagger.responses[404] = { description: 'User not found' }
     #swagger.responses[401] = { description: 'Not authenticated' }
     #swagger.responses[403] = { description: 'Access denied: Admins only' }
     #swagger.responses[500] = { description: 'Internal server error' }
  */
  adminController.getUserById
);

router.put(
  "/users/:id",
  protect,
  isAdmin,
  /* #swagger.tags = ['Admin']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.summary = 'Update user'
     #swagger.description = 'Modify user role or email verification status'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'User ID to update',
         required: true,
         type: 'integer'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          role: "SELLER",
          isEmailVerified: true
        }
     }
     #swagger.responses[200] = {
         description: 'User updated successfully',
         schema: { $ref: '#/components/schemas/User' }
     }
     #swagger.responses[400] = { description: 'Invalid input or update error' }
     #swagger.responses[404] = { description: 'User not found' }
     #swagger.responses[401] = { description: 'Not authenticated' }
     #swagger.responses[403] = { description: 'Access denied: Admins only' }
     #swagger.responses[500] = { description: 'Internal server error' }
  */
  adminController.updateUser
);

router.delete(
  "/users/:id",
  protect,
  isAdmin,
  /* #swagger.tags = ['Admin']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.summary = 'Delete user'
     #swagger.description = 'Remove a user record from the system'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'User ID to delete',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'User deleted',
         schema: {
           message: "User deleted"
         }
     }
     #swagger.responses[404] = { description: 'User not found' }
     #swagger.responses[401] = { description: 'Not authenticated' }
     #swagger.responses[403] = { description: 'Access denied: Admins only' }
     #swagger.responses[500] = { description: 'Internal server error' }
  */
  adminController.deleteUser
);

router.get(
  "/stats/users",
  protect,
  isAdmin,
  /* #swagger.tags = ['Admin']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.summary = 'Get user statistics'
     #swagger.description = 'Returns total number of users, sellers, and customers'
     #swagger.responses[200] = {
         description: 'User stats retrieved successfully',
         schema: {
           totalUsers: 100,
           totalSellers: 30,
           totalCustomers: 70
         }
     }
     #swagger.responses[401] = { description: 'Not authenticated' }
     #swagger.responses[403] = { description: 'Access denied: Admins only' }
     #swagger.responses[500] = { description: 'Internal server error' }
  */
  adminController.getUserStats
);

module.exports = router;
