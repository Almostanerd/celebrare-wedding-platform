import express from 'express';
import rateLimit from 'express-rate-limit';
import { submitRsvp, getRsvpStats } from '../controllers/rsvpController.js';

const router = express.Router();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 25,
  message: { success: false, message: 'Too many requests. Please wait a few moments.' }
});

router.post('/:slug/rsvp', limiter, submitRsvp);
router.get('/:slug/rsvp-stats', getRsvpStats);

export default router;