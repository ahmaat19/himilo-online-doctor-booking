import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Patients = () => {
  const [patients, setPatients] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.get(`/api/v1/patients/?search=${search}`)
      setPatients(await data)
    } catch (error) {
      setPatients([])
      console.log(error.response.data)
    }
    setLoading(false)
  }
  return (
    <div className='mt-3'>
      <form onSubmit={submitHandler}>
        <div className='input-group mb-3'>
          <input
            onChange={(e) => setSearch(e.target.value)}
            required
            type='text'
            className='form-control shadow-none'
            placeholder='Search by patient id or mobile number'
            aria-label='Search by patient id or mobile number'
            aria-describedby='basic-addon2'
          />
          <button
            className='input-group-text btn btn-primary shadow-none'
            id='basic-addon2'
          >
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <div className='text-center' style={{ fontSize: '200px' }}>
          <div className='spinner-border' role='status'></div>
        </div>
      ) : patients && patients.length > 0 ? (
        <table className='table caption-top'>
          <caption>{patients && patients.length} Patients were found!</caption>
          <thead>
            <tr>
              <th scope='col'>PATIENT ID</th>
              <th scope='col'>NAME</th>
              <th scope='col'>GENDER</th>
              <th scope='col'>AGE</th>
              <th scope='col'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {patients &&
              patients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.PatientID}</td>
                  <td>{patient.Name}</td>
                  <td>{patient.Gender}</td>
                  <td>
                    {patient.Age} {patient.DateUnit}
                  </td>
                  <td>{patient.Tel}</td>
                  <td>
                    <button className='btn btn-success btn-sm'>Select</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        patients &&
        patients.length === 0 &&
        search && (
          <div className='text-center'>
            <span className='text-danger'>No Patient Found</span>
          </div>
        )
      )}
    </div>
  )
}

export default Patients
