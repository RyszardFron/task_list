{
  let tasks = [];

  // zmienna do wykorzystania w renderButtons
  let hideDoneTasks = false;

  //dodac funkcję która przełącza hideDonetasks, tego booleana z false na true lub odwrotnie



  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };



  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    //tasks = tasks.map
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  //const toggleAllTasksDone = () => {
  //tasks = tasks.map 
  //};

  const clearInput = () => {
    document.querySelector(".js-newTask").value = "";
    document.querySelector(".js-newTask").focus();
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


  //aby nie pokazywały sie zadania należy dodać do tego htmla klase np. taskItemHide i w ccs poprzez display none ukryć te przyciski. ukryć za pomoca css-a. 



  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li class="tasksList__item">
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


  //Podobnie jak renderTasks ma zrobić jakiegoś htmla na podstawie danych tj. tasks i hideDoneTasks. po klinieciu w przycisk albo modyfikujemy zadania albo hideDoneTasks. i po tym render w celu wytworzenia nowego widoku.

  //wyłączony przycisk powinien mieć atrybut disable (nie dodajemy klasy). jeżeli chcemy stylować przycisk to stylujemy go po pseudoklasie disable która to umożliwia. nie przełaczamy pola disable tylko w funkcji która renderuj albo dodamy  atrybut disable albo nie dodamy w zależności od jakiegoś warunku.

  const renderButtons = () => {
    let htmlString = "";

    if (tasks.length > 0) {
      htmlString += `
      <button class = "buttons"> Pokaż/Ukryj ukończone </button>
      <button class = "buttons"> Ukończ wszystkie </button>
      `
    };
    
    document.querySelector(".js-buttons").innerHTML = htmlString
  };




  // renderowanie tych dwóch przycisków np. ukończ zadania, ale moze go nie być, czasem jest a czasem nie ma. jak lista zadań jest pusta to przyciski się nie wyrenderują, czyli stosujemy "if". jak go się złapie to trzeba sprawdzić czy się go dostało, jeśli tak to trzeba przypiąc evenetLisener, jesli nie to nie bo inaczej będzie błąd. przyciśniecie na przycisk ma przełączać hideDoneTasks. 
  // zdarzenia na przyciskach lisenery do przycisków
  const bindButtonsEvents = () => { };




  const render = () => {
    renderTasks();
    renderButtons();
    clearInput();

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