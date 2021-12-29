import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaDollarSign } from 'react-icons/fa'
import {
  dynamicInputSelect,
  inputNumber,
  inputText,
  staticInputSelect,
} from '../utils/dynamicForm'

const NewPatient = () => {
  const [doctors, setDoctors] = useState([])
  const [towns, setTowns] = useState([])
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  })
  const toDay = new Date()

  useEffect(() => {
    try {
      const getDoctors = async () => {
        setLoading(true)
        const { data } = await axios.get(`/api/v1/doctors`)
        setDoctors(await data)
        setLoading(false)
      }
      getDoctors()
    } catch (error) {
      setDoctors([])
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    try {
      const getTowns = async () => {
        const { data } = await axios.get(`/api/v1/towns`)
        setTowns(await data)
      }
      getTowns()
    } catch (error) {
      setTowns([])
    }
  }, [])

  const selectedDoctor =
    doctors &&
    doctors.doctors &&
    doctors.doctors.find((doc) => doc && doc.DoctorID === watch().Doctor)

  const submitHandler = (data) => {
    console.log({ data, doctor: selectedDoctor })
    if (typeof window !== undefined)
      alert(JSON.stringify({ data, doctor: selectedDoctor }))
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {loading ? (
        <div className='text-center' style={{ fontSize: '200px' }}>
          <div className='spinner-border' role='status'></div>
        </div>
      ) : (
        <div className='row'>
          <div className='col-lg-3 col-md-4 col-6'>
            {inputText({
              register,
              errors,
              label: 'Patient Name',
              name: 'Name',
            })}
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            {staticInputSelect({
              register,
              errors,
              label: 'Gender',
              name: 'Gender',
              data: [{ name: 'Male' }, { name: 'Female' }],
            })}
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            {inputNumber({
              register,
              errors,
              label: 'Age',
              name: 'Age',
            })}
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            {staticInputSelect({
              register,
              errors,
              label: 'Unit',
              name: 'Unit',
              data: [{ name: 'Years' }, { name: 'Months' }, { name: 'Days' }],
            })}
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            {staticInputSelect({
              register,
              errors,
              label: 'District',
              name: 'District',
              data: [
                { name: 'Dharkeynley' },
                { name: 'Daynile' },
                { name: 'Waberi' },
                { name: 'Shibis' },
                { name: 'Hamar Jajab' },
              ],
            })}
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            {dynamicInputSelect({
              register,
              errors,
              label: 'Town',
              name: 'Town',
              data: towns && towns,
            })}
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            {inputNumber({
              register,
              errors,
              label: 'Patient Mobile Number',
              name: 'PatientMobile',
            })}
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            {staticInputSelect({
              register,
              errors,
              label: 'Status',
              name: 'Status',
              data: [
                { name: 'Child' },
                { name: 'Single' },
                { name: 'Married' },
              ],
            })}
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            {staticInputSelect({
              register,
              errors,
              label: 'Appointment Date',
              name: 'appointment',
              data: [
                { name: moment(toDay).format('YYYY-MM-DD') },
                {
                  name: moment(toDay).add(1, 'days').format('YYYY-MM-DD'),
                },
              ],
            })}
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            {dynamicInputSelect({
              register,
              errors,
              label: 'Doctor',
              name: 'Doctor',
              data: doctors && doctors.doctors,
            })}
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            {inputNumber({
              register,
              errors,
              label: 'Payment Mobile',
              name: 'PaymentMobile',
            })}
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            <button className='btn btn-primary btn-lg mt-4 form-control'>
              <FaDollarSign className='mb-1' /> Pay Now
            </button>
          </div>
          <hr />
          <div className='col-lg-3 col-md-4 col-6'>
            <div className='mb-3'>
              <label htmlFor='DoctorNo'>Doctor No</label>
              <input
                className='form-control'
                disabled
                value={selectedDoctor && selectedDoctor.DoctorNo}
              />
            </div>
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            <div className='mb-3'>
              <label htmlFor='Ticket Cost'>Ticket Cost</label>
              <input
                className='form-control'
                disabled
                value={selectedDoctor && selectedDoctor.Cost.toFixed(2)}
              />
            </div>
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            <div className='mb-3'>
              <label htmlFor='Service Cost'>Service Cost</label>
              <input className='form-control' disabled value={`1.00`} />
            </div>
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            <div className='mb-3'>
              <label htmlFor='Total Cost'>Total Cost</label>
              <input
                className='form-control'
                disabled
                value={
                  selectedDoctor &&
                  (selectedDoctor && selectedDoctor.DoctorNo + 1).toFixed(2)
                }
              />
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

export default NewPatient
