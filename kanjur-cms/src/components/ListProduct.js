import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux' 
import { deleteProduct, editProduct } from '../store/action/ProductAction'

function ListProduct(props) {
  const history = useHistory()
  const dispatch = useDispatch()

  function handlePatchStock(newStock){
    let payload = {
      name: props.product.name, 
      stock: newStock, 
      stockBefore: newStock, 
      barcode: props.product.barcode_number,
      image_url: props.product.image_url,
      description: props.product.description,
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
        <td className="text-heading font-semibold">{ props.product.id }</td>
        <td className="text-heading font-semibold">{ props.product.name }</td>
        <td><img alt="product-img" src={ props.product.image_url } width="100px"></img></td>
        <td className="text-heading font-semibold">{ props.product.barcode_number }</td>
        <td className="text-heading font-semibold">
          <button 
            className="btn btn-outline-danger" 
            style={{"width":"30%"}}
            onClick={e => {
              e.preventDefault()
              handlePatchStock(props.product.stock-1)
            }}
          >-</button>
          &nbsp;{ props.product.stock }&nbsp;
          <button 
            className="btn btn-outline-success" 
            style={{"width":"30%"}}
            onClick={e => {
              e.preventDefault()
              handlePatchStock(props.product.stock+1)
            }}
          >+</button>
        </td>
        <td className="text-heading font-semibold">{ props.product.price }</td>
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
