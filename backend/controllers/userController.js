import prisma from '../lib/prisma.js';

//Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Error fetching users" });
    }
};

//Create a new user
export const createUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = await prisma.user.create({
            data: { name, email },
        });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Error creating user" });
    }
}