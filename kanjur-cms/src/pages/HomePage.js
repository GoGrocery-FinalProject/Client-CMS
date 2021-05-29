import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ListProduct from '../components/ListProduct'
import Navbar from '../components/Navbar'
import { fetchProduct } from '../store/action/action'

function HomePage() {
  const history = useHistory()
  const products = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProduct())    
  }, [dispatch])

  function handleAddProduct() {
    history.push('/add')
  }

  function handleReport() {
    history.push('/report')
  }

  return (
    <>
    <Navbar/>
    <div className="home container">
    <h2>Your Product List</h2>
    <div className="d-flex justify-content-between">
      <button 
        className="btn btn-secondary"
        onClick={(e) => {
          e.preventDefault()
          handleAddProduct()
        }}
      >Add new Product</button>
      <button 
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault()
          handleReport()
        }}
      >Create Today's Report</button>
    </div>
    <div className="row ">
      <div className="container col-12 table-wrapper-scroll-y my-custom-scrollbar">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th className="col-4">Name</th>
              <th className="col-2">Barcode Number</th>
              <th className="col-2">Stock</th>
              <th className="col-2">Price</th>
              <th className="col-2">Action</th>
            </tr>
          </thead>
          {/**
           * nanti looping pake map buat list product
          */}
          {
            products.map(el => {
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
  </>
  )
}

export default HomePage
