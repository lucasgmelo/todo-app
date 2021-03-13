import { useEffect, useState } from "react";
import { FiTrash, FiCheckSquare } from "react-icons/fi";
import useMedia from "../hooks/useMedia";
import "../styles/tasklist.scss";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

interface TaskListProps {
  user: string;
  github: string;
}

export function TaskList(props: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [addTask, setAddTask] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [percentual, setPercentual] = useState(0);
  const large = useMedia("(min-width: 62.5rem)");
  const [photo, setPhoto] = useState("");

  const data = (canvas: any) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 100, 200);
    gradient.addColorStop(0, "#f29682 ");
    gradient.addColorStop(1, "#ee69ac");

    return {
      datasets: [
        {
          data: [percentual, 100 - percentual],
          backgroundColor: [gradient, "transparent"],
          borderColor: [gradient, "transparent"],
        },
      ],
    };
  };

  useEffect(() => {
    getCompletedTasks();
  }, [tasks]);

  useEffect(() => {
    setPercentual(getProgress(completedTasks.length, tasks.length));
  }, [handleToggleTaskCompletion]);

  const getUser = (user: string) => {
    const res = axios
      .get(
        `
    https://api.github.com/users/${user}`
      )
      .then((res) => {
        setPhoto(res.data.avatar_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser(props.github);
  }, []);

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
    const myPercentual = Math.floor((complete / total) * 100);
    if (Number.isNaN(myPercentual)) return 0;
    return myPercentual;
  }

  return (
    <section className="task-list">
      <header className={large && "desktop-bg"}>
        <div>
          {large && (
            <div className="profile-photo">
              <img src={photo !== "" ? photo : "profile.svg"} alt="" />
            </div>
          )}
          <h1>Olá, {props.user}!</h1>
        </div>
        <section className="main-card">
          <Doughnut
            data={data}
            options={{
              cutoutPercentage: 80,
              events: ["none"],
              maintainAspectRatio: false,
            }}
          />
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
            <img src="medium_logo.svg" alt="" />
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
