import { useEffect, useState } from "react";
import { FiTrash, FiCheckSquare } from "react-icons/fi";
import useMedia from "../hooks/useMedia";
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
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const large = useMedia("(min-width: 62.5rem)");

  useEffect(() => {
    getCompletedTasks();
  }, [tasks]);

  function getCompletedTasks() {
    const tasksCompleted = tasks.filter((task) => task.isComplete !== false);
    setCompletedTasks(tasksCompleted);
  }

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

  function getProgress(complete: number, total: number) {
    const percentual = Math.floor((complete / total) * 100);
    if (Number.isNaN(percentual)) return 0;
    return percentual;
  }

  return (
    <section className="task-list">
      <header className={large && "desktop-bg"}>
        <div>
          {large && (
            <div>
              <img src="icons/profile.svg" alt="" />
            </div>
          )}
          <h1>Olá, Lucas Melo!</h1>
        </div>
        <section className="main-card">
          <div className="progress-data">
            <p>{getProgress(completedTasks.length, tasks.length)}%</p>
          </div>
          <div className="progress-text">
            <strong>Seu progresso</strong>
            <div>
              <strong>
                {completedTasks.length}/{tasks.length}
              </strong>
              <span> tasks feitas</span>
            </div>
          </div>
        </section>
        {large && (
          <footer>
            <img src="icons/medium_logo.svg" alt="" />
            <div>
              <strong>do it!</strong>
              <p>seu to do app favorito :)</p>
            </div>
          </footer>
        )}
      </header>
      <main>
        <section className="tasks-container">
          <h2 className={large && "desktop-title"}>Minhas tasks</h2>
          <div
            className={
              large ? `${"input-group"} ${"desktop-button"}` : "input-group"
            }
          >
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
        </section>
      </main>
    </section>
  );
}
