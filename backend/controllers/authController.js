import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Request Body:', { name, email, password });

    try {
        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Return success response
        res.status(201).json({ token, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user', details:error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        if (!user.password) {
            return res.status(400).json({
                error: 'Account created with social login. Please use social authentication.'
            });
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        const refreshToken = jwt.sign({userId: user.id}, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '7d'
        })

        // Return success response
        res.status(200).json({ token: refreshToken });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
};

const refreshTokenHandler = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({error: 'refresh token required'});
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newToken = jwt.sign({userId: decoded.userId}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        return res.status(200).json({token, newToken})
    } catch {
        return res.status(401).json({error: 'Invalid refresh token'})
    }
};

export { registerUser, loginUser, refreshTokenHandler };