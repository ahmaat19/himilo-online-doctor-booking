import moment from 'moment'
import React from 'react'

const NewPatient = () => {
  const toDay = new Date()
  return (
    <div className='row'>
      <div className='col-md-4 col-12'>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Patient Name
          </label>
          <input
            type='text'
            name='Name'
            className='form-control'
            id='name'
            placeholder='Patient name'
          />
        </div>
      </div>
      <div className='col-md-4 col-12'>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Gender
          </label>
          <select
            className='form-control'
            id='name'
            name='Gender'
            placeholder='Patient name'
          >
            <option value=''>-----------</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
      </div>
      <div className='col-md-2 col-6'>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Age
          </label>
          <input
            type='Number'
            name='Age'
            className='form-control'
            id='name'
            placeholder='Age'
          />
        </div>
      </div>
      <div className='col-md-2 col-6'>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Unit
          </label>
          <select
            className='form-control'
            name='Unit'
            id='name'
            placeholder='Age unit'
          >
            <option value=''>-----------</option>
            <option value='Years'>Years</option>
            <option value='Months'>Months</option>
            <option value='Days'>Days</option>
          </select>
        </div>
      </div>
      <div className='col-md-3 col-6'>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            District
          </label>
          <select
            className='form-control'
            name='District'
            id='name'
            placeholder='District'
          >
            <option value=''>-----------</option>
            <option value='Dharkeynley'>Dharkeynley</option>
            <option value='Wadajir'>Wadajir</option>
            <option value='Waberi'>Waberi</option>
          </select>
        </div>
      </div>
      <div className='col-md-3 col-6'>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Mobile Number
          </label>
          <input
            type='Number'
            name='Tel'
            className='form-control'
            id='name'
            placeholder='Mobile number'
          />
        </div>
      </div>
      <div className='col-md-3 col-6'>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Status
          </label>
          <select
            className='form-control'
            name='Status'
            id='name'
            placeholder='Status'
          >
            <option value=''>-----------</option>
            <option value='Child'>Child</option>
            <option value='Single'>Single</option>
            <option value='Married'>Married</option>
          </select>
        </div>
      </div>
      <div className='col-md-3 col-6'>
        <div className='mb-3'>
          <label htmlFor='mobile' className='form-label'>
            Appointment Date
          </label>
          <select
            type='number'
            className='form-select'
            id='mobile'
            name='Appointment'
          >
            <option value=''>-----------</option>
            <option value={moment(toDay).format('YYYY-MM-DD')}>
              {moment(toDay).format('YYYY-MM-DD')}
            </option>
            <option value={moment(toDay).format('YYYY-MM-DD')}>
              {moment(toDay).add(1, 'days').format('YYYY-MM-DD')}
            </option>
          </select>
        </div>
      </div>
      <div className='col-md-3 col-6'>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Doctor
          </label>
          <select
            className='form-control'
            name='DoctorID'
            id='name'
            placeholder='Doctor'
          >
            <option value=''>-----------</option>
            <option value='Ahmed'>Ahmed</option>
            <option value='Ali'>Ali</option>
            <option value='Hassan'>Hassan</option>
          </select>
        </div>
      </div>
      <div className='col-md-4 col-6'>
        <div className='mb-3'>
          <label htmlFor='mobile' className='form-label'>
            Mobile Number
          </label>
          <input
            type='number'
            name='billingMobile'
            className='form-control'
            id='mobile'
            placeholder='Enter your mobile number'
          />
        </div>
      </div>
    </div>
  )
}

export default NewPatient
