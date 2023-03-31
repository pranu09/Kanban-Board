import React, { useState } from 'react';
import './card.css';
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';
import Chip from '../Chip';
import Dropdown from '../Dropdown/Dropdown';
import CardInfo from './CardInfo/CardInfo';

const Card = (props) => {
    // console.log({ id, date, desc, labels, tasks, title })


    // const { id, date, desc, labels, tasks, title } = props?.card;
    const [showDropdown, setshowDropdown] = useState(false);
    const [showModal, setshowModal] = useState(false);



    if (!props.card || Object.keys(props.card).length === 0) return
    // console.log(props)
    // console.log(props.card)
    const { id, date, desc, labels, tasks, title } = props.card;
    // console.log(date)
    // if(date) return
    const handleClick = (e) => {
        setshowModal(false);
        console.log("event.Target", e.target);
        console.log("event.currentTarget", e.currentTarget);
        if (e.currentTarget === e.target) setshowModal(!showModal);
    }

    // console.log({ id, date, desc, labels, tasks, title })


    return (
        <div className='card' draggable onDragEnd={() => props.handleDragEnd(id, props.boardId)} onDragEnter={() => props.handleDragEnter(id, props.boardId)} onClick={handleClick}>

            {showModal && <CardInfo
                boardId={props.boardId}
                updateCard={props.updateCard}
                onClose={() => setshowModal(!showModal)} card={props.card} />}
            <div className="card_top">
                <div className="card_top_labels">
                    {labels && labels.map((item, i) => (<Chip key={i} close text={item?.text} color={item?.color} />))}
                </div>
                <div className="card_top_more" onClick={() => setshowDropdown(!showDropdown)}>

                    <MoreHorizontal />
                    {showDropdown && <Dropdown onClose={() => setshowDropdown(false)}>
                        <div className='card_dropdown' >
                            <p onClick={() => props.removeCard(props.boardId, id)}>Delete Card</p>
                        </div>

                    </Dropdown>}


                </div>
            </div>
            <div className="card_title">
                {title}
            </div>
            <div className="card_footer">
                {date && <div className="card_timeline">
                    <Clock />
                    <div className="card_date">{date}</div>
                </div>}

                {props.card?.tasks?.length > 0 && <div className="card_checksqure">
                    <CheckSquare />{props.card?.tasks?.filter((item) => item.completed).length}/{props?.card?.tasks?.length}
                </div>}

            </div>
        </div>
    )
}

export default Card