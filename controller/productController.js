const Product = require('../models/product')
// To get all the Products from the database
const allProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        if (products.length < 1) {
            res.status(200).json({
                msg: "No product found"
            })
            return
        }
        if (products) {
            res.status(200).json({
                data: products
            })
        }
    } catch (err) {
        res.status(404).json({
            msg: 'There was an error in finding the products'
        })
    }
}

// Creating a new product in our Database
const newProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            data: { product }
        })
    } catch (err) {
        res.status(400).json({
            data: { msg: 'There was an error in creating the products' }
        })
    }
}

// Delete a single product from our database
const deleteProduct = async (req, res) => {
    try {
        const {
            id: productID
        } = req.params
        const product = await Product.findOneAndDelete({
            _id: productID
        })
        if (!product) {
            return
        }
        res.status(200).send({
            data: {
                msg: 'Product Deleted'
            }
        })
    } catch (err) {
        res.status(400).json({
            data: {
                msg: err
            }
        })
    }
}

// Update the product quantity in the database
const updateProductQty = async (req, res) => {
    try {

        // Destructuring the ProductID and number query
        const { id: productID } = req.params
        const { number } = req.query

        if (!number) {
            res.status(400).json({
                data: {
                    msg: 'Error while Updating Quantity'
                }
            })
            return
        }
        const product = await Product.findOne({
            _id: productID
        })
        // Adding the new number from the query params and the previous number of product
        let newQuantity = product.quantity + (+number)

        if (newQuantity > 0) {
            // updating the data in the database
            const updatedProduct = await Product.findOneAndUpdate({
                _id: productID
            }, {
                quantity: newQuantity
            }, {
                new: true,
                runValidators: true
            })
            res.status(200).json({
                data: {
                    updatedProduct,
                    msg: 'Successfully Updated'
                }
            })
        } else {
            res.status(400).json({
                data: {
                    msg: "Product Quantity can not be zero or less"
                }
            })
            return
        }
    } catch (err) {
        res.status(400).json({
            data: {
                msg: 'Error while updating Quantity'
            }
        })
    }
}

module.exports = { allProducts, newProduct, deleteProduct, updateProductQty }