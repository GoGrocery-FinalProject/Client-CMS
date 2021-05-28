import React, { useState } from 'react'

function AddProductPage() {

  const [name, setName] = useState('')
  const [barcode, setBarcode] = useState('')
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState('')

  function handleAddButton() {
    console.log(name, barcode, stock, price)
    setName('')
    setBarcode('')
    setStock('')
    setPrice('')
  }

  return (
    <div id="addproduct-page" class="container" style={{marginTop: '10%'}}>
      <h2>Add Product Page</h2>
      <form 
        id="addform" 
        onSubmit={(e) => {
          e.preventDefault()
          handleAddButton()
        }} 
        class="border border-5 container bg-light"
        style={{padding: '3rem'}}
      >
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Barcode Number</label>
          <input value={barcode} onChange={(e) => setBarcode(e.target.value)}  class="form-control" />
        </div>
        <div class="mb-3 row">
          <div class="col-6">
            <label class="form-label">Price</label>
            <input  value={price} onChange={(e) => setPrice(e.target.value)}  type="number" class="form-control" />
          </div>
          <div class="col-6">
            <label class="form-label">Stock</label>
            <input  value={stock} onChange={(e) => setStock(e.target.value)}  type="number" class="form-control" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary" id="addtask-btn">
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProductPage
