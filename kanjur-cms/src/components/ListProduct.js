import React from 'react'
import { useHistory } from 'react-router-dom'

function ListProduct(props) {
  const history = useHistory()

  function handleEdit() {
    history.push({
      pathname: `/${props.product.id}/detail`,
      state: { data: props.product }
    })
  }

  return (
      <tbody>
      <tr>
        <td className="text-heading font-semibold">{ props.product.id }</td>
        <td className="text-heading font-semibold">{ props.product.name }</td>
        <td align="center"><img alt="product-img" style={{justifyContent:"center", alignItems:"center"}} src={ props.product.image_url } width="100px"></img></td>
        <td align="center" className="text-heading font-semibold">{ props.product.barcode_number }</td>
        <td align="center" className="text-heading font-semibold">{ props.product.stock }</td>
        <td align="center" className="text-heading font-semibold">{ props.product.price }</td>
        <td align="center">
          <button 
            className="btn btn-outline-success" 
            style={{"width":"80%"}}
            onClick={e => {
              e.preventDefault()
              handleEdit()
            }}
          >Detail</button><br></br>
        </td>
      </tr>
    </tbody>
  )
}

export default ListProduct
