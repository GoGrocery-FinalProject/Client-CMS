import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { fetchReport } from '../store/action/ReportAction'
import rupiahFormater from '../helpers/rupiahForamat'
import { useHistory } from 'react-router-dom'
import { masa } from 'masa';

function Report() {
  const history = useHistory()
  const reports = useSelector(state => state.reports)
  const [filterDate, setFilterDate] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchReport())
  }, [dispatch])
 
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div className="row container" style={{ width: "85vw", marginTop: "5vh" }}>
        <div className="col-12 card container table-wrapper-scroll-y my-custom-scrollbar table-responsive" style={{ height: "90vh" }}>
          <h2 style={{ marginTop: "3vh" }}>Report Record</h2>
          <div className="col-6">
              <input 
                type="date" 
                className="form-control" 
                value={filterDate} 
                onChange={(e) => setFilterDate((e.target.value).slice(0,10))}></input>
            </div>
          <table className="table table-hover table-nowrap">
            <thead className="thead-light">
              <tr>
                <th className="col-3" scope="col">Report Date</th>
                <th className="col-2" scope="col">Income</th>
                <th className="col-2" scope="col">Loss</th>
                <th className="col-2" scope="col">Losses</th>
              </tr>
            </thead>
            <tbody >
              {
                reports.filter((e) => {
                  if(filterDate === ""){
                    return e
                  } else {
                    return e.createdAt.slice(0,10) === filterDate
                  }
                }).map(el => {
                  return (
                    <tr key={el.id}>
                      <td className="text-heading font-semibold">{masa(new Date(el.createdAt)).format('[Hari] dddd, [Tanggal] D MMMM YYYY')}</td>
                      <td className="text-heading font-semibold">{rupiahFormater(el.income)}</td>
                      <td className="text-heading font-semibold">{rupiahFormater(el.loss)}</td>
                      <td><button className="btn btn-secondary" 
                        onClick={(e) => {
                        e.preventDefault()
                        history.push({
                          pathname: `/${el.id}/detail-report`,
                          state: { data: el }
                        })
                      }}>Detail</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Report
