const {User, Thought} = require('../models');
// Get all thoughts try/catch
module.exports = { 
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // get thought by id try/catch
    async getThoughtById({ params },res) {
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
    // Create thought try/catch
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
    // Delete thought try/catch
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
    // add reaction try/catch
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
    // Delete reaction try/catch
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
    // Update thought try/catch
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
    }
};