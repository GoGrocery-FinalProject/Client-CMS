import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addProduct } from '../store/action/ProductAction'
import validateInput from '../helpers/inputValidation'
import Navbar from '../components/Navbar'

function AddProductPage() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [name, setName] = useState('')
  const [barcode, setBarcode] = useState('')
  const [image_url, setImage_url] = useState('')
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState('')

  function handleAddButton() {
    let message = validateInput(name, barcode, stock, price, image_url, description)

    if (message.length !== 0) {
      console.log(message.toString())
    } else {
      dispatch(addProduct({ name, barcode, stock, price, image_url, description }))
      setName('')
      setBarcode('')
      setImage_url('')
      setDescription('')
      setStock('')
      setPrice('')
      history.push('/')
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div id="addproduct-page" className="container" style={{ marginTop: '10vh', width: "85vw" }}>
        
        <form
          id="addform"
          onSubmit={(e) => {
            e.preventDefault()
            handleAddButton()
          }}
          className="card border-2 container bg-white "
          style={{ padding: '3rem' }}
        >
          <h2 className="card-header">Add product</h2>
          <div className="row" style={{marginTop: "3vh"}}>
            <div className="col-6">
              <div className="mb-3 row">
                <div className="mb-3 col-6">
                  <label className="form-label">Name</label>
                  <input value={name} placeholder="Item Name" onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3 col-6">
                  <label className="form-label">Barcode Number</label>
                  <input value={barcode} placeholder="Item Barcode Number" onChange={(e) => setBarcode(e.target.value)} className="form-control" />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Image Url</label>
                <input value={image_url} placeholder="Item Image Url" onChange={(e) => setImage_url(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input value={description} placeholder="Item Description" onChange={(e) => setDescription(e.target.value)} className="form-control" />
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
                Add Product
              </button>
            </div>
            <div className="col-6">
              {
                image_url === "" ? 
                <img alt="no found" src={"https://www.keepsakestudio.in/wp-content/uploads/2015/11/no-image.jpg"} style={{ maxWidth: "20vw",  display: "block", marginLeft: "auto", marginRight: "auto"}}></img> :
                <img alt="preview product" src={image_url} style={{ maxWidth: "20vw",  display: "block", marginLeft: "auto", marginRight: "auto"}}></img>
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductPage
