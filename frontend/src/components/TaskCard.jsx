import React from 'react'
import { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";
const TaskCard = ({ task, index ,deleteTask}) => {

  const [isEditting, setIsEditting] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title || "");
  const handledeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/data/${taskId}`);
      toast.success('Xoa task thanh cong');
      deleteTask();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Xoa task that bai. Vui long thu lai.');
    }
  }

  const updateTask = async () => {
    try {
      await api.put(`/tasks/data/${task._id}`, { title: taskTitle });
      toast.success('Cap nhat task thanh cong');
      deleteTask();
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Cap nhat task that bai. Vui long thu lai.');
    }
  };

  const toggleTaskStatus = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/data/${task._id}`, { status: "completed", completedAt: new Date().toISOString() });
        toast.success('Task đã được đánh dấu là hoàn thành!');
      } else {
        await api.put(`/tasks/data/${task._id}`, { status: "active", completedAt: null });
        toast.success('Task đã được đánh dấu là đang hoạt động!');
      }

      deleteTask();
      
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Cap nhat task that bai. Vui long thu lai.');
    }
  };
  return (

    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* nút tròn */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}

          onClick={toggleTaskStatus}

        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* hiển thị hoặc chỉnh sửa tiêu đề */}
        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="Cần phải làm gì?"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              onChange={(e) => {
                setTaskTitle(e.target.value || "");
              }}
              value={taskTitle}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setIsEditting(false);
                  updateTask(task._id, taskTitle);
                }
              }}
              onBlur={() => {
                setIsEditting(false);
                setTaskTitle(task.title || "");
              }}

            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}

          {/* ngày tạo & ngày hoàn thành */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* nút chỉnh và xoá */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* nút edit */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditting(true);
              setTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>

          {/* nút xoá */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => handledeleteTask(task._id)} 

          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default TaskCard