const { Router } = require("express");
const mercadopago= require("mercadopago");

const mercadoPagoRouter = Router();



// Configure MercadoPago
mercadopago.configure({
  access_token:
    "TEST-5560570626097728-072022-b846d996aec1526cb840190799711653-307905530",
});

mercadoPagoRouter.post("/create_preference", (req, res) => {
  let getItems = req.body.items;
  let user = req.body.user;



  
  let preference = {
    items: getItems,
    payer: {
      "name": user.id,
    },

    // Back URLs will redirect the user after the payment process.
    back_urls: {
      success: "http://localhost:3000/account/orders",
      failure: "http://localhost:3000/account/orders?message=mpFail",
      pending: "http://localhost:3000/account/orders?message=mpPending",
    },
    auto_return: "approved",
    binary_mode: true
  };


  mercadopago.preferences
    .create(preference)
    .then((response) => {
      res.json({
        id: response.body.id,
      });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the preference." });
    });
});

module.exports = mercadoPagoRouter;