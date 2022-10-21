import express, { Router } from 'express'
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const productRouter = express.Router();



productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);

    //for product 
productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({slug:req.params.slug});
    if(product) {
        res.send(product)
    } else {
        res.status(404).send({message: 'Produit non trouvé'});
    }
    
   
});

});
//Creation de produits
productRouter.post(
    '/AddProduct',
    //isAuth,
    //isAdmin,
    expressAsyncHandler(async (req, res) => {
      const newProduct = new Product({
        name: req.body.name,
        slug:req.body.slug ,
        desc: req.body.desc,
        image:req.body.image,
        image1:req.body.image1,
        image2:req.body.image2,
        image3:req.body.image3,
        countInStock: req.body.compterEnStock,
        price: req.body.prix,
        category: req.body.categorie,
      });
      const product = await newProduct.save();
      res.send({ message: 'Produit Crée', product });
    })
  );

export default productRouter;