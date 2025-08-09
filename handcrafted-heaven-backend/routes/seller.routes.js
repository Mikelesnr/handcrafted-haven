const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");
const { protect, isSeller } = require("../utilities/middleware");

router.get(
  "/",
  /* #swagger.tags = ['Sellers']
     #swagger.summary = 'Get all sellers'
     #swagger.description = 'Fetch all seller profiles along with their linked user and listed products'
     #swagger.responses[200] = {
         description: 'Sellers retrieved successfully',
         schema: [{ $ref: '#/components/schemas/Seller' }]
     }
     #swagger.responses[500] = {
         description: 'Internal server error'
     }
  */
  sellerController.getAllSellers
);

router.get(
  "/me",
  protect,
  /* #swagger.tags = ['Sellers']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.summary = 'Get authenticated seller profile'
     #swagger.description = 'Returns the seller profile linked to the authenticated user. Requires a valid Bearer token.'

     #swagger.responses[200] = {
        description: 'Seller profile retrieved successfully',
        schema: { $ref: '#/components/schemas/Seller' }
     }
     #swagger.responses[401] = {
        description: 'Not authenticated'
     }
     #swagger.responses[403] = {
        description: 'Invalid or expired token'
     }
     #swagger.responses[404] = {
        description: 'Seller not found'
     }
     #swagger.responses[500] = {
        description: 'Internal server error'
     }
  */
  sellerController.getAuthenticatedSeller
);

router.get(
  "/:id",
  /* #swagger.tags = ['Sellers']
     #swagger.summary = 'Get seller by ID'
     #swagger.description = 'Retrieve seller details including user and products'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'Seller ID',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Seller retrieved successfully',
         schema: { $ref: '#/components/schemas/Seller' }
     }
     #swagger.responses[404] = {
         description: 'Seller not found'
     }
     #swagger.responses[500] = {
         description: 'Internal server error'
     }
  */
  sellerController.getSellerById
);

router.post(
  "/",
  protect,
  isSeller,
  /* #swagger.tags = ['Sellers']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.summary = 'Create seller profile'
     #swagger.description = 'Creates a new seller profile linked to the authenticated user'
     #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          bio: "Passionate woodworker with 10 years of experience",
          imageUrl: "https://example.com/images/avatar.jpg"
        }
     }
     #swagger.responses[201] = {
        description: 'Seller profile created',
        schema: { $ref: '#/components/schemas/Seller' }
     }
     #swagger.responses[400] = {
        description: 'Validation error or creation failure'
     }
     #swagger.responses[500] = {
        description: 'Internal server error'
     }
  */
  sellerController.createSeller
);

router.put(
  "/:id",
  protect,
  isSeller,
  /* #swagger.tags = ['Sellers']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.summary = 'Update seller profile'
     #swagger.description = 'Modify seller bio or profile image'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'Seller ID to update',
         required: true,
         type: 'integer'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Fields to update in seller profile',
        required: true,
        schema: {
          bio: "Updated artisan bio text",
          imageUrl: "https://example.com/images/new-avatar.jpg"
        }
     }
     #swagger.responses[200] = {
         description: 'Seller updated successfully',
         schema: { $ref: '#/components/schemas/Seller' }
     }
     #swagger.responses[400] = {
         description: 'Invalid input or update error'
     }
     #swagger.responses[404] = {
         description: 'Seller not found'
     }
     #swagger.responses[500] = {
         description: 'Internal server error'
     }
  */
  sellerController.updateSeller
);

router.delete(
  "/:id",
  protect,
  isSeller,
  /* #swagger.tags = ['Sellers']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.summary = 'Delete seller'
     #swagger.description = 'Remove a seller record from the system'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'Seller ID to delete',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Seller deleted',
         schema: {
           message: "Seller deleted"
         }
     }
     #swagger.responses[404] = {
         description: 'Seller not found'
     }
     #swagger.responses[500] = {
         description: 'Internal server error'
     }
  */
  sellerController.deleteSeller
);

module.exports = router;
