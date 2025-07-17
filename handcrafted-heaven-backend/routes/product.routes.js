const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get(
  "/",
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Get all products'
     #swagger.description = 'Retrieve all products with seller and review information'
     #swagger.responses[200] = {
         description: 'Products retrieved successfully',
         schema: [{ $ref: '#/components/schemas/Product' }]
     }
     #swagger.responses[500] = {
         description: 'Internal server error'
     }
  */
  productController.getAllProducts
);

router.post(
  "/",
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Create new product'
     #swagger.description = 'Adds a new product listing to the marketplace'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Details of the product to create',
        required: true,
        schema: {
          title: "Rustic Clay Bowl",
          description: "Handcrafted with local clay",
          price: 45.0,
          imageUrl: "https://example.com/images/bowl.png",
          category: "Ceramics",
          sellerId: 1
        }
     }
     #swagger.responses[201] = {
         description: 'Product created',
         schema: { $ref: '#/components/schemas/Product' }
     }
     #swagger.responses[400] = {
         description: 'Missing or invalid product data'
     }
     #swagger.responses[500] = {
         description: 'Server error during creation'
     }
  */
  productController.createProduct
);

router.put(
  "/:id",
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Update product'
     #swagger.description = 'Updates product details such as description, image, or category'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'Product ID',
         required: true,
         type: 'integer'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Fields to update',
        required: true,
        schema: {
          title: "Updated Clay Bowl",
          description: "Now with gloss finish",
          price: 49.0,
          imageUrl: "https://example.com/images/bowl-glossy.png",
          category: "Ceramics"
        }
     }
     #swagger.responses[200] = {
         description: 'Product updated successfully',
         schema: { $ref: '#/components/schemas/Product' }
     }
     #swagger.responses[400] = {
         description: 'Invalid update payload'
     }
     #swagger.responses[404] = {
         description: 'Product not found'
     }
     #swagger.responses[500] = {
         description: 'Server error during update'
     }
  */
  productController.updateProduct
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Delete product'
     #swagger.description = 'Removes a product by ID'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'Product ID to delete',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Product deleted successfully',
         schema: {
           message: "Product deleted"
         }
     }
     #swagger.responses[404] = {
         description: 'Product not found'
     }
     #swagger.responses[500] = {
         description: 'Server error during deletion'
     }
  */
  productController.deleteProduct
);

module.exports = router;
