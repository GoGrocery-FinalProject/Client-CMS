import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import { editProduct } from '../store/action/ProductAction'
import { fetchTransaction, postReport } from '../store/action/ReportAction'

function CreateReport() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const transaction = useSelector(state => state.transactions)

  useEffect(() => {
    dispatch(fetchTransaction())
  }, [dispatch])


  let ArrayReport = []
  products.forEach(el => {
    ArrayReport.push({
      ProductId: el.id,
      stockRecorded: el.stock,
      stockReal: el.stock,
      price: el.price
    })
  })
  const [report, setReport] = useState(ArrayReport)

  function handleRealStockChange(index, value) {
    let dupeReport = [...report]
    let before = dupeReport[index]
    dupeReport[index] = {...before, stockReal: +value}
    setReport(dupeReport)
  }

  function handleUpdateProduct(index, product){
    let payload = {
      name: product.name,
      price: product.price,
      barcode: product.barcode_number,
      image_url: product.image_url,
      description: product.description,
      stock: report[index].stockReal,
      stockBefore: report[index].stockReal
    }
    dispatch(editProduct(product.id, payload))
  }

  function getDailyIncome(transaction) {
    let income = 0
    transaction.forEach(el => {
      income += el.totalPrice
    })
    return income
  }

  function getDailyLosses(products){
    let losses = 0
    products.forEach(el => {
      losses += (el.stockRecorded - el.stockReal) * el.price
    })
    return losses
  }

  function handleCreateReport(products, transactions, income, loss) {
    const payload = {
      products: JSON.stringify(products),
      transactions: JSON.stringify(transactions),
      income: income,
      loss: loss
    }
    dispatch(postReport(payload))
  }

  return (
    <div style={{ display: "flex"}}>
    <Navbar/>
    <div className="row card container" style={{width: "85vw", marginTop: "5vh"}}>
      <h2 className="card-header">Create Daily Product Report</h2>
      <div className="card col-12 table-wrapper-scroll-y table-responsive my-custom-scrollbar" style={{height: "75vh"}}>
        <table className="table table-hover table-nowrap" >
          <thead className="thead-light">
            <tr>
              <th className="col-1">Id</th>
              <th className="col-2">Name</th>
              <th className="col-2">Img Preview</th>
              <th className="col-2">Barcode Number</th>
              <th className="col-1">Current Stock</th>
              <th className="col-1">Recorded Stock</th>
              <th className="col-2">Real Stock</th>
              <th className="col-1">Action</th>
            </tr>
          </thead>
          {
            products.map((el, i) => {
              return (
                <tbody key={el.id}>
                <tr>
                  <td className="text-heading font-semibold">{ el.id }</td>
                  <td className="text-heading font-semibold">{ el.name }</td>
                  <td><img alt="product-img" src={ el.image_url } width="100px"></img></td>
                  <td className="text-heading font-semibold">{ el.barcode_number }</td>
                  <td className="form-label justify-content-center">{ el.stock }</td>
                  <td className="text-heading font-semibold">{ report[i].stockRecorded}</td>
                  <td>
                    <input 
                      type="number" 
                      className="form form-control "
                      value={ report[i].stockReal }
                      onChange={(e) => handleRealStockChange(i, e.target.value)}
                      style={{width: "100%"}}
                    >
                    </input>
                  </td>
                  <td><button 
                  className="btn btn-outline-dark"
                  onClick={(e) => {
                    e.preventDefault()
                    handleUpdateProduct(i, el)
                  }}>Update stock</button></td>
                </tr>
                </tbody>
              )
            })
          }
        </table>
      </div>
        <button
          className="btn btn-dark"
          onClick={(e)=>{
            e.preventDefault()
            handleCreateReport(report, transaction, getDailyIncome(transaction), getDailyLosses(report))
          }}
        >GENERATE REPORT</button>
      {/* {JSON.stringify(report, null, 2)}"OUTPUT PRODUCT"<br></br>
      {JSON.stringify(transaction, null, 2)}"OUTPUT TRANSACTION"<br></br>
      {JSON.stringify(getDailyIncome(transaction))}"OUTPUT TOTAL INCOME"<br></br>
      {JSON.stringify(getDailyLosses(report))}"OUTPUT TOTAL LOSSES" */}
    </div>
    </div>
  )
}

export default CreateReport
