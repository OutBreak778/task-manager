"use client";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React from "react";
import { useGlobalState } from "@/app/context/GlobalProvider";
import styled from "styled-components";
import FormatDate from "@/app/utils/FormatDate";
import toast from "react-hot-toast";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: Boolean;
  id: string;
}

const TaskItem = ({ title, description, date, isCompleted, id }: Props) => {
  const { theme, DeleteTask, UpdateTask } = useGlobalState();

  const handleClick = () => {
    toast.error("Clicked");
  };

  return (
    <TaskItemStyle
      theme={theme}
      className="exampletext-slate-100 px-6 py-4 rounded-lg h-52 flex flex-col gap-1 bg-[#404040] shadow-lg"
    >
      <h1 className="text-xl text-medium line-clamp-1">{title}</h1>
      <p className="line-clamp-3 py-1">{description}</p>
      <p className="date left-0 mt-auto">{FormatDate(date)}</p>
      <div className="task-footer flex items-center gap-5">
        {isCompleted ? (
          <button
            className="complete border-none outline-none cursor-pointer inline-block px-2 py-1 bg-[#27AE60] rounded-md"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              UpdateTask(task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete border-none outline-none cursor-pointer inline-block px-2 py-1 bg-[#fe6854] rounded-md"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              UpdateTask(task);
            }}
          >
            Incomplete
          </button>
        )}
        <button className="edit ml-auto">
          <FaEdit className="text-xl text-[#b2becd]" />
        </button>
        <button className="delete" onClick={() => DeleteTask(id)}>
          <MdDelete className="text-xl text-[#b2becd]" />
        </button>
      </div>
    </TaskItemStyle>
  );
};

export default TaskItem;

const TaskItemStyle = styled.div`
  .example::-webkit-scrollbar {
    display: none;
  }
  border: 2px solid ${(props) => props.theme.borderColor2};
`;
