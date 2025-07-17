const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post(
  "/",
  /* #swagger.tags = ['Orders']
     #swagger.summary = 'Create a new order'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Order details including buyer and items',
        required: true,
        schema: {
          buyerId: 3,
          items: [
            {
              productId: 1,
              quantity: 2,
              price: 29.99
            }
          ]
        }
     }
     #swagger.responses[201] = {
         description: 'Order created successfully',
         schema: { $ref: '#/components/schemas/Order' }
     }
     #swagger.responses[400] = {
         description: 'Invalid input or creation error'
     }
     #swagger.responses[500] = {
         description: 'Internal server error'
     }
  */
  orderController.createOrder
);

router.get(
  "/",
  /* #swagger.tags = ['Orders']
     #swagger.summary = 'Get all orders'
     #swagger.description = 'Retrieve all orders including buyer, items, and payment info'
     #swagger.responses[200] = {
         description: 'Successfully fetched all orders',
         schema: [{ $ref: '#/components/schemas/Order' }]
     }
     #swagger.responses[500] = {
         description: 'Internal server error'
     }
  */
  orderController.getAllOrders
);

router.get(
  "/:id",
  /* #swagger.tags = ['Orders']
     #swagger.summary = 'Get single order'
     #swagger.description = 'Fetch one order by ID including related buyer, items, and payment'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'Order ID',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Order found',
         schema: { $ref: '#/components/schemas/Order' }
     }
     #swagger.responses[404] = {
         description: 'Order not found'
     }
     #swagger.responses[500] = {
         description: 'Internal server error'
     }
  */
  orderController.getOrderById
);

router.put(
  "/:id/status",
  /* #swagger.tags = ['Orders']
     #swagger.summary = 'Update order status'
     #swagger.description = 'Updates only the status of an order by its ID. Accepts values like CONFIRMED, SHIPPED, DELIVERED.'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'Order ID',
         required: true,
         type: 'integer'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'New status to set',
        required: true,
        schema: {
          status: 'DELIVERED'
        }
     }
     #swagger.responses[200] = {
         description: 'Status updated',
         schema: { $ref: '#/components/schemas/Order' }
     }
     #swagger.responses[400] = {
         description: 'Invalid status value'
     }
     #swagger.responses[404] = {
         description: 'Order not found'
     }
     #swagger.responses[500] = {
         description: 'Internal server error'
     }
  */
  orderController.updateOrderStatus
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Orders']
     #swagger.summary = 'Delete order'
     #swagger.description = 'Deletes an order by its ID'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'Order ID to delete',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Order deleted successfully',
         schema: {
           message: 'Order deleted successfully'
         }
     }
     #swagger.responses[404] = {
         description: 'Order not found'
     }
     #swagger.responses[500] = {
         description: 'Internal server error'
     }
  */
  orderController.deleteOrder
);

module.exports = router;
