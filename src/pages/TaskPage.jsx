// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Board from "../components/Board";
import { getTaskByBoardId } from "../services/tasks";
import { getBoardById } from "../services/boards";
import useAuthStore from "../store/authStore";
import useTaskStore from "../store/taskStore";
import { useParams } from "react-router-dom";

const TaskPage = () => {
  const { isAuthenticated } = useAuthStore();
  const { id, token } = isAuthenticated();
  const { setTasks, tasks, changes } = useTaskStore();
  const { boardId } = useParams();

  useEffect(() => {
    getBoardById(boardId, token).then((response) => {
      if (!response.data) return window.location.replace("/board");      
      const createdBy = response.data.createdBy.id;
      const usersAssignedId = response.data.usersAssignedIds?.filter(item => parseInt(item) === id) || [];      
      if (createdBy !== id && usersAssignedId.length === 0) return window.location.replace("/board");      
      getTaskByBoardId(boardId, token).then((response) => {      
        setTasks(response.data);    
      });
     
    });
  }, [id, token, changes]);
  return (
    <div>
      <Board tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default TaskPage;
