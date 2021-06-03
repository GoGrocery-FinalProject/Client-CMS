import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import validateInput from '../helpers/inputValidation'
import { deleteProduct, editProduct } from '../store/action/ProductAction'
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
  const [editable, setEditable] = useState(false)

  function handleEditable() {
    if(editable) {
      setEditable(false)
    } else {
      setEditable(true)
    }
  }

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

  function handleDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(data.id))
        history.push('/')
      }
    })
  }

  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div id="addproduct-page" className="container" style={{ marginTop: '3vh', width: "85vw" }}>
        <form
          id="addform"
          onSubmit={(e) => {
            e.preventDefault()
            handleEditutton()
          }}
          className="card border-2 container bg-white"
        >
          <h2 className="card-header">Detail Product</h2>
          <div className="row" style={{marginTop: "5vh"}}>
            <div className="col-6">
              <div className="mb-3 row">
                <div className="mb-3 col-6">
                  <label className="form-label">Name</label>
                  {
                    editable ? 
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />:
                    <input disabled value={name} type="text" className="form-control" />
                  }
                </div>
                <div className="mb-3 col-6">
                  <label className="form-label">Barcode Number</label>
                  {
                    editable ? 
                    <input value={barcode} onChange={(e) => setBarcode(e.target.value)} className="form-control" /> :
                    <input value={barcode} disabled className="form-control" />
                  }
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Image Url</label>
                {
                    editable ? 
                    <input value={image_url} onChange={(e) => setImage_url(e.target.value)} className="form-control" /> :
                    <input value={image_url} disabled className="form-control" /> 
                }
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                {
                    editable ? 
                    <input value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" /> :
                    <input value={description} disabled className="form-control" />
                }
              </div>
              <div className="mb-3 row">
                <div className="col-6">
                  <label className="form-label">Price</label>
                  {
                    editable ? 
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="form-control" /> :
                    <input value={price} disabled type="number" className="form-control" />
                  }
                </div>
                <div className="col-6">
                  <label className="form-label">Stock</label>
                  {
                    editable ? 
                    <input value={stock} onChange={(e) => setStock(e.target.value)} type="number" className="form-control" /> :
                    <input value={stock} disabled type="number" className="form-control" />
                  }
                </div>
              </div>
              {
                editable ? 
              <button type="submit" className="btn btn-primary" >
                Edit Product
              </button> :
              ""
              }
            </div>
            <div className="col-6" style={{ margin: "auto" }}>
            {
            image_url === "" ? 
                <img alt="no found" src={"https://www.keepsakestudio.in/wp-content/uploads/2015/11/no-image.jpg"} style={{ maxWidth: "20vw",  display: "block", marginLeft: "auto", marginRight: "auto"}}></img> :
                <img alt="preview product" src={image_url} style={{ maxWidth: "20vw",  display: "block", marginLeft: "auto", marginRight: "auto"}}></img>
            }
            </div>
          </div>
        <div className="row" style={{marginTop: "3vh", marginBottom: "3vh"}}>
          <button className="btn btn-warning col-2" onClick={(e) => { 
            e.preventDefault()
            handleEditable() 
          }}>Edit</button>
          <button className="btn btn-danger offset-1 col-2" onClick={(e) => {
            e.preventDefault()
            handleDelete() 
          }}>Delete</button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductPage
