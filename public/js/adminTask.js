function getAlltasks() {
    fetch("/api/tasks") // Assuming your server endpoint for fetching tasks is '/api/tasks'
      .then((response) => response.json())
      .then((tasks) => {
        console.log("Tasks received:", tasks); // Log the tasks array
        const allTasksContainer = document.getElementById("allTasks");
        allTasksContainer.innerHTML = ""; // Clear existing tasks
  
        if (tasks.length === 0) {
          allTasksContainer.innerHTML =
            '<li class="text-gray-500">No tasks available</li>';
        } else {
          tasks.forEach((task) => {
            const taskItem = document.createElement("li");
            taskItem.classList.add(
              "border",
              "p-4",
              "rounded-md",
              "flex",
              "flex-col"
            );
  
            taskItem.innerHTML = `
                          <div class="mb-2">
                              <span class="font-bold">Task ID:</span>
                              ${task.taskId}
                          </div>
                          <div class="mb-2">
                              <span class="font-bold">Assigned By:</span>
                              ${task.assigned_by_first_name}
                          </div>
                          <div class="mb-2">
                              <span class="font-bold">Assigned To:</span>
                              ${task.assigned_to_first_name}
                          </div>
                          <div class="mb-2">
                              <span class="font-bold">Current Status:</span>
                              ${task.taskCurrentStatus}
                          </div>
                          <div class="mb-2">
                              <span class="font-bold">Task Description:</span>
                              ${task.taskDescription}
                          </div>
                          
                      `;
  
            allTasksContainer.appendChild(taskItem);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }
  
  window.onload = () => {
    getAlltasks();
  };
  