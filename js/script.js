{

  const tasks = [
    {
      content: "test1",
      done: false,
    },
    {
      content: "test2",
      done: true,
    },
  ];


  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li class="tasksList__toDo--next"
      ${task.done ? "style=\"text-decoration: line-through\"" : ""}>
      <button class="js-done">✔</button>
      ${task.content} 
      <button class="js-remove">🗑</button>
    </li>
    `;
    };

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();

};