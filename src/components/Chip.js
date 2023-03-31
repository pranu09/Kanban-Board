import React from 'react'
import { X } from 'react-feather';
import './chip.css';
const Chip = (props) => {
  // console.log(props)
  return (
    <div className='chip' style={{ backgroundColor: props.color }}>
      <p>{props.text}</p>

      {props.close && <X onClick={() => props.onClose ? props.onClose() : ""} />}
      {/* <Close/> */}
    </div>
  )
}

export default Chip