import React from 'react'
import Link from 'next/link'
import { FaUser, FaUserPlus } from 'react-icons/fa'

const Navigation = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <Link href='/'>
          <a className='navbar-brand'>Himilo Doctor Booking</a>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link href='/new-patient'>
                <a className='nav-link' aria-current='page'>
                  <FaUserPlus className='mb-1' /> New Patient
                </a>
              </Link>
            </li>

            <li className='nav-item'>
              <Link href='/existing-patient'>
                <a className='nav-link' aria-current='page'>
                  <FaUser className='mb-1' /> Existing Patient
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
