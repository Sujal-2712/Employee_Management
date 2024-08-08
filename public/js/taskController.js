function showDescription(listItem, description, name) {
  const dialogBox = document.createElement("div");
  dialogBox.innerHTML =
    "<p class='text-sm'><span class='font-bold'>Task Description</span><br>" +
    description +
    "</p>" +
    "<span class='text-sm'>Assigned By : " +
    name +
    "</span>";
  dialogBox.classList.add("dialog-box");
  dialogBox.id = "dialog-box";
  dialogBox.style.position = "absolute";
  dialogBox.style.top = listItem.offsetTop + listItem.offsetHeight + "px";
  dialogBox.style.left = listItem.offsetLeft + "px";
  dialogBox.style.zIndex = "9999";
  listItem.appendChild(dialogBox);
}

function hideDescription() {
  const dialogBox = document.getElementById("dialog-box");
  if (dialogBox) {
    dialogBox.remove();
  }
}

document.getElementById("menuToggle").addEventListener("click", function () {
  var mobileMenu = document.getElementById("mobileMenu");
  mobileMenu.classList.toggle("hidden");
});
document.getElementById("addTask").addEventListener("click", async (event) => {
  console.log("sujal");
  event.preventDefault();

  try {
    const response = await fetch("/user/task/getAllEmployee");
    if (response.ok) {
      const employees = await response.json();
      console.log(employees);

      const employeeList = document.getElementById("employeeList");
      employeeList.innerHTML = employees
        .map(
          (item) =>
            `<option value="${item.employee_id}"> ${item.first_name} </option>`
        )
        .join("");
    }
  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
});

function loadPendingTask() {
  let pending = document.getElementById("pending-list");
  pending.innerText = "";

  let pendingReq = new XMLHttpRequest();
  pendingReq.open("GET", "/user/task/getTasks?taskStatus=pending", true);
  pendingReq.onreadystatechange = function () {
    if (pendingReq.readyState == 4 && pendingReq.status == 200) {
      let data = pendingReq.responseText;
      if (data && data !== "[]") {
        // Check if data is not empty
        const titles = JSON.parse(data);
        titles.forEach((item) => {
          pending.innerHTML += `<li class="flex items-center justify-between mb-3 border-b border-gray-300 pb-2">
            <div class="${item.taskPriority}" onmouseover="showDescription(this, '${item.taskDescription}', '${item.first_name}')" onmouseout="hideDescription()">${item.taskTitle}</div>
            <button id="${item.taskId}" onclick="forwardTask(${item.taskId}, 'working', this, loadWorkingTask)" class="bg-blue-500 text-white font-semibold py-1 px-3 rounded-full hover:bg-blue-600 transition duration-300">Forward</button>
          </li>`;
        });
      } else {
        pending.innerHTML = "No Tasks Available";
      }
    }
  };
  pendingReq.send();
}

function loadWorkingTask() {
  let working = document.getElementById("working-list");
  working.innerHTML = "";

  let workingReq = new XMLHttpRequest();
  workingReq.open("GET", "/user/task/getTasks?taskStatus=working", true);
  workingReq.onreadystatechange = function () {
    if (workingReq.readyState == 4 && workingReq.status == 200) {
      let data = workingReq.responseText;
      if (data && data !== "[]") {
        const titles = JSON.parse(data);
        titles.forEach((item) => {
          working.innerHTML += `<li class="flex items-center justify-between mb-3 border-b border-gray-300 pb-2">
            <div class="${item.taskPriority}" onmouseover="showDescription(this, '${item.taskDescription}', '${item.first_name}')" onmouseout="hideDescription()">${item.taskTitle}</div>
            <button id="${item.taskId}" onclick="forwardTask(${item.taskId}, 'complete', this, loadCompleteTask)" class="bg-blue-500 text-white font-semibold py-1 px-3 rounded-full hover:bg-blue-600 transition duration-300">Forward</button>
          </li>`;
        });
      } else {
        working.innerHTML = "No Tasks Available";
      }
    }
  };
  workingReq.send();
}

function loadCompleteTask() {
  let complete = document.getElementById("complete-list");
  complete.innerHTML = "";

  let completeReq = new XMLHttpRequest();
  completeReq.open("GET", "/user/task/getTasks?taskStatus=complete", true);
  completeReq.onreadystatechange = function () {
    if (completeReq.readyState == 4 && completeReq.status == 200) {
      let data = completeReq.responseText;
      if (data && data !== "[]") {
        const titles = JSON.parse(data);
        titles.forEach((item) => {
          complete.innerHTML += `<li class="flex items-center justify-between mb-3 border-b border-gray-300 pb-2">
            <div class="${item.taskPriority}" onmouseover="showDescription(this, '${item.taskDescription}', '${item.first_name}')" onmouseout="hideDescription()">${item.taskTitle}</div>
            <button id="${item.taskId}" onclick="forwardTask(${item.taskId}, 'review', this, loadReviewTask)" class="bg-blue-500 text-white font-semibold py-1 px-3 rounded-full hover:bg-blue-600 transition duration-300">Forward</button>
          </li>`;
        });
      } else {
        complete.innerHTML = "No Tasks Available";
      }
    }
  };
  completeReq.send();
}

function loadReviewTask() {
  let review = document.getElementById("review-list");
  review.innerHTML = "";

  let reviewReq = new XMLHttpRequest();
  reviewReq.open("GET", "/user/task/getTasks?taskStatus=review", true);
  reviewReq.onreadystatechange = function () {
    if (reviewReq.readyState == 4 && reviewReq.status == 200) {
      let data = reviewReq.responseText;
      if (data && data !== "[]") {
        const titles = JSON.parse(data);
        titles.forEach((item) => {
          review.innerHTML += `<li class="flex items-center justify-between mb-3 border-b border-gray-300 pb-2">
            <div class="${item.taskPriority}" onmouseover="showDescription(this, '${item.taskDescription}', '${item.first_name}')" onmouseout="hideDescription()">${item.taskTitle}</div>
            <div>
              <button id="${item.taskId}" onclick="forwardTask(${item.taskId}, 'done', this.parentElement)" class="bg-blue-500 text-white font-semibold py-1 px-3 rounded-full hover:bg-blue-600 transition duration-300">Done</button>
              <button id="${item.taskId}" onclick="forwardTask(${item.taskId}, 'working', this.parentElement)" class="bg-blue-500 text-white font-semibold py-1 px-3 rounded-full hover:bg-blue-600 transition duration-300">Reject</button>
            </div>
          </li>`;
        });
      } else {
        review.innerHTML = "No Tasks Available";
      }
    }
  };
  reviewReq.send();
}

function forwardTask(id, newStatus, btn, Next) {
  btn.parentElement.remove();
  let req = new XMLHttpRequest();
  req.open(
    "PATCH",
    `/user/task/updateTask/${id}?newtaskStatus=${newStatus}`,
    true
  );

  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      if (Next != null) {
        Next();
      }
    }
  };

  req.send();
}

document.getElementById("LogOutBtn").addEventListener("click", function () {
  // Function to delete a cookie by name
  function deleteCookie(name) {
    document.cookie =
      name + "=; Max-Age=0; path=/; domain=" + location.hostname;
  }

  // Delete the jwt cookie
  deleteCookie("jwt");

  // Redirect to the homepage
  window.location.href = "/";
});

setInterval(() => {
  loadPendingTask();
  loadReviewTask();
}, 10000);

window.onload = () => {
  loadPendingTask();
  loadWorkingTask();
  loadCompleteTask();
  loadReviewTask();
};
