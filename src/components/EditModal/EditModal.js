import React from 'react';

import './EditModal.css';

const EditModal = (props) => {
  // console.log(props)
  return (
    <div className='editModal' onClick={() => props.onClose ? props.onClose() : ''}>
      <div className="editModal_content custom scroll" 
      onClick={(event) => event.stopPropagation()} 
      >
        {props.children}
      </div>
    </div>
  )
}

export default EditModal;