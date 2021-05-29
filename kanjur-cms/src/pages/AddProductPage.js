import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addProduct } from '../store/action/action'
import validateInput from '../helpers/inputValidation'

function AddProductPage() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [name, setName] = useState('')
  const [barcode, setBarcode] = useState('')
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState('')

  function handleAddButton() {
    let message = validateInput(name,barcode,stock,price)
    
    if(message.length !== 0) {
      console.log(message.toString())
    } else {
      dispatch(addProduct({name, barcode, stock, price}))
      setName('')
      setBarcode('')
      setStock('')
      setPrice('')
      history.push('/')
    }
  }

  return (
    <div id="addproduct-page" className="container" style={{marginTop: '10%'}}>
      <h2>Add product</h2>
      <form 
        id="addform" 
        onSubmit={(e) => {
          e.preventDefault()
          handleAddButton()
        }} 
        className="border border-2 container bg-light"
        style={{padding: '3rem'}}
      >
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Barcode Number</label>
          <input value={barcode} onChange={(e) => setBarcode(e.target.value)}  className="form-control" />
        </div>
        <div className="mb-3 row">
          <div className="col-6">
            <label className="form-label">Price</label>
            <input  value={price} onChange={(e) => setPrice(e.target.value)}  type="number" className="form-control" />
          </div>
          <div className="col-6">
            <label className="form-label">Stock</label>
            <input  value={stock} onChange={(e) => setStock(e.target.value)}  type="number" className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" id="addtask-btn">
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProductPage
