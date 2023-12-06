"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa";
import "../../globals.css";
import { useGlobalState } from "@/app/context/GlobalProvider";

const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const { AllTask } = useGlobalState();

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      AllTask();

      if (!res.data.error) {
        toast.success("Task created successfully.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} >
      <div className="relative mx-4 my-0 font-medium">
        <h1 className="text-2xl font-medium shadow-sm rounded-md text-[#dbe1e8]">
          Create a Task
        </h1>
        <label className="mb-2 mt-2 inline-block text-md" htmlFor="title">
          Title
        </label>
        <input
          className="w-full border-none p-2 resize-none bg-[#131313] text-[#b2becd]"
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange("title")}
          placeholder="Enter the Title"
        />
      </div>
      <div className="relative mx-4 my-0 font-medium">
        <label className="mb-2 mt-2 inline-block text-md" htmlFor="description">
          Description
        </label>
        <textarea
          className="w-full border-none p-2 resize-none bg-[#131313] text-[#b2becd]"
          id="description"
          value={description}
          onChange={handleChange("description")}
          name="description"
          placeholder="Enter the Description"
        />
      </div>
      <div className="relative mx-4 my-0 font-medium">
        <label className="mb-2 mt-2 inline-block text-md" htmlFor="date">
          Date
        </label>
        <input
          className="date w-full border-none p-2 resize-none bg-[#131313] text-[#b2becd]"
          id="date"
          value={date}
          name="date"
          type="date"
          onChange={handleChange("date")}
          placeholder="Enter the Date"
        />
      </div>
      <div className="flex flex-col gap-5 relative items-center justify-center my-4">
        <div className="relative w-full font-medium flex items-center justify-center cursor-pointer ">
          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                className="checkbox-input"
                id="completed"
                name="completed"
                value={completed.toString()}
                onChange={handleChange("completed")}
              />
              <span className="checkbox-tile">
                <span className="checkbox-label">Completed</span>
              </span>
            </label>
          </div>
        </div>
        <div className="relative w-full font-medium flex items-center justify-center cursor-pointer ">
          <div className="checkbox">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                className="checkbox-input"
                id="important"
                name="important"
                value={important.toString()}
                onChange={handleChange("important")}
              />
              <span className="checkbox-tile">
                <span className="checkbox-label">Important</span>
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="submit-btn flex justify-end transition-colors">
        <Button
          type="submit"
          name="Create Task"
          icon={<FaPlus />}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"400"}
          fs={"1rem"}
          background={"#27AE60"}
          color={"#f8f8f8"}
        />
      </div>
    </form>
  );
};

export default CreateContent;
