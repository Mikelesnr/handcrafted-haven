const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get(
  "/",
  /* #swagger.tags = ['Payments']
     #swagger.summary = 'Get all payments'
     #swagger.description = 'Retrieve all payment records with related order information'
     #swagger.responses[200] = {
         description: 'Payments retrieved successfully',
         schema: [{ $ref: '#/components/schemas/Payment' }]
     }
     #swagger.responses[500] = {
         description: 'Internal server error'
     }
  */
  paymentController.getAllPayments
);

router.post(
  "/",
  /* #swagger.tags = ['Payments']
     #swagger.summary = 'Create new payment'
     #swagger.description = 'Creates a payment linked to an order. `paidAt` is auto-generated server-side.'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Details of the payment transaction',
        required: true,
        schema: {
          orderId: 1,
          method: "card",
          status: "COMPLETED",
          transactionId: "TXN00123"
        }
     }
     #swagger.responses[201] = {
         description: 'Payment created',
         schema: { $ref: '#/components/schemas/Payment' }
     }
     #swagger.responses[400] = {
         description: 'Invalid input or missing fields'
     }
     #swagger.responses[500] = {
         description: 'Server error during payment creation'
     }
  */
  paymentController.createPayment
);

router.put(
  "/:id/status",
  /* #swagger.tags = ['Payments']
     #swagger.summary = 'Update payment status'
     #swagger.description = 'Updates the status of a payment. Acceptable values: PENDING, COMPLETED, FAILED, REFUNDED.'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'Payment ID',
         required: true,
         type: 'integer'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated status to apply to this payment',
        required: true,
        schema: {
          status: "REFUNDED"
        }
     }
     #swagger.responses[200] = {
         description: 'Status updated successfully',
         schema: { $ref: '#/components/schemas/Payment' }
     }
     #swagger.responses[400] = {
         description: 'Invalid status or update failed'
     }
     #swagger.responses[404] = {
         description: 'Payment not found'
     }
     #swagger.responses[500] = {
         description: 'Server error during update'
     }
  */
  paymentController.updatePaymentStatus
);

router.delete(
  "/:id",
  /* #swagger.tags = ['Payments']
     #swagger.summary = 'Delete payment'
     #swagger.description = 'Deletes a payment record by ID'
     #swagger.parameters['id'] = {
         in: 'path',
         description: 'Payment ID to delete',
         required: true,
         type: 'integer'
     }
     #swagger.responses[200] = {
         description: 'Payment deleted',
         schema: {
           message: 'Payment deleted'
         }
     }
     #swagger.responses[404] = {
         description: 'Payment not found'
     }
     #swagger.responses[500] = {
         description: 'Server error during deletion'
     }
  */
  paymentController.deletePayment
);

module.exports = router;
