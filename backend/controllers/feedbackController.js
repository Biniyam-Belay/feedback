import prisma from '../lib/prisma.js';

//Get all feedbacks
export const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await prisma.feedback.findMany();
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ error: "Error fetching feedbacks" });
    }
};

//Create a new feedback
export const createFeedback = async (req, res) => {
    const { content, rating, userId, productId } = req.body;

    try {
        const feedback = await prisma.feedback.create({
            data: {
                content, rating, userId, productId,
            }
        });
        res.json(feedback);
    } catch (err) {
        res.status(500).json({ error: "Error creating feedback" });
    }
}

//Update feedback status
export const updateFeedbackStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedFeedback = await prisma.feedback.update({
            where: { id: parseInt(id) },
            data: { status },
        });
        res.json(updatedFeedback);
    } catch (err) {
        res.status(500).json({ error: "Error updating feedback status" });
    }
}