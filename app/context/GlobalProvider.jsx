"use client";

import React, { useContext, useState, createContext, useEffect } from "react";
import themes from "./Theme";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

const GlobalProvider = ({ children }) => {
  const { user } = useUser();

  const [selectedState, setSelectedState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModel, setIsModel] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [collapsed, setCollapsed] = useState(false)


  const theme = themes[selectedState];

  const AllTask = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get("/api/tasks");

      const sorted =  res.data.sort((a,b) => {
        return(
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      })
      // console.log(sorted)
      setTasks(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const collapsedMenu = () => {
    setCollapsed(!collapsed)
  }

  const DeleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Toast Deleted");
      AllTask();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const OpenModal = () => {
    setIsModel(true)
  }

  const CloseModal = () => {
    setIsModel(false)
  }

  const UpdateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);
      toast.success("Task Updated Succssfully");
      AllTask()
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const CompletedTask = tasks.filter((task) => task.isCompleted === true);
  const ImportantTask = tasks.filter((task) => task.isImportant === true);
  const IncompleteTask = tasks.filter((task) => task.isCompleted === false);

  useEffect(() => {
    if (user) {
      AllTask();
    }
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        DeleteTask,
        isLoading,
        CompletedTask,
        ImportantTask,
        IncompleteTask,
        UpdateTask,
        isModel,
        OpenModal,
        CloseModal,
        AllTask,
        collapsed,
        collapsedMenu
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
