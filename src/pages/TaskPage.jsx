// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import Board from '../components/Board';
import { getTaskByBoardId } from "../services/tasks";
import useAuthStore from "../store/authStore";
import useTaskStore from "../store/taskStore";
import { useParams } from "react-router-dom";

const TaskPage = () => {
  const { isAuthenticated } = useAuthStore();
  const { id, token } = isAuthenticated();
  const { setTasks, tasks } = useTaskStore(); 
  const { boardId } = useParams();

  useEffect(() => {    
    getTaskByBoardId(boardId, token).then((response) => {      
      setTasks(response.data);    
    });
  }, [id, token]);
  return (
    <div>
      <Board tasks={tasks} />
    </div>
  )
}

export default TaskPage;
