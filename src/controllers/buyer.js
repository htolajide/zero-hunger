import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import configuration from '../config/config.json';
import sendEmail from '../config/emailer';
import location from './location';
const Buyer =  require('../models/buyer');
const Sales = require('../models/sales');
const Order = require('../models/order');
const FarmerStock = require('../models/farmerStock');

export default{
  signup: (req, res) => {
    const fullname = req.body.fullname, email = req.body.email, password =
    req.body.password;
    axios.get(location.url)
        .then( async result => { 
            const buyer = new Buyer({
                fullname: fullname,
                email: email,
                password: await bcrypt.hash(password, 10),
                city: result.data.city,
                created_at: new Date(),
                updated_at: new Date()
            });
            Buyer.findOne({email: email}).then( (result) => {
                if (result){
                    return res.status(403).json({status: 'Request Failed', message: "Email already exists"})
                }
                buyer.save().then( (userData) => {
                    const token = jwt.sign({ userId: userData._id }, process.env.SECRET ? process.env.SECRET : configuration.secret);
                    res.cookie('buyerid', userData._id, { expires: new Date(Date.now() + 7200000), httpOnly: true });
                    res.cookie('token', token, { expires: new Date(Date.now() + 7200000), httpOnly: true });
                    res.status(201).json({
                        status: 'Success',
                        message: 'account successfully created',
                        cookieUserid: res.cookie.buyerid,
                        token: token,
                        userData
                    })
                    sendEmail(userData.email);
                })
                .catch((error) => {
                    res.status(400).json({status:'Failed', message: error.message})
                });
            })
        })
        .catch(error => res.status(400).json({status:'Failed', message: error.message}));
  },
  getAll: (req, res, ) => {
	Buyer.find().then(
		(buyers) => {
			res.status(200).json(buyers);
		}
	).catch( (error) => {
		res.status(400).json({
			error: error.message
		});
	});
  },
  login: (req, res) => {
    const email = req.body.email, password  = req.body.password;
	Buyer.findOne({email}).then(
        async (buyer) => {
            if (!buyer)
            return res.status(404).json({status: 'Request failed', message: 'Email is not recognized'});
            const match = await bcrypt.compare(password, buyer.password);
            if (!match) {
          return res.status(401).send({ 
                    status: "Request failed",
                    message: 'Login failed, check your password'
                });
            }
        // sign jwt and wrap in a cookie
        const token = jwt.sign({ userId: buyer._id }, process.env.SECRET ? process.env.SECRET : configuration.secret);
        res.cookie('buyerid', buyer._id, { expires: new Date(Date.now() + 7200000), httpOnly: true });
        res.cookie('token', token, { expires: new Date(Date.now() + 7200000), httpOnly: true });
        return res.status(200).json({
          token: token, 
          buyer_id: buyer._id
        });
      })
      .catch(
		(error) => {
            res.status(400).json({status:'Failed', message: error.message})
	});
  },
  resetPassword: (req, res) => {
	const email = req.body.email, password =  req.body.password;
	Buyer.findOne({email: email}).then(
		async (result) => {
            if (!result) 
            return res.status(400).json({status: 'Failed', message: "Email not recognized"});
            Buyer.updateOne({email: email}, {password: await bcrypt.hash(password, 10)}).then( 
                () => {
                    res.status(201).json({
                        message: "Password successfully reset!"
                    });
                }
            )}       
    ).catch(
		(error) => {
			res.status(400).json({status:'Failed', message: error.message})
        }
    );
  },
  editBuyer: async (req, res) => {
    const fullname = req.body.fullname, email = req.body.email, password = 
    req.body;
    axios.get(location.url)
    .then(async result => {
        const buyer = new Buyer({
            _id: req.cookies.buyerid,
            fullname: fullname,
            email: email,
            password: await bcrypt.hash(password, 10),
            city: result.data.city,
            updated_at: new Date()
        });
    
        Buyer.updateOne({_id: req.cookies.buyerid}, buyer).then( () => {
            res.status(201).json({
                status: 'Success',
                message: 'account successfully updated',
            })
        })
        .catch((error) => {
            res.status(400).json({status:'Failed', message: error.message}) 
        });
    })
    .catch(error => res.status(400).json({status:'Failed', message: error.message}))  
  },
 deleteOne: (req, res) => {
	Buyer.deleteOne({_id: req.params.id}).then(
		() => {
			res.status(200).json({
				message: "Buyer deleted successfully!"
			});
        })
        .catch((error) => {
			res.status(400).json({
				error: error.message
			});
		}
	);
  },
  deleteAll: (req, res) => {
	Buyer.deleteMany().then(
		() => {
			res.status(200).json({
				message: "Buyers deleted successfully!"
			});
        })
        .catch((error) => {
			res.status(400).json({
				error: error.message
			});
		}
	);
  },
  buyProduct: (req, res) => {
    const product_name = req.body.product_name, unit = req.body.unit, quantity = 
    req.body.quantity, price = req.body.price, farmerid = req.body.farmerid,
    buyer = req.body.buyer, phone = req.body.phone, address = 
    req.body.address, farmer_email = req.body.farmer_email;
    const sales = new Sales({
        farmer_id: farmerid,
        buyer_name: buyer,
        buyer_phone: phone,
        product_name: product_name,
        unit: unit,
        quantity: quantity,
        price: price
    });
    const order = new Order({
        buyer_name: buyer,
        phone: phone,
        address: address,
        product_name: product_name,
        quantity: quantity,
        price: price,
        unit: unit
    })
    FarmerStock.findOne({product_name: product_name, farmer_id: farmerid}).then(
        result => {
            if (result.quantity < quantity) return res.status(400).json({ status: 'failed', message:'quantity not sufficient'});
            const updatedQuantity = result.quantity - quantity;
            FarmerStock.updateOne({product_name: product_name, farmer_id: farmerid}, {quantity: updatedQuantity}).then( () => {
                sales.save().then(
                    order.save().then(data => {
                        sendEmail(farmer_email, `${buyer} with phone number ${phone} and address ${address} just order for ${quantity} 
                        ${unit} of ${product_name} from yor store on Food Farm`);
                        res.status(201).json({
                            status: 'success',
                            data
                     });
                    })
                )
                .catch( error => res.status(400).json({
                    status: 'failed',
                    message: error.message
                }))
            })
            .catch(error => res.status(400).json({
                status: 'failed', message: error.message})
            )
        }
    )
    .catch(error => res.status(400).json({
        status: 'Failed', message: error.message})
    )
  },
  getSales: (req, res) => {
      Sales.find({ token: req.cookies.token }).then(
          stock => {
              res.status(200).json({stock})
          }
      )
      .catch(error => res.status(400).json({
          status:'failed', message: error.message
        })
      )
  },
  getAllOrders: (req, res) => {
    Order.find().then(
        order => {
            res.status(200).json({order})
        }
    )
    .catch(error => res.status(400).json({
        status:'failed', message: error.message
      })
    )
  },
}