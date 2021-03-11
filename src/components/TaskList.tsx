import { useState } from "react";
import { FiTrash, FiCheckSquare } from "react-icons/fi";
import "../styles/tasklist.scss";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [addTask, setAddTask] = useState(false);

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
      </header>

      <main>
        <section className="main-card">
          <div className="progress-data">
            <p>100%</p>
          </div>
          <div className="progress-text">
            <strong>Seu progresso</strong>
            <div>
              <strong>0/{tasks.length}</strong>
              <span> tasks feitas</span>
            </div>
          </div>
        </section>
        <section className="tasks-container">
          <h2>minhas tasks</h2>
          <ul>
            {tasks.map((task) => (
              <li>
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
          </ul>
          <div className="input-group">
            <input
              type="text"
              placeholder="Adicionar nova task"
              className={addTask ? "" : "input-off"}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            {addTask ? (
              <button
                type="submit"
                data-testid="add-task-button"
                onClick={() => {
                  handleCreateNewTask();
                  setAddTask(!addTask);
                }}
              >
                <FiCheckSquare size={16} color="#fff" />
              </button>
            ) : (
              <button
                type="submit"
                data-testid="add-task-button"
                onClick={() => {
                  setAddTask(!addTask);
                }}
              >
                +
              </button>
            )}
          </div>
        </section>
      </main>
    </section>
  );
}
