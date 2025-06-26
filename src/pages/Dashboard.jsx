import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import "../styles/Dashboard.css";

const STATUSES = [
  { id: "pending", label: "En attente" },
  { id: "inprogress", label: "En cours" },
  { id: "done", label: "Terminé" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [user, setUser] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("taskflow_user"));
    if (!userData) {
      navigate("/login");
      return;
    }

    setUser(userData);
    setTasks(JSON.parse(localStorage.getItem("taskflow_tasks")) || []);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("taskflow_user");
    navigate("/login");
  };

  const addTask = () => {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      status: "pending",
    };

    const updated = [newTask, ...tasks];
    setTasks(updated);
    localStorage.setItem("taskflow_tasks", JSON.stringify(updated));
    setTaskTitle("");
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    let newStatus = STATUSES.some((s) => s.id === over.id) ? over.id : null;

    if (!newStatus) {
      const overEl = document.getElementById(over.id);
      const colEl = overEl?.closest(".column");
      newStatus = colEl?.id || null;
    }

    if (!newStatus || newStatus === activeTask.status) return;

    const updatedTasks = tasks.map((t) =>
      t.id === active.id ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem("taskflow_tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="dashboard">
      <div className="header">
        <div className="header-left">
          <img src="/tasks.png" alt="Logo TaskFlow" className="logo" />
          <h1 className="app-title">TaskFlow – Dashboard</h1>
        </div>
        <button onClick={logout} className="btn-logout">
          Déconnexion
        </button>
      </div>

      {user && (
        <p className="user-greeting">
          Bonjour {user.prenom || ""} {user.nom || ""} 👋
        </p>
      )}

      <div className="task-input">
        <input
          type="text"
          placeholder="Nouvelle tâche…"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button onClick={addTask} className="btn-add">
          Ajouter
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban">
          {STATUSES.map(({ id, label }) => (
            <Column
              key={id}
              id={id}
              label={label}
              tasks={tasks.filter((t) => t.status === id)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

function Column({ id, label, tasks }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      id={id}
      className={`column ${id} ${isOver ? "is-over" : ""}`}
    >
      <h2>{label}</h2>
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}

function Task({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      id={task.id}
      className="task"
      style={style}
      {...attributes}
      {...listeners}
    >
      {task.title}
    </div>
  );
}
