import React, { useEffect, useState } from 'react'
// import { json } from 'react-router-dom';
import Board from './Board/Board';
import Editable_board from './Editable/Editable_board';

import './kanban.css';

const Kanban = () => {
  const [boards, setboards] = useState(
    JSON.parse(localStorage.getItem("kanban")) || []
  );
  // [{
  //   id: Date.now() + Math.random() * 2,
  //   title: "To do",
  //   cards: [
  //     {
  //       id: Date.now() + Math.random(),
  //       title: "Card 1",
  //       tasks: [],
  //       labels: [{
  //         text: "Frontend",
  //         color: "yellow"
  //       }],
  //       desc: "rghjrg",
  //       date: "",
  //     },
  //     {
  //       id: Date.now() + Math.random(),
  //       title: "Card 2",
  //       tasks: [],
  //       labels: [{
  //         id: Date.now() + Math.random() * 2,
  //         text: "Frontend",
  //         color: "blue"
  //       }],
  //       desc: "rghjrg",
  //       date: "",
  //     },
  //     {
  //       id: Date.now() + Math.random(),
  //       title: "Card 3",
  //       tasks: [],
  //       labels: [{
  //         text: "Backend",
  //         color: "green"
  //       }],
  //       desc: "rghjrg",
  //       date: "",
  //     },
  //     {
  //       id: Date.now() + Math.random(),
  //       title: "Card 4",
  //       tasks: [],
  //       labels: [{
  //         text: "Frontend",
  //         color: "blue"
  //       }],
  //       desc: "rghjrg",
  //       date: "",
  //     }
  //   ]
  // }]

  const [target, settarget] = useState({
    cid: "",
    bid: "",
  });

  const handleDragEnter = (cid, bid) => {
    settarget({
      cid, bid,
    })
  }
  const handleDragEnd = (cid, bid) => {
    // let s_bIndex, s_cIndex, t_bIndex, t_cIndex;

    // s_bIndex = boards.findIndex((item) => item.id === bid)
    // if (s_bIndex < 0) return

    // s_cIndex = boards[s_bIndex]?.cards.findIndex((item) => item.id === cid)
    // if (s_cIndex < 0) return

    // t_bIndex = boards.findIndex((item) => item.id === target.bid)
    // if (t_bIndex < 0) return

    // t_cIndex = boards[s_bIndex]?.cards.findIndex((item) => item.id === target.cid)
    // if (t_cIndex < 0) return

    // // when Source delete from anyBoard then store one copyof that

    // const tempBoards = [...boards]
    // const tempCard = tempBoards[s_bIndex].cards[s_cIndex]

    // tempBoards[s_bIndex].cards.splice(s_cIndex, 1)
    // tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);
    // setboards(tempBoards)
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === target.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === target.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setboards(tempBoards);

    settarget({
      bid: "",
      cid: "",
    });
  }
  const addCard = (bid, title) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };

    const index = boards.findIndex((item) => item.id === bid)
    if (index < 0) return

    const tempBoards = [...boards]
    tempBoards[index].cards.push(card);
    setboards(tempBoards);

  }

  const removeCard = (bid, cid) => {
    // const bIndex = boards.findIndex((item) => item.id === bid)
    // if (bIndex < 0) return;

    // const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid)

    // if (cIndex < 0) return;
    // const tempBoards = boards[bIndex].cards[cIndex].filter(item => item.id !== cid);
    // // tempBoards[bIndex].cards[cIndex].splice(cIndex,1)
    // setboards(tempBoards);
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setboards(tempBoards);
  }

  const addBoard = (title) => {
    setboards([
      ...boards, {
        id: Date.now() + Math.random(),
        title,
        cards: [],
      },
    ])
  }
  const removeBoard = (bid) => {
    // const tempBoards=[...boards]
    // bIndex=boards.findIndex((item)=>item.id===bid)
    // if(index<0) return 
    // tempBoards.splice(bIndex,1)

    const tempBoards = boards.filter(item => item.id !== bid)
    setboards(tempBoards)
  }

  const updateCard = (cid, bid, card) => {
    const boardIndex = boards.findIndex((item) => item.id === bid);
    if (boardIndex < 0) return;

    const cardIndex = boards[boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (cardIndex < 0) return;

    const tempBoards = [...boards]
    tempBoards[boardIndex].cards[cardIndex] = card;
    setboards(tempBoards)
  }
  // console.log(boards.length)
  useEffect(() => {
    localStorage.setItem('kanban', JSON.stringify(boards))
  }, [boards])


  return (
    <div className='kanban'>
      <div className="kanban_navbar">
        <h3>Jira</h3>
      </div>

      <div className="kanban_outer">
        <div className="kanban_boards">
          {boards.length > 0 && boards.map((board) => {
            return <Board key={board?.id} board={board}
              removeBoard={removeBoard} removeCard={removeCard} addCard={addCard} handleDragEnd={handleDragEnd} handleDragEnter={handleDragEnter}
              updateCard={updateCard} />

          })

          }



          <div className='kanban_boards_editable'>
            <Editable_board text='Add Board' placehoder='Enter Board Title' onSubmit={value => addBoard(value)} />
          </div>


        </div>
      </div>
    </div>
  )
}


export default Kanban;