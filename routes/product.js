const express = require('express')
const router = express.Router()

const { allProducts, newProduct, deleteProduct, updateProductQty } = require('../controller/productController')

router.route('/').get(allProducts)
router.route('/create').post(newProduct)
router.route('/:id/update_quantity').post(updateProductQty)
router.route('/:id').delete(deleteProduct)

module.exports = router