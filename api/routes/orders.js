const express = require('express')
const router = express.Router();


// Handling incoming endPoints requests
router.get('/', (req,res,next)=>{
    res.status(200).json({
        message:'Handling GET request to /Order'
    })
})
router.post('/', (req,res,next)=>{
    const order ={
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message:'Order was created',
        order:order
    })
})


router.get('/:orderId', (req,res,next)=>{
    res.status(200).json({
        message:'Order details',
        orderId: req.params.orderId
    })
})


router.delete('/:orderId', (req,res,next)=>{
    res.status(200).json({
        message:'Order deleted!',        
    })
})

module.exports = router;