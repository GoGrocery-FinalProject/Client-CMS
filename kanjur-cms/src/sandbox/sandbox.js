//route.post("/payment-notification-handler", MidtransController.NotificationHandler)

class MidtransController {
  static NotificationHandler(req, res) {
    let order_id = req.body.order_id;
    let transactionStatus = req.body.transaction_status;

    if (transactionStatus == 'settlement'){
      Transaction.findOne({ where: { order_id: order_id } })
        .then((data) => {
          if(data){
            let products = JSON.parse(data.products)
            products.forEach(el => {
              let newStock
              products.findOne({ where: { id: el.ProductId }})
                .then((data) => {
                  newStock = data.stock - el.quantity
                  Product.update({ stock: newStock }, {
                    where: {
                      id: +data.id
                    }
                  })
                })
            })
            Transaction.update({ status: "paid"}, { where: { order_id: order_id }})
              .then(() => {
                res.status(200).JSON({ ok: 'OK' })
              })
          } else {
            res.status(404).JSON({ status: "notfound", message: "try again 2 times"})
          }
        })
        .catch((err) => {
          next(err)
        })
    }
  }
}