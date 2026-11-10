import express from 'express';
import { getInviteBySlug, createOrUpdateInvite, getAllInvites } from '../controllers/inviteController.js';

const router = express.Router();

router.get('/', getAllInvites); 
router.post('/', createOrUpdateInvite);
router.get('/:slug', getInviteBySlug);

export default router;