import Task from "../models/Task.js";


//lay task
export const getAllTasks = async (req, res) => {

    //filter theo thời gian
    const { filter = "all" } = req.query;
    const now = new Date();
    let startDate;
    switch (filter) {
        case "today":
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case "week":
            const mondayDate = now.getDate() - now.getDay() + 1 - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            break;
        case "month":   
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case "all":
        default:
            startDate = new Date(0);
            break;
    }

    const query = startDate ? { createdAt: { $gte: startDate } } : {};

    try {
        const result = await Task.aggregate([
            { $match: query },
            {
                $facet: {
                    allTasks: [
                        { $sort: { createdAt: -1 } },


                    ],
                    totalCount: [{ $count: "count" }],
                    completCount: [{ $match: { status: "completed" } }, { $count: "count" }],
                    activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
                },
            },
        ]);

        const tasks = result[0].allTasks;
        const totalCount = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;
        const completCount = result[0].completCount[0] ? result[0].completCount[0].count : 0;
        const activeCount = result[0].activeCount[0] ? result[0].activeCount[0].count : 0;
        res.status(200).json({ tasks, totalCount, completCount, activeCount });
    } catch (error) {
        console.error("Loi khi goi getAllTasks:", error);
        res.status(500).json({ message: "Loi khi goi getAllTasks" });
    }
}
export const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Loi khi goi createTask:", error);
        res.status(500).json({ message: "Loi khi goi createTask" });
    }
}
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, status, completedAt } = req.body;
        const updateTask = await Task.findByIdAndUpdate(
            id,
            { title, status, completedAt },
            { new: true }
        );

        if (!updateTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updateTask);
    } catch (error) {
        console.error("Loi khi goi updateTask:", error);
        res.status(500).json({ message: "Loi khi goi updateTask" });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await Task.findByIdAndDelete(id);
        if (!deleteTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Loi khi goi deleteTask:", error);
        res.status(500).json({ message: "Loi khi goi deleteTask" });
    }
}