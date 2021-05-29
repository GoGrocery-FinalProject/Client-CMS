import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux' 

function ListProduct(props) {
  const history = useHistory()
  const dispatch = useDispatch()

  function handlePatchStock(newStock){
    console.log(newStock)
  }

  function handleEdit() {
    console.log('edit')
    history.push({
      pathname: '/3/edit',
      state: { data: props }
    })
  }

  function handleDelete() {
    console.log('delete')
  }

  return (
      <tbody>
      <tr>
        <td>{ props.name }</td>
        <td>{ props.barcodenumber }</td>
        <td>
          <button 
            className="btn btn-outline-danger" 
            style={{"width":"20%"}}
            onClick={e => {
              e.preventDefault()
              handlePatchStock(props.stock-1)
            }}
          >-</button>
          { props.stock }
          <button 
            className="btn btn-outline-success" 
            style={{"width":"20%"}}
            onClick={e => {
              e.preventDefault()
              handlePatchStock(props.stock+1)
            }}
          >+</button>
        </td>
        <td>{ props.price }</td>
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
