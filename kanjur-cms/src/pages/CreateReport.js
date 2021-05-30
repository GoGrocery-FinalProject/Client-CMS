import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import { editProduct } from '../store/action/ProductAction'
import { fetchTransaction } from '../store/action/ReportAction'

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
    console.log(products, transactions, income, loss)
  }

  return (
    <div style={{ display: "flex"}}>
    <Navbar/>
    <div className="row container-fluid" style={{width: "85vw", marginTop: "5vh"}}>
      <div className="col-12 table-wrapper-scroll-y my-custom-scrollbar">
      <h2>Create Daily Product Report</h2>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th className="col-1">Id</th>
              <th className="col-2">Name</th>
              <th className="col-2">Img Preview</th>
              <th className="col-2">Barcode Number</th>
              <th className="col-1">Current Stock</th>
              <th className="col-1">Recorded Stock</th>
              <th className="col-1">Real Stock</th>
              <th className="col-2">Action</th>
            </tr>
          </thead>
          {
            products.map((el, i) => {
              return (
                <tbody key={el.id}>
                <tr>
                  <td>{ el.id }</td>
                  <td>{ el.name }</td>
                  <td><img alt="product-img" src={ el.image_url } width="100px"></img></td>
                  <td>{ el.barcode_number }</td>
                  <td className="form-label justify-content-center">{ el.stock }</td>
                  <td>{ report[i].stockRecorded}</td>
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
        <button
          className="btn btn-dark"
          onClick={(e)=>{
            e.preventDefault()
            handleCreateReport(report, transaction, getDailyIncome(transaction), getDailyLosses(report))
          }}
        >GENERATE REPORT</button>
      </div>
      {JSON.stringify(report, null, 2)}"OUTPUT PRODUCT"<br></br>
      {JSON.stringify(transaction, null, 2)}"OUTPUT TRANSACTION"<br></br>
      {JSON.stringify(getDailyIncome(transaction))}"OUTPUT TOTAL INCOME"<br></br>
      {JSON.stringify(getDailyLosses(report))}"OUTPUT TOTAL LOSSES"
    </div>
    </div>
  )
}

export default CreateReport
