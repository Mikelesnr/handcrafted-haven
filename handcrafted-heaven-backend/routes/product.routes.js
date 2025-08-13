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

router.get(
  "/categories",
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Get all product categories'
     #swagger.description = 'Retrieve all categories used to classify products. This route is public and does not require authentication.'
     #swagger.responses[200] = {
         description: 'Categories retrieved successfully',
         schema: {
           categories: [
             {
               id: 1,
               name: "Electronics"
             }
           ]
         }
     }
     #swagger.responses[500] = {
         description: 'Internal server error'
     }
  */
  productController.getCategories
);

//home products route
router.get(
  "/home",
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Get products for the homepage'
     #swagger.description = 'Returns a random selection of 9 products for the homepage.'
     #swagger.responses[200] = {
       description: 'Random products for the homepage retrieved successfully',
       schema: [{ $ref: '#/components/schemas/Product' }]
     }
     #swagger.responses[500] = {
       description: 'Internal server error'
     }
  */
  productController.getHomeProducts
);

// routes/productRoutes.ts
router.get(
  "/filter",
  /* #swagger.tags = ['Products']
     #swagger.summary = 'Get filtered products by category'
     #swagger.description = 'Returns paginated products filtered by category name'
     #swagger.parameters['category'] = {
       in: 'query',
       description: 'Category name to filter by',
       required: false,
       type: 'string'
     }
     #swagger.responses[200] = {
       description: 'Filtered products retrieved successfully',
       schema: {
         data: [{ $ref: '#/components/schemas/Product' }],
         page: 1,
         totalPages: 5,
         totalItems: 44
       }
     }
     #swagger.responses[500] = {
       description: 'Internal server error'
     }
  */
  productController.getFilteredProducts
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
          tiscription: "Handcrafted with local clay",
          prtle: "Rustic Clay Bowl",
          deice: 45.0,
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
