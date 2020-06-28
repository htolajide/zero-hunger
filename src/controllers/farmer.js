import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import configuration from '../config/config.json';
import sendEmail from '../config/emailer';
const Farmer =  require('../models/farmer');
const FarmerStock = require('../models/farmerStock');
const Sales = require('../models/sales');

export default{
  signup: async (req, res) => {
    const fullname = req.body.fullname, email = req.body.email, password = 
    req.body.password, city = req.body.city;
    const farmer = new Farmer({
        fullname: fullname,
        email: email,
        password: await bcrypt.hash(password, 10),
        city: city,
        created_at: new Date(),
        updated_at: new Date()
    });
    Farmer.findOne({email: email}).then( (result) => {
        if (result){
             return res.status(403).json({status: 'Request Failed', message: "Email already exists"})
        }
        farmer.save().then( (userData) => {
            const token = jwt.sign({ userId: userData._id }, process.env.SECRET ? process.env.SECRET : configuration.secret);
            res.cookie('farmerid', userData._id, { expires: new Date(Date.now() + 7200000), httpOnly: true });
            res.cookie('token', token, { expires: new Date(Date.now() + 7200000), httpOnly: true });
            res.status(201).json({
                status: 'Success',
                message: 'account successfully created',
                cookieUserid: res.cookie.farmerid,
                token: token,
                userData
            })
                sendEmail(userData.email);
        })
        .catch((error) => {
                    res.status(400).json({
                        status: 'Failed',
                        message: error.message
                    });
        });
    })
  },
  getAll: (req, res, ) => {
	Farmer.find().then(
		(farmers) => {
			res.status(200).json(farmers);
		}
	).catch( (error) => {
		res.status(400).json({
			error: error.message
		});
	});
  },
  login: (req, res) => {
    const email = req.body.email, password = req.body.password;
	Farmer.findOne({email}).then(
        async (farmer) => {
            if (!farmer)
            return res.status(404).json({status: 'Request failed', message: 'Email is not recognized'});
            const match = await bcrypt.compare(password, farmer.password);
            if (!match) {
                return res.status(401).send({ 
                    status: "Request failed",
                    message: 'Login failed, check your password'
                });
            }
        // sign jwt and wrap in a cookie
        const token = jwt.sign({ userId: farmer._id }, process.env.SECRET ? process.env.SECRET : configuration.secret);
        res.cookie('farmerid', farmer._id, { expires: new Date(Date.now() + 7200000), httpOnly: true });
        res.cookie('token', token, { expires: new Date(Date.now() + 7200000), httpOnly: true });
        return res.status(200).json({
          status: 'Success',
          token: token, 
          farmer_id: farmer._id,
          fullname: farmer.fullname,
          email: farmer.email,
          city: farmer.city
        });
      })
      .catch(
		(error) => {
            res.status(400).json({
            error: error.message
        });
	});
  },
  resetPassword: (req, res) => {
	const email = req.body.email, password = req.body.password;
	Farmer.findOne({email: email}).then(
		async (result) => {
            if (!result) 
            return res.status(400).json({status: 'Failed', message: "Email not recognized"});
            Farmer.updateOne({email: email}, {password: await bcrypt.hash(password, 10)}).then( 
                () => {
                    res.status(201).json({
                        message: "Password successfully reset!"
                    });
                }
            )}       
    ).catch(
		(error) => {
			res.status(400).json({
				error: error.message
			});
		}
    );
  },
  editFarmer: async (req, res) => {
    const fullname = req.body.fullname, email = req.body.email, password = 
    req.body.password, city = req.body.city;
    const farmer = new Farmer({
        _id: req.cookies.farmerid,
        fullname: fullname,
        email: email,
        password: await bcrypt.hash(password, 10),
        city: city,
        updated_at: new Date()
    });
    
    Farmer.updateOne({_id: req.cookies.farmerid}, farmer).then( () => {
        res.status(201).json({
            status: 'Success',
            message: 'account successfully updated',
        })
    })
    .catch((error) => {
        res.status(400).json({
            error: error.message
        });
    }); 
  },
 deleteOne: (req, res) => {
	Farmer.deleteOne({_id: req.params.id}).then(
		() => {
			res.status(200).json({
				message: "Farmer deleted successfully!"
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
	Farmer.deleteMany().then(
		() => {
			res.status(200).json({
				message: "Farmers deleted successfully!"
			});
        })
        .catch((error) => {
			res.status(400).json({
				error: error.message
			});
		}
	);
  },
  addProduct: (req, res) => {
    const name = req.body.name, unit = req.body.unit, quantity =
    req.body.quantity, price = req.body.price, farmer = req.body.farmer, location = req.body.location;
    const farmerid = req.cookies.farmerid;
    const stock = new FarmerStock({
        farmer_id: req.cookies.farmerid,
        product_name: name,
        unit: unit,
        quantity: quantity,
        price: price,
        farmer: farmer,
        location: location
    })
    FarmerStock.findOne({product_name: name, farmer_id: farmerid }).then(
        result => {
            if (result) return res.status(403).json({ status: 'failed', message:'product is in stock'});
            stock.save().then( 
                res.status(201).json({
                    status: 'success',
                    message: 'Product successfully added'
                })
            )
            .catch(error => res.status(400).json({
                status: 'failed', message: error.message})
            )
        }
    )
    .catch(error => res.status(400).json({
        status: 'Failed', message: error.message})
    )
  },
  getProducts: (req, res) => {
      FarmerStock.find({farmer_id: req.cookies.farmerid}).then(
          stock => {
              res.status(200).json({stock})
          }
      )
      .catch(error => res.status(400).json({
          status:'failed', message: error.message
        })
      )
  },
  deleteOneProduct: (req, res) => {
    FarmerStock.deleteOne({farmer_id: req.params.farmerid, product_name: req.params.productName}).then(
        res.status(200).json({status: 'success', message: 'product delete from stock'})
    )
    .catch(error => res.status(400).json({
        status:'failed', message: error.message
      })
    )
},
  showProducts: (req, res) => {
    FarmerStock.find({location: req.params.location}).then(
        products => {
            if (!products) return res.status(400).json({status: 'Failed', message: 'Products not found'})
                res.status(200).json({products})
            }
        )
        .catch(error => res.status(400).json({status: 'Failed', message: error.message}))
  },
  editProduct: (req, res) => {
    const name = req.body.name, unit = req.body.unit, quantity = 
    parseInt(req.body.quantity), price = req.body.price, farmerid = 
    req.cookies.farmerid, farmer = req.body.farmer, location = req.body.location;
    // get old quantity
    FarmerStock.findOne({_id: req.params.id}).then(
        response => {
            let new_quantity = quantity + response.quantity;
            const stock = new FarmerStock({
                _id : req.params.id,
                farmer_id: farmerid,
                product_name: name,
                unit: unit,
                quantity: new_quantity,
                price: price,
                farmer: farmer,
                location: location,
                updated_at: new Date()
            });
            FarmerStock.updateOne({ _id: req.params.id}, stock).then( () => {
                console.log(new_quantity);
                res.status(201).json({
                    status: 'success',
                    message: 'Product successfully edited'
                });
            })
            .catch(error => res.status(400).json({
                status: 'failed', message: error.message})
            )
        }
    )
    .catch(error => res.status(400).json({
        status:'failed', message: error.message
      })
    )
  },
  getSales: (req, res) => {
    Sales.find({ farmer_id: req.cookies.farmerid }).then(
        stock => {
            res.status(200).json({stock})
        }
    )
    .catch(error => res.status(400).json({
        status:'failed', message: error.message
      })
    )
  },
  getAllSales: (req, res) => {
    Sales.find().then(
        stock => {
            res.status(200).json({stock})
        }
    )
    .catch(error => res.status(400).json({
        status:'failed', message: error.message
      })
    )
  },
  getStock: (req, res) => {
    FarmerStock.find().then(
        stock => {
            res.status(200).json({stock})
        }
    )
    .catch(error => res.status(400).json({
        status:'failed', message: error.message
      })
    )
  },
  getSellers: (req, res) => {
    FarmerStock.find({product_name: req.params.product, location: req.params.location}).then(
        result => {
            res.status(200).json({status: 'success', result: result});
          }
      )
      .catch(error => res.status(400).json({status: 'Failed', message: error.message }));
  },
  deleteStock: (req, res) => {
    FarmerStock.deleteMany().then(
        result => {
            res.status(200).json({status: 'success', message: 'Stock sucessfuly deleted'});
          }
      )
      .catch(error => res.status(400).json({status: 'Failed', message: error.message }));
  }
}