import React from 'react'
import styles from './AssignatureCard.module.css'

const AssignatureCard = () => {
  return (
    <div className={`container ${styles.assignatureCardContainer}`}>
        <div className='row'>
            <div className='col-8'>
                <p>Programacion I</p>
            </div>
            <div className='col-4 text-end'>
                <b className='text-warning'>En curso</b>
            </div>
        </div>
        <div className='row'>
            <div className='col-8'>
                <b>Nota primer parcial: </b>
            </div>
            <div className='col-4 text-end'>
                <b>9.20</b>
            </div>
        </div>
        <div className='row'>
            <div className='col-8'>
                <b>Nota segundo parcial: </b>
            </div>
            <div className='col-4 text-end'>
                <b> - </b>
            </div>
        </div>
        <div className='row'>
            <div className='col-8'>
                <b>Promedio: </b>
            </div>
            <div className='col-4 text-end'>
                <b>9.20</b>
            </div>
        </div>
    </div>
  )
}

export default AssignatureCard