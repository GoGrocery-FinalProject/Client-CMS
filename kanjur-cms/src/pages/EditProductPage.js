import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import validateInput from '../helpers/inputValidation'
import { editProduct } from '../store/action/ProductAction'
import Navbar from '../components/Navbar'

function EditProductPage(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useParams().id
  const data = props.location.state.data

  const [name, setName] = useState(data.name)
  const [barcode, setBarcode] = useState(data.barcode_number)
  const [image_url, setImage_url] = useState(data.image_url)
  const [description, setDescription] = useState(data.description)
  const [stock, setStock] = useState(data.stock)
  const [price, setPrice] = useState(data.price)

  function handleEditutton() {
    let message = validateInput(name, barcode, stock, price, image_url, description)

    if (message.length !== 0) {
      console.log(message.toString())
    } else {
      dispatch(editProduct(id, { name, barcode, stock, price, image_url, description, stockBefore: data.stockBefore }))
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
      <div id="addproduct-page" className="container" style={{ marginTop: '8vh', width: "85vw" }}>
        <form
          id="addform"
          onSubmit={(e) => {
            e.preventDefault()
            handleEditutton()
          }}
          className="card border-2 container bg-white"
          style={{ padding: '3rem' }}
        >
          <h2 className="card-header">Edit product</h2>
          <div className="row" style={{marginTop: "5vh"}}>
            <div className="col-6">
              <div className="mb-3 row">
                <div className="mb-3 col-6">
                  <label className="form-label">Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3 col-6">
                  <label className="form-label">Barcode Number</label>
                  <input value={barcode} onChange={(e) => setBarcode(e.target.value)} className="form-control" />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Image Url</label>
                <input value={image_url} onChange={(e) => setImage_url(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
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
            </div>
            <div className="col-6">
                <img alt="preview product" src={image_url} style={{ width: "100%" }}></img>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductPage
