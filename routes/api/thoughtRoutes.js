const router = require('express').Router();
// Import all of the API routes from /api/index.js
const {getAllThoughts, getThoughtById, createThought, deleteThought, addReaction, deleteReaction, updateThought}= require('../../controllers/thought-controller');
router.route('/').get(getAllThoughts).post(createThought);
router.route('/:id').get(getThoughtById);
router.route('/:thoughtId').delete(deleteThought).put(updateThought);
router.route('/:thoughtId/reactions').put(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = router;