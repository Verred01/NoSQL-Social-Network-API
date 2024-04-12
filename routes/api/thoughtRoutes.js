const router = require('express').Router();
// uses the thought-controller.js file in the controllers directory
const {
    getEveryThought,
    getThoughtWithID,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router.route('/').get(getEveryThought).post(createThought);
router.route('/:id').get(getThoughtWithID);
router.route('/:thoughtId').delete(deleteThought).put(updateThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;