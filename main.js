//유저가 값을 입력한다
//+ 버튼을 클릭하면 할일이 추가됨
//Delete 버튼을 누르면 할일이 삭제 됨
//Check 버튼을 누르면 할일이 완료됨, 밑줄 생김
//진행중/끝남 탭을 누르면 언더바가 이동
//진행중/끝남 필터링

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask);

function addTask() {
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

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `<li class="task">
      <div class="task-text task-done" onclick="toggleComplete('${taskList[i].id}')">${taskList[i].taskContent}</div>
      <div>
        <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
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
