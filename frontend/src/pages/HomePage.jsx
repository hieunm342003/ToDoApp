import React, { useState, useEffect } from 'react'
import Headers from '../components/Header'
import AddTasks from '../components/AddTasks'
import StatsAndFilters from '../components/StatsAndFilters'
import TaskList from '../components/TaskList'
import TaskListPagination from '../components/TaskListPagination'
import Footer from '../components/Footer'
import DateTimeFilter from '../components/DateTimeFilter'
import { toast } from 'sonner'
import api from '../lib/axios';
import { visibleTaskLimit } from '@/lib/data'
const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [dateTimeOptions, setDateTimeOptions] = useState('all');
  const [tasksPerPage, setTasksPerPage] = useState(1);

  //load lại list khi dateTimeOptions thay đổi
  useEffect(() => {
    fetchTasks();
  }, [dateTimeOptions]);

  //lset lại list khi filter thay đổi
  useEffect(() => {
    setTasksPerPage(1);
  }, [filter,dateTimeOptions]);
  //danh sách các task sẽ được lưu trong taskBuffer
  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks?filter=' + dateTimeOptions);
      setTaskBuffer(response.data.tasks);
      setCompletedTasks(response.data.completCount);
      setActiveTasks(response.data.activeCount);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks. Please try again later.');
    }
  }
  //danh sách các task lọc
  const getFilteredTasks = () => {
    if (filter === 'active') {
      return taskBuffer.filter(task => task.status === 'active');
    } else if (filter === 'completed') {
      return taskBuffer.filter(task => task.status === 'completed');
    } else {
      return taskBuffer;
    }
  }

  //lay task tuong ung voi page hiện tai
  const visibleTasks = getFilteredTasks().slice((tasksPerPage - 1) * visibleTaskLimit, tasksPerPage * visibleTaskLimit);

  //tong page
  const totalPages = Math.ceil(getFilteredTasks().length / visibleTaskLimit);

  const handleTaskChanged = () => {
    fetchTasks();
  }

  //tang page
  const handleNextPage = () => {
    if (tasksPerPage < totalPages) {
      setTasksPerPage(prev => prev + 1);
    }
  }

  //giam page
  const handlePreviousPage = () => {
    if (tasksPerPage > 1) {
      setTasksPerPage(prev => prev - 1);
    }
  }

  //den trang bat ki
  const handlePageChange = (page) => {
    setTasksPerPage(page);
  }

  //neu tang khogn con task thì về trang trc
  if (visibleTasks.length === 0 && tasksPerPage > 1) {
    setTasksPerPage(prev => prev - 1);
  }
  
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Amber Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #f59e0b 100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />
      {/* Your Content/Components */}
      <div className="container relative z-10 pt-8 mx-auto">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          <Headers />
          <AddTasks 
          handleNewTask={handleTaskChanged} 
          />
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            completedTasksCount={completedTasks}
            activeTasksCount={activeTasks}
          />
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            deleteTask={handleTaskChanged}
          />
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination 
              currentPage={tasksPerPage} 
              totalPages={totalPages} 
              handleNextPage={handleNextPage} 
              handlePreviousPage={handlePreviousPage} 
              handlePageChange={handlePageChange}
            />
            <DateTimeFilter dateTimeOptions={dateTimeOptions} setDateTimeOptions={setDateTimeOptions} />
          </div>
          <Footer
            completedTasksCount={completedTasks} activeTasksCount={activeTasks}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
