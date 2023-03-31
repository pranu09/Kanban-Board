import './board.css'

import React, { useState } from 'react'
import { MoreHorizontal } from 'react-feather';
import Editable_board from '../Editable/Editable_board';
import Dropdown from '../Dropdown/Dropdown';
import Card from '../Card/Card';

const Board = (props) => {
    // console.log( props.board ) 
    const [showDropdown, setshowDropdown] = useState(false);
    // const [deleteBoard, setdeleteBoard] = useState();

    // console.log(deleteBoard)
    // console.log(props)   
    return (
        <div className='board'>
            <div className="board_top">
                <p className="board_title">{props?.board?.title} <span></span> <span className="board_count">{props?.board?.cards?.length}</span></p>

                <div className="board_top_more" onClick={() => setshowDropdown(!showDropdown)}>

                    <MoreHorizontal />
                    {showDropdown && <Dropdown onClose={() => setshowDropdown(false)}>
                        <div className='board_dropdown'>
                            <p onClick={() => props.removeBoard(props?.board?.id)}>Delete Board</p>
                        </div>

                    </Dropdown>}


                </div>

            </div>

            <div className="board_cards custom-scroll">

                {props?.board?.cards?.map((item) =>
                // console.log(item)
                (<Card
                    key={item.id}
                    card={item}
                    removeCard={props.removeCard}
                    boardId={props?.board?.id}
                    handleDragEnter={props?.handleDragEnter}
                    handleDragEnd={props?.handleDragEnd}
                    updateCard={props.updateCard}


                />
                )
                )}

                <Card />


                <Editable_board displayClass="board_add_card"
                    text="Add card"
                    placeholder='Enter Card Title'
                    onSubmit={(value) => props.addCard(props.board?.id, value)} />
            </div>
        </div>
    )
}

export default Board;
