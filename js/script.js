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
    <li 
    ${task.done ? "style=\"text-decoration: line-through\"" : ""}> 
    <button class="js-done">zrobione</button>
    ${task.content} 
    <button class="js-remove">usuń</button>
    <hr class="line">
    </li>
    `;
  };

  document.querySelector(".js-tasks").innerHTML = htmlString;
}

render()

}