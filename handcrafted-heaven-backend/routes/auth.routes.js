const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post(
  "/login",
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Login existing user'
     #swagger.description = 'Authenticates a user using email and password'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Login credentials',
        required: true,
        schema: {
          email: 'jane.doe@example.com',
          password: 'SecurePass1!'
        }
     }
     #swagger.responses[200] = {
        description: 'Login successful',
        schema: { user: { $ref: '#/components/schemas/User' } }
     }
     #swagger.responses[401] = {
        description: 'Invalid email or password'
     }
     #swagger.responses[500] = {
        description: 'Internal server error'
     }
  */
  authController.login
);

router.post(
  "/register",
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Register new user'
     #swagger.description = 'Creates a new user account and sends verification email'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'User registration data',
        required: true,
        schema: {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          password: 'SecurePass1!',
          confirmPassword: 'SecurePass1!',
          role: 'CUSTOMER'
        }
     }
     #swagger.responses[201] = {
        description: 'User registered and verification email sent',
        schema: { user: { $ref: '#/components/schemas/User' } }
     }
     #swagger.responses[400] = {
        description: 'Validation error or duplicate email'
     }
     #swagger.responses[500] = {
        description: 'Internal server error'
     }
  */
  authController.register
);

router.get(
  "/verify/:token",
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Verify email'
     #swagger.description = 'Marks user email as verified using token from email'
     #swagger.parameters['token'] = {
        in: 'path',
        description: 'Verification token',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
        description: 'Email verified'
     }
     #swagger.responses[404] = {
        description: 'Token not found or expired'
     }
     #swagger.responses[500] = {
        description: 'Server error during verification'
     }
  */
  authController.verifyEmail
);

router.post(
  "/resend-verification",
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Resend verification email'
     #swagger.description = 'Regenerates token and re-sends verification link to user email'
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Email of user requesting verification again',
        required: true,
        schema: {
          email: 'jane.doe@example.com'
        }
     }
     #swagger.responses[200] = {
        description: 'Verification email resent'
     }
     #swagger.responses[404] = {
        description: 'User not found'
     }
     #swagger.responses[400] = {
        description: 'Email already verified'
     }
     #swagger.responses[500] = {
        description: 'Server error during resend'
     }
  */
  authController.resendVerificationEmail
);

module.exports = router;
