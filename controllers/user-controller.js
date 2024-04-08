const { User, Thought } = require('../models');
// Get all users try/catch
module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find({}).populate('thoughts').populate('friends');
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // get user by id try/catch
    async getUserById({ params }, res) {
        try {
            const user = await User.findOne({ _id: params.id }).populate('thoughts').populate('friends');
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // Create user try/catch
    async createUser({ body }, res) {
        try {
            const user = await User.create(body);
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // add friend try/catch
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
    // remove friend try/catch
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
    // update user try/catch
    async updateUser({ params, body }, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: params.id },
                {$set: body },
                { new: true, runValidators: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    // Delete user try/catch
    async deleteUser({ params }, res) {
        try {
            const user = await User.findOneAndDelete({ _id: params.id });
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts }});
            res.json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
};