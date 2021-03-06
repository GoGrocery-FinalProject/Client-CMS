import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ListProduct from '../components/ListProduct'
import Navbar from '../components/Navbar'
import { fetchProduct } from '../store/action/ProductAction'

function HomePage() {
  const history = useHistory()
  const products = useSelector(state => state.products)
  const dispatch = useDispatch()
  const [filterName, setFilterName] = useState('')
  const [filterId, setFilterId] = useState('')

  useEffect(() => {
    dispatch(fetchProduct())
  }, [dispatch])

  function handleAddProduct() {
    history.push('/add')
  }

  function handleReport() {
    history.push('/create-report')
  }

  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div className="container card" style={{ width: "85vw", marginTop: "3vh", height:"95vh", marginBottom: "3vh" }}>
        <h2 className="card-header" style={{marginTop: "1vh"}}>Product List</h2>
        <div className="d-flex justify-content-between row" style={{ marginTop:"3vh",}}>
          <div className="col-2">
            <input
              className="form-control form-text"
              type="number"
              style={{width:"100%"}}
              value={filterId}
              onChange={(e) => setFilterId(e.target.value)}
              placeholder="Filter by Id Here">
            </input>
          </div>
          <div className="col-6">
            <input
              className="form-control form-text"
              type="text"
              style={{width:"100%"}}
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Filter by Name Here">
            </input>
          </div>
          <div className="col-2">
            <button
              className="btn btn-secondary"
              style={{width:"100%", fontSize:12}}
              onClick={(e) => {
                e.preventDefault()
                handleAddProduct()
              }}
            >Add Product</button>
          </div>
          <div className="col-2">
            <button
              className="btn btn-warning"
              style={{width:"100%", fontSize:12}}
              onClick={(e) => {
                e.preventDefault()
                handleReport()
              }}
            >Create Report</button>
          </div>
        </div>
        <div className="card" style={{height: "70%", marginTop:"3vh", marginBottom:"3vh"}}>
          <div className="container table-wrapper-scroll-y my-custom-scrollbar table-responsive">
            <table className="table table-hover table-nowrap"  style={{"tableLayout": "fixed", "overFlow": "breakWord"}}>
              <thead className="thead-light">
                <tr>
                  <th className="" style={{width:"5px"}}>Id</th>
                  <th className="col-3" >Name</th>
                  <th className="col-2" style={{textAlign: "center"}}>Image</th>
                  <th className="col-2" style={{textAlign: "center"}}>Barcode Number</th>
                  <th className="col-1" style={{textAlign: "center"}}>Stock</th>
                  <th className="col-1" style={{textAlign: "center"}}>Price</th>
                  <th className="col-2" style={{textAlign: "center"}}>Action</th>
                </tr>
              </thead>
              {
                products.filter(item => {
                  if(filterId === "") {
                    return item.name.toLowerCase().includes(filterName.toLocaleLowerCase())
                  } else {
                    return +item.id === +filterId
                  }
                }).sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)).map(el => {
                  return (
                    <ListProduct
                      key={el.id}
                      product={el}
                    />
                  )
                })
              }
            </table>
          </div>
          <div className="container col-4">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
