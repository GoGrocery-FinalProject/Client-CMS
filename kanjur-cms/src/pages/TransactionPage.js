import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransaction } from '../store/action/ReportAction'

function TransactionPage() {
  const transaction = useSelector(state => state.transactions)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTransaction())
  }, [dispatch])

 
  return (
    <div style={{ display: "flex"}}>
    <Navbar/>
    <div className="row container" style={{width: "85vw", marginTop: "5vh"}}>
      <div className="col-12 card container table-wrapper-scroll-y my-custom-scrollbar table-responsive" style={{height: "90vh"}}>
      <h2 style={{marginTop: "3vh"}}>Transaction Record</h2>
        <table className="table table-hover table-nowrap">
          <thead className="thead-light">
            <tr>
              <th className="col-1" scope="col">Id</th>
              <th className="col-1" scope="col">UserId</th>
              <th className="col-4" scope="col">Products</th>
              <th className="col-2" scope="col">TotalPrice</th>
              <th className="col-2" scope="col">OrderId</th>
              <th className="col-2" scope="col">Transaction Date</th>
            </tr>
          </thead>
          <tbody >
          {
            transaction.map(el => {
              return (
                
                  <tr key={el.id}>
                    <td className="text-heading font-semibold">{ el.id }</td>
                    <td className="text-heading font-semibold">{ el.UserId }</td>
                    <td className="text-heading font-semibold">
                      {
                        (el.Products.slice(2, el.Products.length-2).split('},{')).map((product, i) => {
                          return (
                            <div key={i}>
                            <p>{product.split(',')[0]} : {product.split(',')[1]}</p>
                            </div>
                          )
                        })
                      }
                    </td>
                    <td className="text-heading font-semibold">{ el.totalPrice }</td>
                    <td className="text-heading font-semibold">{ el.OrderId }</td>
                    <td className="text-heading font-semibold">Ceritanya nanti Tanggal</td>
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

export default TransactionPage
