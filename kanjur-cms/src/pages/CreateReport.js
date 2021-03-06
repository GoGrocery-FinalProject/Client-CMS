import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import { editProduct } from '../store/action/ProductAction'
import { fetchTransaction, postReport } from '../store/action/ReportAction'
import { useHistory } from 'react-router-dom'

function CreateReport() {
  const dispatch = useDispatch()
  const history = useHistory()
  const products = useSelector(state => state.products)
  const transaction = useSelector(state => state.transactions)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    dispatch(fetchTransaction())
  }, [dispatch])


  let ArrayReport = []
  products.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)).forEach(el => {
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
    const today = new Date()
    const today_transaction = transactions.filter(el => {
      return el.createdAt.slice(0,10) === today.toISOString().slice(0,10)
    })
    const payload = {
      products: JSON.stringify(products),
      transactions: JSON.stringify(today_transaction),
      income: income,
      loss: loss
    }
    dispatch(postReport(payload))
    history.push('/report')
  }

  return (
    <div style={{ display: "flex"}}>
    <Navbar/>
    <div className="row card container" style={{width: "85vw", marginTop: "5vh", height: "88vh"}}>
      <h2 className="card-header">Create Daily Product Report</h2>
      <input
        className="form-control form-text"
        style={{marginTop: "2vh"}}
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by Name Here">
      </input>
      <div className="card col-12 table-wrapper-scroll-y table-responsive my-custom-scrollbar" style={{height: "65vh"}}>
        <table className="table table-hover table-nowrap" >
          <thead className="thead-light">
            <tr>
              <th className="col">Id</th>
              <th className="col-2">Name</th>
              <th className="col-2">Img Preview</th>
              <th className="col-2">Barcode Number</th>
              <th className="col-1" style={{textAlign: "center"}}>Current<br></br>Stock</th>
              <th className="col-1" style={{textAlign: "center"}}>Recorded<br></br>Stock</th>
              <th className="col-2">Real Stock</th>
              <th className="col-1">Action</th>
            </tr>
          </thead>
          {
            products.filter(item => {
                return item.name.toLowerCase().includes(filter.toLocaleLowerCase())
            }).sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)).map((el, i) => {
              return (
                <tbody key={el.id}>
                <tr>
                  <td className="text-heading font-semibold">{ el.id }</td>
                  <td className="text-heading font-semibold">{ el.name }</td>
                  <td><img alt="product-img" src={ el.image_url } width="100px"></img></td>
                  <td className="text-heading font-semibold" style={{textAlign: "center"}}>{ el.barcode_number }</td>
                  <td className="form-label justify-content-center" style={{textAlign: "center"}}>{ el.stock } pcs</td>
                  <td className="text-heading font-semibold" style={{textAlign: "center"}}>{ report[i].stockRecorded} pcs</td>
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
          className="btn btn-warning btn-block mb-4"
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
