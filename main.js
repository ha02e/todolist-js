let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask);

function addTask() {
  if (taskInput.value == "") {
    alert("할일을 입력해주세요.");
    taskInput.focus();
  } else {
    let task = {
      id: randomIDGenerate(),
      taskContent: taskInput.value,
      isComplete: false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
    taskInput.value = "";
  }
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `<li class="task">
      <div class="task-text task-done" onclick="toggleComplete('${taskList[i].id}')">${taskList[i].taskContent}</div>
      <div>
        <button class="delete-btn" onclick="deleteTask('${taskList[i].id}')"></button>
      </div>
    </li>`;
    } else {
      resultHTML += `<li class="task">
      <div class="task-text" onclick="toggleComplete('${taskList[i].id}')">${taskList[i].taskContent}</div>
      <div>
        <button class="delete-btn" onclick="deleteTask('${taskList[i].id}')"></button>
      </div>
    </li>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log(id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id) {
  if (!confirm("삭제하시면 복구할 수 없습니다.\n정말 삭제하시겠습니까?")) {
    return false;
  }
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function randomIDGenerate() {
  return Math.random().toString(36).substr(2, 16);
}

function enterKey() {
  if (window.event.keyCode == 13) {
    addTask();
  }
}
