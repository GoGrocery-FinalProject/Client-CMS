import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux' 
import { deleteProduct, editProduct } from '../store/action/action'

function ListProduct(props) {
  const history = useHistory()
  const dispatch = useDispatch()

  function handlePatchStock(newStock){
    let payload = {
      name: props.product.name, 
      stock: newStock, 
      stockBefore: newStock, 
      barcode: props.product.barcode_number,
      price: props.product.price
    }
    dispatch(editProduct(props.product.id, payload))
  }

  function handleEdit() {
    history.push({
      pathname: `/${props.product.id}/edit`,
      state: { data: props.product }
    })
  }

  function handleDelete() {
    console.log('delete')
    dispatch(deleteProduct(props.product.id))
  }

  return (
      <tbody>
      <tr>
        <td>{ props.product.name }</td>
        <td>{ props.product.barcode_number }</td>
        <td>
          <button 
            className="btn btn-outline-danger" 
            style={{"width":"20%"}}
            onClick={e => {
              e.preventDefault()
              handlePatchStock(props.product.stock-1)
            }}
          >-</button>
          { props.product.stock }
          <button 
            className="btn btn-outline-success" 
            style={{"width":"20%"}}
            onClick={e => {
              e.preventDefault()
              handlePatchStock(props.product.stock+1)
            }}
          >+</button>
        </td>
        <td>{ props.product.price }</td>
        <td>
          <button 
            className="btn btn-outline-success" 
            style={{"width":"50%"}}
            onClick={e => {
              e.preventDefault()
              handleEdit()
            }}
          >Edit</button>
          <button 
            className="btn btn-outline-danger" 
            style={{"width":"50%"}}
            onClick={e => {
              e.preventDefault()
              handleDelete()
            }}
          >Delete</button>
        </td>
      </tr>
    </tbody>
  )
}

export default ListProduct
