import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { fetchReport } from '../store/action/ReportAction'

function Report() {
  const reports = useSelector(state => state.reports)
  const [filterDate, setFilterDate] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchReport())
  }, [dispatch])

  
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div className="row container" style={{ width: "85vw", marginTop: "5vh" }}>
        <div className="col-12 card container table-wrapper-scroll-y my-custom-scrollbar table-responsive" style={{ height: "90vh" }}>
          <h2 style={{ marginTop: "3vh" }}>Report Record</h2>
          <div className="col-6">
              <input 
                type="date" 
                className="form-control" 
                value={filterDate} 
                onChange={(e) => setFilterDate((e.target.value).slice(0,10))}></input>
            </div>
          <table className="table table-hover table-nowrap">
            <thead className="thead-light">
              <tr>
                <th className="col-1" scope="col">Id</th>
                <th className="col-1" scope="col">Transaction</th>
                <th className="col-4" scope="col">Products</th>
                <th className="col-2" scope="col">Income</th>
                <th className="col-2" scope="col">Losses</th>
                <th className="col-2" scope="col">Report Date</th>
              </tr>
            </thead>
            <tbody >
              {
                reports.filter((e) => {
                  if(filterDate === ""){
                    return e
                  } else {
                    return e.createdAt.slice(0,10) === filterDate
                  }
                }).map(el => {
                  return (
                    <tr key={el.id}>
                      <td className="text-heading font-semibold">{el.id}</td>
                      <td className="text-heading font-semibold">
                        {
                          JSON.parse(el.transactions).map(transaction => {
                            return (
                              <p key={transaction.id}>id:{transaction.id}, OrderId: {transaction.order_id} </p>
                            )
                          })
                        }
                      </td>
                      <td className="text-heading font-semibold">
                        {
                          JSON.parse(el.products).map((product) => {
                            return (
                              <p key={product.ProductId}>Id:{product.ProductId}
                               - StockRecorded:{product.stockRecorded}
                               - StockReal:{product.stockReal}
                               - DiffStock:{product.stockRecorded - product.stockReal}
                               - Loss: {(product.stockRecorded - product.stockReal) * product.price}</p>
                            )
                          })
                        }
                      </td>
                      <td className="text-heading font-semibold">{el.income}</td>
                      <td className="text-heading font-semibold">{el.loss}</td>
                      <td className="text-heading font-semibold">{el.createdAt.slice(0,10)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Report
