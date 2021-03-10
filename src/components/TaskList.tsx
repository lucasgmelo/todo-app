import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    if (!newTaskTitle) return;
    const currentTask = {
      id: Math.floor(Math.random() * Math.pow(10, 10)),
      title: newTaskTitle,
      isComplete: false,
    };
    console.log(currentTask.id);
    setTasks([...tasks, currentTask]);
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    setTasks(filteredTasks);
  }

  return (
    <section className="task-list">
      <header>
        <h1>Olá, Lucas Melo</h1>
        {/* <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div> */}
      </header>

      <main>
        <section className="main-card">
          <div className="progress-data">
            <p>100%</p>
          </div>
          <div className="progress-text">
            <strong>Seu progresso</strong>
            <div>
              <strong>10/10</strong>
              <span> tasks feitas</span>
            </div>
          </div>
        </section>
        <section className="tasks-container">
          <h2>minhas tasks</h2>
          <ul>
            <li>
              <div className="completed" data-testid="task">
                <label className="checkbox-container">
                  <input type="checkbox" readOnly />
                  <span className="checkmark"></span>
                </label>
                <p>Terminar o design</p>
              </div>

              <button type="button" data-testid="remove-task-button">
                <FiTrash size={16} />
              </button>
            </li>
          </ul>
        </section>
        {/* <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul> */}
      </main>
    </section>
  );
}
