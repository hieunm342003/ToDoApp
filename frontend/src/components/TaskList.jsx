import React from 'react'
import TaskEmptyState from './TaskEmptyState';
import TaskCard from './TaskCard';
const TaskList = ({ filteredTasks, filter, deleteTask }) => {



  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }
  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <TaskCard
          deleteTask={deleteTask}
          key={task.id ?? index}
          task={task}
          index={index}
        />
      ))}
    </div>
  );
}

export default TaskList