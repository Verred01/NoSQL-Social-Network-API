const router = require('express').Router();
// uses the user-controller.js file in the controllers directory
const {
    getEveryUser,
    getUserWithID,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

router.route('/').get(getEveryUser).post(createUser);
router.route('/:id').get(getUserWithID).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;