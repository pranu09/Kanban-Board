import React, { useState } from 'react';
import { X } from 'react-feather';
import './edit_board.css'


const Editable_board = (props) => {
    const [showEdit, setshowEdit] = useState(false);
    const [inputText, setinputText] = useState(props.text || "");
    // console.log(props)
    const addBoard = (e) => {

        setinputText(e.target.value);
        // setinputText("");
    }


    return (
        <div className='editable_board'>

            {showEdit ?
                (<form className={`editable_board_edit ${props.editClass || ''}`} onSubmit={(e) => {
                    e.preventDefault()
                    if (props.onSubmit) props.onSubmit(inputText);
                    setinputText('');
                    setshowEdit(false)
                }

                }>
                    <input autoFocus type="text" placeholder={props.placeholder || 'Enter Item'}
                        value={inputText}
                        // defaultValue={props.text} 
                        onChange={addBoard} />
                    <div className="editable_board_edit_footer">
                        <button className='editable_board_edit_footer_button' type="submit" >{props.buttonText || "Add"}</button>
                        <X onClick={() => setshowEdit(false)} />

                    </div>
                </form>) :
                (<p className={`editable_display ${props.displayClass ? props.displayClass : ""
                    }`} onClick={() => setshowEdit(true)}>{props.text || "Add card"}</p>)}

        </div >
    )
}

export default Editable_board;