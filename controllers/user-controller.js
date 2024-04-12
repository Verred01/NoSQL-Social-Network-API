const { User, Thought } = require('../models');
// uses the controller methods to get, create, update, and delete users
module.exports = {
    async getEveryUser(req, res) {
        try {
            const users = await User.find({}).populate('thoughts').populate('friends');
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async getUserWithID({ params }, res) {
        try {
            const user = await User.findOne({ _id: params.id }).populate('thoughts').populate('friends');
            if (!user) {
                res.status(404).json({ message: 'User was not found.' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async createUser({ body }, res) {
        try {
            const user = await User.create(body);
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async updateUser({ params, body }, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: params.id },
                {$set: body },
                { new: true, runValidators: true }
            );
            if (!user) {
                res.status(404).json({ message: 'User was not found.' });
                return;
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },

    async deleteUser({ params }, res) {
        try {
            const user = await User.findOneAndDelete({ _id: params.id });
            if (!user) {
                res.status(404).json({ message: 'User was not found.' });
                return;
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts }});
            res.json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
// uses the controller methods to add and remove friends
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            res.json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await
                User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $pull: { friends: req.params.friendId } },
                    { new: true }
                );
            res.json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
};