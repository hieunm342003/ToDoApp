import React from 'react'
import { useState, useEffect } from 'react';
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from 'sonner';
import api from '@/lib/axios';
const AddTasks = ({handleNewTask}) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const addNewTask = async() => {
        if (!newTaskTitle.trim()) {
            toast.error('Tiêu đề nhiệm vụ không được để trống.');
            return;
        }
        try {        
            const response = await api.post('/tasks/data', { title: newTaskTitle });
            toast.success('Nhiệm vụ mới đã được thêm!');
            handleNewTask();
            setNewTaskTitle("");
            
        } catch (error) {
            console.error('Error adding new task:', error);
            toast.error('Thêm nhiệm vụ thất bại. Vui lòng thử lại .');
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addNewTask();
        }
    };
    return (
        <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                    type="text"
                    placeholder="Cần phải làm gì?"
                    className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <Button
                    variant="gradient"
                    size="xl"
                    className="px-6"
                    onClick={addNewTask}
                    disabled={!newTaskTitle.trim()}
                >
                    <Plus className="size-5" />
                    Thêm
                </Button>
            </div>
        </Card>
    )
}

export default AddTasks