const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");

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

router.put(
  "/:id",
  /* #swagger.tags = ['Sellers']
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
  /* #swagger.tags = ['Sellers']
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
