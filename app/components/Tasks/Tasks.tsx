"use client";

import { useGlobalState } from "@/app/context/GlobalProvider";
import React from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import { FaPlus } from "react-icons/fa";
import "../../globals.css"
import Modal from "../Modals/Modal";

interface Props {
  title: string;
  tasks: any[];
}

const Tasks = ({ title, tasks }: Props) => {
  const { theme, isLoading, OpenModal, isModel } = useGlobalState();


  return (
    <TaskStyled
      theme={theme}
      className="example w-full h-full p-4 bg-[#212121] rounded-2xl overflow-y-auto "
    >
      {isModel && <Modal content={<CreateContent />} />}
      <h1 className="relative text-3xl font-semibold mb-8">{title}</h1>
      {!isLoading ? (
        <div className="tasks gridTask">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              description={task.description}
              date={task.date}
              isCompleted={task.isCompleted}
              id={task.id}
            />
          ))}
          <button className="create-task flex items-center justify-center gap-3 h-52 text-[#b2becd] text-semibold rounded-lg hover:bg-[#2a2e35] hover:text-[#f8f8f8] transition-all ease-linear duration-400" onClick={OpenModal}>
            <FaPlus /> Add New Task
          </button>
        </div>
      ) : (
        <div className="w-full h-1/2 flex items-center justify-center">
          <span className="loader"></span>
        </div>
      )}
    </TaskStyled>
  );
};

export default Tasks;

const TaskStyled = styled.main`
  border: 2px solid ${(props) => props.theme.borderColor2};
  > h1::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -0.4rem;
    width: 3rem;
    height: 0.2rem;
    background-color: ${(props) => props.theme.colorGreenDark};
    border-radius: 0.5rem;
  }
  .create-task {
    border: 3px solid ${(props) => props.theme.colorGrey5};
  }
`;
