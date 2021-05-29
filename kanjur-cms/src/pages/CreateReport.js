import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function CreateReport() {
  const products = useSelector(state => state.products)
  let ArrayReport = []
  products.forEach(el => {
    ArrayReport.push({
      ProductId: el.id,
      stockBefore: el.stock,
      stockReal: el.stock
    })
  })
  const [report, setReport] = useState(ArrayReport)

  function handleRealStockChange(index, value) {
    if(report[index].stockBefore !== value){
      let dupeReport = [...report]
      let before = duperReport[index]
      dupeReport[index] = {...before, stockReal: value}
      setReport(dupeReport)
    } else {
      
    }
  }


  return (
    <div className="row ">
      <div className="container col-12 table-wrapper-scroll-y my-custom-scrollbar">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th className="col-4">Name</th>
              <th className="col-2">Barcode Number</th>
              <th className="col-2">Recorded Stock</th>
              <th className="col-2">Real Stock</th>
              <th className="col-3">Action</th>
            </tr>
          </thead>
          {/**
           * nanti looping pake map buat list product
          */}
          {
            products.map((el, i) => {
              return (
                <tr>
                  <td>{ el.name }</td>
                  <td>{ el.barcodenumber }</td>
                  <td>{ el.stock }</td>
                  <td>
                    <input 
                      type="number" 
                      value={ el.stock }
                      onChange={(e) => handleRealStockChange(i, e.target.value)}
                    >
                    </input>
                  </td>
                  <td><button>Update stock</button></td>
                </tr>
              )
            })
          }
         
        </table>
      </div>
    </div>
  )
}

export default CreateReport
