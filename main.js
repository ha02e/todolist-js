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
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="task">
    <div>${taskList[i]}</div>
    <div>
      <button>Check</button>
      <button>Delete</button>
    </div>
  </div>`;
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}
