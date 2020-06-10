const Unit =  require('../models/unit');
import helper from '../utilities/helper'

export default{
    addUnit: (req, res) => {
        const name = req.body.name;
        const capName = helper.capitalizeWord(name.toLowerCase());
        const unit = new Unit({ name: capName});
        Unit.findOne({name: capName}).then( result => {
            if (result) return res.status(400).json({
                status: 'Failed',
                message: 'Unit already exists'
            })
            unit.save().then(
                () => res.status(201).json({
                    status: 'success',
                    message: 'Unit succesfully added'
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
    getUnit: (reg, res) =>{
        Unit.find().then(
            data => {
            res.status(200).json(
                data
            )
        })
        .catch(error => res.status(400).json({status: 'failed', message: error.message}))
    }
}