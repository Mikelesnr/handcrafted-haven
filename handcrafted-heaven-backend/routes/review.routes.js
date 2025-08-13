const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { protect, isCustomer } = require("../utilities/middleware");

router.post(
  "/",
  protect,
  isCustomer,
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Create review'
     #swagger.description = 'Create a new review for a product by a user'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Review content and associated product/user',
        required: true,
        schema: {
          rating: 5,
          comment: "Absolutely stunning craftsmanship!",
          productId: 1,
          userId: 3
        }
     }
     #swagger.responses[201] = {
         description: 'Review created successfully',
         schema: { $ref: '#/components/schemas/Review' }
     }
     #swagger.responses[400] = {
         description: 'Missing or invalid fields'
     }
     #swagger.responses[500] = {
         description: 'Server error during review creation'
     }
  */
  reviewController.createReview
);

router.put(
  "/:id",
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Update review'
     #swagger.description = 'Update an existing product review'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'Review ID to update',
         required: true,
         type: 'integer'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated rating or comment',
        required: true,
        schema: {
          rating: 4,
          comment: "Still great, but packaging could improve."
        }
     }
     #swagger.responses[200] = {
         description: 'Review updated successfully',
         schema: { $ref: '#/components/schemas/Review' }
     }
     #swagger.responses[400] = {
         description: 'Invalid input'
     }
     #swagger.responses[404] = {
         description: 'Review not found'
     }
     #swagger.responses[500] = {
         description: 'Server error while updating review'
     }
  */
  reviewController.updateReview
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Delete review'
     #swagger.description = 'Delete a review by its ID'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'Review ID to delete',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Review deleted successfully',
         schema: {
           message: "Review deleted"
         }
     }
     #swagger.responses[404] = {
         description: 'Review not found'
     }
     #swagger.responses[500] = {
         description: 'Server error while deleting review'
     }
  */
  reviewController.deleteReview
);

module.exports = router;
