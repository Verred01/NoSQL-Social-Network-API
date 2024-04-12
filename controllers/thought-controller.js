const {User, Thought} = require('../models');
// uses the controller methods to get, create, update, and delete thoughts
module.exports = { 
    async getThoughtWithID({ params },res) {
        try {
            const thought = await Thought.findOne({ _id: params.id });
            if (!thought) {
                res.status(404).json({ message: 'Thought was not found.' });
                return;
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getEveryThought(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async createThought({ body }, res) {
        try {
            const thought = await Thought.create(body);
            const updatedUser = await User.findOneAndUpdate({_id:body.userId},{$push:{thoughts:thought._id}},{new:true});
            res.json({thought, updatedUser});
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    async updateThought({ params, body }, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $set: body },
                { new: true, runValidators: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'Thought was not found.' });
                return;
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async deleteThought({ params }, res) {
        console.log(params.thoughtId);
        try {
            const thought = await Thought.findOneAndDelete({ _id: params.thoughtId});
            if (!thought) {
                res.status(404).json({ message: 'Thought was not found.' });
                return;
            }
            const userData=await User.findOneAndUpdate(
                {thoughts:params.thoughtId},
                {$pull:{thoughts:params.thoughtId}},
                {new:true}
            );
            if (!userData) {
                res.status(404).json({ message: 'Failed to remove thought.' });
                return;
            }
            res.json({thought,userData});
        } catch (error) {
            res.status(500).json(error);
        }
    },
// use the controller methods to add and remove reactions to a thought
    async addReaction({params, body}, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $addToSet: { reactions: body } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'Thought was not found.' });
                return;
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async deleteReaction({params, body}, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions:{reactionId: params.reactionId} } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'Thought was not found.' });
                return;
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};