import farmer from '../controllers/farmer';
import buyer from '../controllers/buyer';
import authenticator from '../middlewares/authenticator'
import validator from '../middlewares/validator';
import location from '../controllers/location';
import product from '../controllers/product';
import unit from '../controllers/unit';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Zero Humger API!',
  }));

  app.post('/api/v1/farmer/signup', validator.auth, farmer.signup); // API route for farmer to signup
  app.post('/api/v1/farmer/login', validator.auth, farmer.login); // API route for farmer to login
  app.patch('/api/v1/farmer/reset/password', validator.auth, farmer.resetPassword); // API route for farmer reset password
  app.get('/api/v1/farmers', farmer.getAll); // Api route for listing farmers
  app.get('/api/v1/show/products', farmer.showProducts); // api for advertising product
  app.delete('/api/v1/farmer/:id/delete', farmer.deleteOne); // API route for deleting all farmers
  app.delete('/api/v1/farmer/all/delete', farmer.deleteAll); // API route for deleting a famer
  app.post('/api/v1/farmer/product/add', authenticator, farmer.addProduct)
  app.put('/api/v1/farmer/profile/edit', validator.auth, authenticator, farmer.editFarmer) //Api route for edit profile
  app.get('/api/v1/farmer/products', authenticator, farmer.getProducts);
  app.get('/api/v1/farmer/sales', authenticator, farmer.getSales)
  app.patch('/api/v1/farmer/product/:id/edit', authenticator, farmer.editProduct);
  app.post('/api/v1/buyer/signup', validator.auth, buyer.signup); // API route for buyer to signup
  app.post('/api/v1/buyer/login', validator.auth, buyer.login); // API route for buyer to login
  app.patch('/api/v1/buyer/reset/password', validator.auth, buyer.resetPassword); // API route for buyer reset password
  app.get('/api/v1/buyers', buyer.getAll); // Api route for listing buyer
  app.delete('/api/v1/buyer/:id/delete', buyer.deleteOne); // API route for deleting all buyers
  app.delete('/api/v1/buyer/all/delete', buyer.deleteAll); // API route for deleting a buyer
  app.put('/api/v1/buyer/profile/edit', validator.auth, authenticator, buyer.editBuyer) //Api route for edit buyer profile
  app.get('/api/v1/user/location', location.getLocation); 
  app.get('/api/v1/buyer/products', authenticator, buyer.getSales);
  app.post('/api/v1/buyer/product/buy', authenticator, buyer.buyProduct);
  app.post('/api/v1/product/add', product.addProduct);
  app.post('/api/v1/unit/add', unit.addUnit);
  app.get('/api/v1/products/', product.getProduct);
  app.get('/api/v1/units/', unit.getUnit);
  app.get('/api/v1/:city/:product/sellers', farmer.getSellers)
};