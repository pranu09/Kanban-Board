import React, { useEffect } from 'react'
import { useRef } from 'react'

const Dropdown = (props) => {
    // console.log(props)
    const dropDownRef = useRef()
    // console.log(dropDownRef)
    const handleClick = (e) => {
        if (
            dropDownRef &&
            !dropDownRef?.current?.contains(e.target) &&
            props.onClose
          )
            props.onClose();
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    })

    return (
        <div ref={dropDownRef} className='dropdown'
            style={{
                position: 'absolute',
                top: "100%",
                right: '0',

            }}
        >
            {props.children}
        </div>
    )
}

export default Dropdown;