import prisma from '../lib/prisma.js';

//Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Error fetching products" });
    }
};

//Create a new product
export const createProduct = async (req, res) => {
    const { name } = req.body;

    try {
        const newProduct = await prisma.product.create({
            data: { name }
        });
        res.json(newProduct);
    } catch (err) {
        res.status(500).json({ error: "Error creating product" });
    }
}