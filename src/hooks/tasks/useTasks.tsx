import { DragEvent, useState } from "react";
import { useTaskStore } from "../../stores";
import Swal from "sweetalert2";
import { TaskStatus } from "../../interface";

interface Options {
  status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {

  const [onDragOver, setOnDragOver] = useState(false);
  const isDragging = useTaskStore(state => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore(state => state.onTaskDrop);
  const addTask = useTaskStore(state => state.addTask);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(true);
  };

  const handleOnDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
  };

  const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };

  const handleAddTask = async () => {
    const { isConfirmed, value: titleTask  } = await Swal.fire({
      title: 'Nueva Tarea',
      input: 'text',
      inputLabel: 'Nueva Tarea',
      inputPlaceholder: 'ingrese el nombre de la tarea',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor ingrese el nombre de la tarea'
        }
      },
    });
    if (!isConfirmed) return;
    addTask(titleTask, status);
  }

  return {
    //proprieties
    onDragOver,
    isDragging,
    //methods
    handleDragOver,
    handleOnDragLeave,
    handleOnDrop,
    handleAddTask,
  }
}
