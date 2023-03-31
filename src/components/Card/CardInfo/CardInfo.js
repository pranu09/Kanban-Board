import React, { useEffect, useState } from 'react'
import { Calendar, CheckCircle, CheckSquare, List, Tag, Trash, Type, X } from 'react-feather';
import Editable_board from '../../Editable/Editable_board';
import EditModal from '../../EditModal/EditModal';
import Chip from '../../Chip';

import './CardInfo.css';

const CardInfo = (props) => {
    const [activeColor, setactiveColor] = useState("");
    const [values, setvalues] = useState({ ...props.card });
    // console.log(values)
    // console.log(props)
    // console.log({...values,title:"Pranav",desc:'first try'})
    const colors = [
        "#a8193d",
        "#4fcc25",
        "#1ebffa",
        "#8da377",
        "#9975bd",
        "#cf61a1",
        "#240959",
    ];
    // const { id, date, desc, labels, tasks, title } = props.card;



    const calculatePercentage = () => {
        const completed = values.tasks?.filter(item => item.completed)?.length

        return (completed / values.tasks?.length) * 100
    }
    const addLabels = (value, color) => {
        const index = values.labels?.findIndex((item) => item.text === value);
        if (index > -1) return;
        const label = {
            text: value,
            color
        }
        setvalues({ ...values, labels: [...values.labels, label] })
        setactiveColor('')
    }

    const removelable = (text) => {
        // const index = values.labels?.findIndex((item) => item.text === text);
        // if (index < 0) return;
        const tempLables = values?.labels?.filter((item) => item.text !== text)
        setvalues({ ...values, labels: tempLables })
    }

    const addTask = (value) => {
        console.log(value)
        const task = {
            id: Date.now() + Math.random(),
            text: value,
            completed: false
        }
        console.log(task)
        // console.log({...values})
        setvalues({ ...values, tasks: [...values.tasks, task] })
        console.log(values)
    }
    const removeTask = (id) => {
        // const index = values.tasks?.findIndex(item => item.id === id)
        const tempTask = values.tasks?.filter(item => item.id !== id)
        // if (index < 0) return

        // const tempTask = values.task?.splice(index, 1)
        setvalues({ ...values, tasks: tempTask })
    }

    const updateTask = (id, completed) => {
        const index = values.tasks?.findIndex(item => item.id === id)
        if (index < 0) return;

        const tempTasks = [...values.tasks]

        tempTasks[index].completed = completed;

        setvalues({ ...values, tasks: tempTasks })
    }
    useEffect(() => {
        props.updateCard(props?.card?.id, props?.boardId, values)
    }, [values])

    return (

        <EditModal >
            <div className="cardInfo">
                <div className="cardInfoBox">
                    <div className="cardInfoBoxTitle">
                        <Type />
                        <h3>Card Title</h3>
                    </div>
                    <div className="cardInfoBoxBody">
                        <Editable_board text={values.title} default={values.title} placeholder="Enter Title"
                            buttonText={"Enter Card Title"}
                            onSubmit={(value) => setvalues({ ...values, title: value })} />
                    </div>
                </div>
                <div className="cardInfoBox">
                    <div className="cardInfoBoxTitle">
                        <List />
                        <h3>Description</h3>
                    </div>
                    <div className="cardInfoBoxBody">
                        <Editable_board text={values.desc} default={values.desc} placeholder="Add Description"
                            buttonText={"Enter Card Description"}
                            onSubmit={(value) => setvalues({ ...values, desc: value })}  />
                    </div>
                </div>
                <div className="cardInfoBox">
                    <div className="cardInfoBoxTitle">
                        <Calendar />
                        <h3>Date</h3>
                    </div>
                    <div className="cardInfoBoxBody">
                        <input type="date" name="" id="" defaultValue={values.date ? new Date(values.date).toISOString().substr(0, 10) : ""}
                            onChange={(e) => setvalues({ ...values, date: e.target.value })} />
                    </div>
                </div>
                <div className="cardInfoBox">
                    <div className="cardInfoBoxTitle">
                        <Tag />
                        <h3>labels</h3>
                    </div>
                    <div className="cardInfoBox_labels">
                        {values.labels?.map((item, index) => (
                            <Chip
                                close
                                key={item.text + index}
                                onClose={() => removelable(item.text)}
                                color={item.color}
                                text={item.text}
                            />

                        ))}
                    </div>
                    <div className="cardInfoBox_colors">
                        {
                            colors.map((item, i) => <li key={i} style={{ backgroundColor: item }} className={item === activeColor ? "active" : ""}
                                onClick={() => setactiveColor(item)}></li>)
                        }

                    </div>

                    <div className="cardInfoBoxBody">
                        <Editable_board text={"Hello"} placeholder="Enter Title" buttonText={"Add label"}
                            onSubmit={(value) => addLabels(value, activeColor)} />
                    </div>

                </div>
                <div className="cardInfoBox">
                    <div className="cardInfoBoxTitle">
                        <CheckSquare />
                        <h3>Tasks</h3>
                    </div>
                    <div className="cardInfo_box_progress_bar">
                        <div className={`cardInfo_box_progress`} style={{
                            width: `${calculatePercentage()}%`,
                            backgroundColor: calculatePercentage() === 100 ? "limegreen" : "",
                        }}></div>
                    </div>
                    <div className="card_Info_Box_list">

                        {values.tasks && values?.tasks?.map((item) => (
                            <div key={item.id} className="cardinfo_box_task_checkbox">
                                <input
                                    type="checkbox"
                                    defaultChecked={item.completed}
                                    onChange={(e) => updateTask(item.id, e.target.checked)}
                                />
                                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                                <Trash onClick={() => removeTask(item.id)} />
                            </div>
                        ))}


                    </div>
                    <div className="cardInfoBoxBody">
                        <Editable_board text={"Add new Task"} placeholder="Enter Task"
                            buttonText='Add Task' onSubmit={(value) => addTask(value)} />
                    </div>
                </div>

            </div>
        </EditModal>
    )

}

export default CardInfo;