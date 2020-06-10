const Product =  require('../models/product');
import helper from '../utilities/helper';

export default{
    addProduct: (req, res) => {
        const name = req.body.name;
        const capName = helper.capitalizeWord(name.toLowerCase());
        const product = new Product({ name: capName});
        Product.findOne({name: capName}).then( result => {
            if (result) return res.status(400).json({
                status: 'Failed',
                message: 'Product already exists'
            })
            product.save().then(
                () => res.status(201).json({
                    status: 'success',
                    message: 'Product succesfully added'
                })  
            )
            .catch(error => res.status(400).json({
                status: 'Failed',
                message: error.message
            }))
        })
        .catch( error => res.status(400).json({
            status: 'Failed',
            message: error.message
        }))
    },
    getProduct: (reg, res) =>{
        Product.find().then(
            data => {
            res.status(200).json(
                data
            )
        })
        .catch(error => res.status(400).json({status: 'failed', message: error.message}))
    }
}