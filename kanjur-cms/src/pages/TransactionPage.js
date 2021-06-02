import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransaction } from '../store/action/ReportAction'

function TransactionPage() {
  const transaction = useSelector(state => state.transactions)
  const [filterDate, setFilterDate] = useState("")
  const [filterOrderId, setFilterOrderId] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTransaction())
  }, [dispatch])
  
  // if(transaction){
  //   transaction.forEach(el => {
  //     console.log((JSON.parse(el.products)))
  //   })
  // }

  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div className="row container " style={{ width: "85vw", marginTop: "5vh" }}>
        <div className="col-12 card container" style={{ height: "90vh" }}>
          <h2 style={{ marginTop: "3vh" }}>Transaction Record </h2>
          <div className="row">
            <div className="col-6">
              <input 
                type="text" 
                placeholder="Filter By Order ID here" 
                className="form-control" 
                value={filterOrderId} 
                onChange={(e) => setFilterOrderId(e.target.value)}></input>
            </div>
            <div className="col-6">
              <input 
                type="date" 
                className="form-control" 
                value={filterDate} 
                onChange={(e) => setFilterDate((e.target.value).slice(0,10))}></input>
            </div>
          </div>
          <div className="table-wrapper-scroll-y my-custom-scrollbar table-responsive">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th className="col-1" scope="col">UserId</th>
                  <th className="col-4" scope="col">Products</th>
                  <th className="col-2" scope="col">TotalPrice</th>
                  <th className="col-2" scope="col">OrderId</th>
                  <th className="col-2" scope="col">Transaction Date</th>
                </tr>
              </thead>

              <tbody >
                {
                  transaction.filter(transa => {
                    if(filterOrderId === ""){
                      if(filterDate === "") {
                        return transa
                      } else {
                        return transa.createdAt.slice(0,10) === filterDate
                      }
                    } else {
                      return transa.order_id.toLowerCase().includes(filterOrderId.toLowerCase())
                    }
                  }).filter(({status}) => {
                    return status === "paid"
                  }).map(el => {
                    return (
                      <tr key={el.id}>
                        <td className="text-heading font-semibold">{el.UserId}</td>
                        <td className="text-heading font-semibold">
                          {
                            JSON.parse(el.products).map((product, i) => {
                              return (<p key={i}>id: {product.id}, name: {product.name}   Quantity: {product.quantity}</p>)
                            })
                          } 
                        </td>
                        <td className="text-heading font-semibold">{el.totalPrice}</td>
                        <td className="text-heading font-semibold">{el.order_id}</td>
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
    </div>
  )
}

export default TransactionPage
