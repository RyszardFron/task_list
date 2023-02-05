{
  let tasks = [];

  let hideDoneTask = false;

  const hideDoneTasks = () => {
    hideDoneTask = !hideDoneTask;
    render();
  };


  const clearInput = () => {
    document.querySelector(".js-newTask").value = "";
    document.querySelector(".js-newTask").focus();
  };


  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];

    render();
    clearInput();
  };


  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };


  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex], done: !tasks[taskIndex].done
      },
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };

  const toggleAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();

  };


  const everyTaskDone = (tasks) => {
    return tasks.every(({ done }) => done);
  };


  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };


  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li class="tasksList__item ${hideDoneTask && task.done ? "task__item--hide" : ""}">
      <button class="js-done">
      ${task.done ? "✔" : ""}
      </button>
      <span class="taskList__itemsText ${task.done ? "taskList__item--done" : ""}">
      ${task.content}
      </span> 
      <button class="js-remove">
      🗑
      </button>
    </li> `;
    };

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };


  const renderButtons = () => {
    let htmlString = "";

    if (tasks.length > 0) {
      htmlString += `
      <button class = "buttons js-hideDoneTasks"> ${hideDoneTask ? "Pokaż ukończone" : "Ukryj ukończone"} </button>
      <button class = "buttons js-doneAllButtons" ${everyTaskDone(tasks) ? "disabled" : ""}> Ukończ wszystkie </button>
      `
    };

    document.querySelector(".js-buttons").innerHTML = htmlString;
  };


  const bindButtonsEvents = () => {

    const hideTask = document.querySelector(".js-hideDoneTasks")

    if (hideTask) {
      hideTask.addEventListener("click", () => {
        hideDoneTasks();
      });
    };


    const doneAllButtons = document.querySelector(".js-doneAllButtons");
    
    if (tasks.length > 0) {
      doneAllButtons.addEventListener("click", () => {
        toggleAllTasksDone();
      });
    };
  };


  const render = () => {
    renderTasks();
    renderButtons();
   

    bindEvents();
    bindButtonsEvents();
  };


  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    };

    addNewTask(newTaskContent);
  };

  
  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();

};