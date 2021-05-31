import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { fetchReport } from '../store/action/ReportAction'

function Report() {
  const reports = useSelector(state => state.reports)
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
                reports.map(el => {
                  return (

                    <tr key={el.id}>
                      <td className="text-heading font-semibold">{el.id}</td>
                      <td className="text-heading font-semibold">
                        {
                          JSON.parse(el.transactions).map(transaction => {
                            return (
                              <p>id:{transaction.id}, OrderId: {transaction.OrderId} </p>
                            )
                          })
                        }
                      </td>
                      <td className="text-heading font-semibold">
                        {
                          JSON.parse(el.products).map(product => {
                            return (
                              <p>Id:{product.ProductId}
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
                      <td className="text-heading font-semibold">29/05/2021</td>
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
