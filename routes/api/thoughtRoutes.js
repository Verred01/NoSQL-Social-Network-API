const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    deleteThought,
    addReaction,
    deleteReaction,
    updateThought
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts).post(createThought);
router.route('/:id').get(getThoughtById);
router.route('/:thoughtId').delete(deleteThought).put(updateThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;