import React from 'react'
import styles from './AssignatureCard.module.css'

const AssignatureCard = ({title, status, firstNote, secondNote, avg}) => {
  return (
    <div className={`container ${styles.assignatureCardContainer}`}>
        <div className='row'>
            <div className='col-8'>
                <p>{title}</p>
            </div>
            <div className='col-4 text-end'>
                <b className='text-warning'>{status}</b>
            </div>
        </div>
        <div className='row'>
            <div className='col-8'>
                <b>Nota primer parcial: </b>
            </div>
            <div className='col-4 text-end'>
                <b>{firstNote}</b>
            </div>
        </div>
        <div className='row'>
            <div className='col-8'>
                <b>Nota segundo parcial: </b>
            </div>
            <div className='col-4 text-end'>
                <b> {secondNote} </b>
            </div>
        </div>
        <div className='row'>
            <div className='col-8'>
                <b>Promedio: </b>
            </div>
            <div className='col-4 text-end'>
                <b>{avg}</b>
            </div>
        </div>
    </div>
  )
}

export default AssignatureCard