import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import configuration from '../config/config.json';
import sendEmail from '../config/emailer';
import location from './location';
const Farmer =  require('../models/farmer');
const FarmerStock = require('../models/farmerStock');
const Sales = require('../models/sales');

export default{
  signup: (req, res) => {
    const fullname = req.body.fullname, email = req.body.email, password = 
    req.body.password;
    axios.get(location.url)
        .then( async result => { 
            const farmer = new Farmer({
                fullname: fullname,
                email: email,
                password: await bcrypt.hash(password, 10),
                city: result.data.city,
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
        })
        .catch(error => res.status(400).json({
            status: 'Failed', 
            message: error.message
        }));
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
          token: token, 
          farmer_id: farmer._id
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
    req.body.password;
    axios.get(location.url)
    .then(async result => {
        const farmer = new Farmer({
            _id: req.cookies.farmerid,
            fullname: fullname,
            email: email,
            password: await bcrypt.hash(password, 10),
            city: result.data.city,
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
    })
    .catch(error => res.status(400).json({status:'Failed', message: error.message})) 
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
    req.body.quantity, price = req.body.price;
    const farmerid = req.cookies.farmerid;
    axios.get(location.url).then(
        result => {
            const stock = new FarmerStock({
                farmer_id: req.cookies.farmerid,
                product_name: name,
                unit: unit,
                quantity: quantity,
                price: price,
                location: result.data.city
            })
            FarmerStock.findOne({product_name: name, farmer_id: farmerid }).then(
                result => {
                    if (result) return res.status(403).json({ status: 'failed', message:'product is in stock'});
                    stock.save().then( data => {
                        res.status(201).json({
                            status: 'success',
                            data
                        });
                    })
                    .catch(error => res.status(400).json({
                        status: 'failed', message: error.message})
                    )
                }
            )
            .catch(error => res.status(400).json({
                status: 'Failed', message: error.message})
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
  showProducts: (req, res) => {
      axios.get(location.url).then(
          result => {
            FarmerStock.find({location: result.data.city }).then(
                products => {
                    if (!products) return res.status(400).json({status: 'Failed', message: 'Products not found'})
                    res.status(200).json({products})
                }
            )
            .catch(error => res.status(400).json({status: 'Failed', message: error.message}))
          }
      )
      .catch(error => res.status(400).json({status: 'Failed', message: error.message}))
  },
  editProduct: (req, res) => {
    const name = req.body.name, unit = req.body.unit, quantity = 
    req.body.quantity, price = req.body.price;
    const farmerid = req.cookies.farmerid;
    axios.get(location.url).then(
        result => {
            const stock = new FarmerStock({
                _id : req.params.id,
                farmer_id: farmerid,
                product_name: name,
                unit: unit,
                quantity: quantity,
                price: price,
                location: result.data.city,
                updated_at: new Date()
            })
            FarmerStock.updateOne({ _id: req.params.id, farmer_id: farmerid }, stock).then( () => {
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
        status: 'failed', message: error.message})
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
  getSellers: (req, res) => {
    const ids = []; // store farmer ids
    const farmers = []; // store farmers
    const output = []; // store output
    // get all farmers
      Farmer.find({city: req.params.city}).then(
          farmer => {
              farmer.map( item => {
                  farmers.push({
                      farmerid: item._id,
                      name: item.fullname, 
                      email: item.email, 
                      city: item.city 
                    })
              })
          }
      ).catch(error => res.status(400).json({error: error.message}))
      // get stock information
      FarmerStock.find({product_name: req.params.product, location: req.params.city}).then(
          result => {
              result.map( item => {
                  ids.push({ 
                      farmerid: item.farmer_id, 
                      product_name: item.product_name, 
                      price: item.price, 
                      quantity: item.quantity ,
                      unit: item.unit,
                    });
              })

            // loop through fetched seller/farmer and return name and stock info
            ids.forEach( id => {
                let result = farmers.filter( farmer => {
                    farmer.price = id.price;
                    farmer.product_name = id.product_name;
                    farmer.quantity = `${id.quantity} ${id.unit}`
                    if (farmer.farmerid == id.farmerid ) return farmer
                })
                output.push(result[0]);
            })
              res.status(200).json({status: 'success', result: output});
          }
      )
      .catch(error => res.status(400).json({status: 'Failed', message: error.message }))
  }

}