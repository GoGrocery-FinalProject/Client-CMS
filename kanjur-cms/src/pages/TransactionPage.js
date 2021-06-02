import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransaction } from '../store/action/ReportAction'
import { useParams } from 'react-router-dom'
import rupiahFormater from '../helpers/rupiahForamat'
import { masa } from 'masa'

function TransactionPage() {
  let { order_id } = useParams()
  const transaction = useSelector(state => state.transactions)
  const [filterDate, setFilterDate] = useState("")
  const [filterOrderId, setFilterOrderId] = useState(order_id)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchTransaction())
  }, [dispatch])
  
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
                  <th className="col-1 text-heading font-semibold" style={{fontSize: 15}} scope="col">UserId</th>
                  <th className="col-4 text-heading font-semibold" style={{fontSize: 15, textAlign: "center"}} scope="col">Products</th>
                  <th className="col-2 text-heading font-semibold" style={{fontSize: 15, textAlign: "center"}} scope="col">TotalPrice</th>
                  <th className="col-2 text-heading font-semibold" style={{fontSize: 15, textAlign: "center"}} scope="col">OrderId</th>
                  <th className="col-2 text-heading font-semibold" style={{fontSize: 15, textAlign: "center"}} scope="col">Transaction Date</th>
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
                          <table className="table table-hover table-nowrap">
                            <thead>
                              <th className="col-1 text-heading font-semibold">id</th>
                              <th className="col-3 text-heading font-semibold">name</th>
                              <th className="col-1 text-heading font-semibold">quantity</th>
                            </thead>
                          {
                            JSON.parse(el.products).map((product, i) => {
                              return (
                                <tbody  key={i}>
                                  <td className="col-1 text-heading font-semibold">{product.id}</td>
                                  <td className="col-3 text-heading font-semibold">{product.name}</td>
                                  <td className="col-1 text-heading font-semibold">{product.quantity} pcs</td>
                                </tbody>)
                            })
                          } 
                          </table>
                        </td>
                        <td className="text-heading font-semibold" style={{textAlign: "center"}}>{rupiahFormater(el.totalPrice)}</td>
                        <td className="text-heading font-semibold">{el.order_id}</td>
                        <td className="text-heading font-semibold">{masa(el.createdAt).format('dddd, D MMMM YYYY, HH:mm:ss')}</td>
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
