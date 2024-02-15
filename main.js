let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");

let taskList = [];
let filterList = [];
let mode = "all";

addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

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
    //console.log(taskList);
    render();
    taskInput.value = "";
  }
}

function render() {
  //내가 선택한 탭에 따라서 리스트를 다르게 보여준다.
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<li class="task">
      <div class="task-text task-done" onclick="toggleComplete('${list[i].id}')">${list[i].taskContent}</div>
      <div>
        <button class="delete-btn" onclick="deleteTask('${list[i].id}')"></button>
      </div>
    </li>`;
    } else {
      resultHTML += `<li class="task">
      <div class="task-text" onclick="toggleComplete('${list[i].id}')">${list[i].taskContent}</div>
      <div>
        <button class="delete-btn" onclick="deleteTask('${list[i].id}')"></button>
      </div>
    </li>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  //console.log(id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  //console.log(taskList);
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

function filter(event) {
  mode = event.target.id;
  filterList = [];

  if (mode === "all") {
    //전체 리스트
    render();
  } else if (mode === "ongoing") {
    //진행중 리스트
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    //완료 리스트
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return Math.random().toString(36).substr(2, 16);
}

function enterKey() {
  if (window.event.keyCode == 13) {
    addTask();
  }
}
