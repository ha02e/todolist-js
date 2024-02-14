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
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `<li class="task">
      <div class="task-text task-done" onclick="toggleComplete('${taskList[i].id}')">${taskList[i].taskContent}</div>
      <div>
        <button onclick="deleteTask()">Delete</button>
      </div>
    </li>`;
    } else {
      resultHTML += `<li class="task">
      <div class="task-text" onclick="toggleComplete('${taskList[i].id}')">${taskList[i].taskContent}</div>
      <div>
        <button onclick="deleteTask()">Delete</button>
      </div>
    </li>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  // console.log("check됐음!!");
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

function deleteTask() {
  console.log("삭제!!");
}

function randomIDGenerate() {
  return Math.random().toString(36).substr(2, 16);
}
