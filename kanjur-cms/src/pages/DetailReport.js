import React from 'react'
import { masa } from 'masa';
import Navbar from '../components/Navbar'
import { useHistory } from 'react-router-dom'
import rupiahFormater from '../helpers/rupiahForamat'

function DetailReport(props) {
  const history = useHistory()

  const data = props.location.state.data

  console.log(data)
  return (
    <div style={{ display: "flex" }}>
      <Navbar/>
      <div className="row container" style={{ width: "85vw", marginTop: "5vh" }}>
        <div className="col-12 card container" style={{ height: "90vh" }}>
          <h2 style={{ marginTop: "3vh" }}>Detail Report </h2>
          <h3>{masa(new Date('2020-11-15')).format('[Hari] dddd, [Tanggal] D MMMM YYYY')}</h3>
          <div className="row" style={{ marginTop: "5vh" }}>
            <div className="col-4 offset-1 card">
            <h3 style={{ marginTop: "3vh", textAlign: "center" }}>Transaction Report</h3>
              <table className="table table-wrapper-scroll-y my-custom-scrollbar table-responsive card"  style={{height: "40vh"}}>
                <thead className="thead-light">
                  <tr>
                    <th style={{ textAlign: "center" }} className="col-3" scope="col">Order ID</th>
                  </tr>
                </thead>
                {
                  JSON.parse(data.transactions).map(el => {
                    return (
                      <tbody>
                        <td style={{ justifyContent: "center", alignContent: "center" }}>
                          <button 
                            className="btn button-small" 
                            style={{ margin: "auto", fontSize: "15" }}
                            onClick={(e) => {
                              e.preventDefault()
                              history.push({
                                pathname: `/transaction/${el.order_id}`
                              })
                            }}
                          >{el.order_id}</button>
                        </td>
                      </tbody>
                    )
                  })
                }
              </table>
            </div>
            <div className="card col-5 offset-1 ">
            <h3 style={{ marginTop: "3vh", textAlign: "center" }}>Product Report</h3>
              <div className="table-responsive card table-wrapper-scroll-y my-custom-scrollbar"> 
                <table className="table table-wrapper-scroll-y my-custom-scrollbar" style={{height: "40vh"}}>
                  <thead className="thead-light">
                    <tr>
                      <th style={{textAlign: "center"}} className="col-1" scope="col">id</th>
                      <th style={{textAlign: "center"}} className="col-3" scope="col">Stock<br></br>Recorded</th>
                      <th style={{textAlign: "center"}} className="col-3" scope="col">Stock<br></br>Real</th>
                      <th style={{textAlign: "center"}} className="col-3" scope="col">Diff<br></br>Stock</th>
                      <th style={{textAlign: "center"}} className="col-2" scope="col">Loss</th>
                    </tr>
                  </thead>
                  {
                    JSON.parse(data.products).sort((a,b) => (a.ProductId > b.ProductId) ? 1 : ((b.ProductId > a.ProductId) ? -1 : 0)).map((product) => {
                      return (
                        <tbody key={product.ProductId}>
                          <td className="text-heading font-semibold" style={{textAlign: "center"}}>{product.ProductId}</td>
                          <td className="text-heading font-semibold" style={{textAlign: "center"}}>{product.stockRecorded} pcs</td>
                          <td className="text-heading font-semibold" style={{textAlign: "center"}}>{product.stockReal} pcs</td>
                          <td className="text-heading font-semibold" style={{textAlign: "center"}}>{product.stockRecorded - product.stockReal} pcs</td>
                          <td className="text-heading font-semibold" style={{textAlign: "center"}}>{rupiahFormater((product.stockRecorded - product.stockReal) * product.price)}</td>
                        </tbody>
                      )
                    })
                  }
                </table>
              </div>
            </div>
          </div>
          <div className="row">
              <div className="mb-3 col-5 offset-1" style={{ marginTop: "5vh"}}>
                <label className="form-label">Income</label>
                <input value={rupiahFormater(data.income)} disabled type="text" className="form-control" />
              </div>
              <div className="mb-3 col-5" style={{ marginTop: "5vh"}}>
                <label className="form-label">Losses</label>
                <input value={rupiahFormater(data.loss)} style={{color: "red"}} disabled className="form-control" />
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DetailReport
