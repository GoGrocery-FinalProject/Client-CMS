import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import validateInput from '../helpers/inputValidation'
import { editProduct } from '../store/action/action'

function EditProductPage(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useParams().id
  const data = props.location.state.data

  const [name, setName] = useState(data.name)
  const [barcode, setBarcode] = useState(data.barcode_number)
  const [stock, setStock] = useState(data.stock)
  const [price, setPrice] = useState(data.price)

  function handleEditutton() {
    let message = validateInput(name, barcode, stock, price)

    if (message.length !== 0) {
      console.log(message.toString())
    } else {
      dispatch(editProduct(id, { name, barcode, stock, price, stockBefore: data.stockBefore }))
      setName('')
      setBarcode('')
      setStock('')
      setPrice('')
      history.push('/')
    }
  }

  return (
    <div id="addproduct-page" className="container" style={{ marginTop: '10%' }}>
      <h2>Edit product</h2>
      <form
        id="addform"
        onSubmit={(e) => {
          e.preventDefault()
          handleEditutton()
        }}
        className="border border-2 container bg-light"
        style={{ padding: '3rem' }}
      >
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Barcode Number</label>
          <input value={barcode} onChange={(e) => setBarcode(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3 row">
          <div className="col-6">
            <label className="form-label">Price</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="form-control" />
          </div>
          <div className="col-6">
            <label className="form-label">Stock</label>
            <input value={stock} onChange={(e) => setStock(e.target.value)} type="number" className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" id="addtask-btn">
          Edit Product
        </button>
      </form>
    </div>
  )
}

export default EditProductPage
