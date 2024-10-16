// set variables
let inputfield = document.getElementById("input");
let btn1 = document.getElementById("btn");
let listfield = document.getElementById("list");
let currentEditTask; // Variable to keep track of the task being edited

// Function to show notification messages
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message; // Set the message
    notification.style.display = "block"; // Show the notification
    setTimeout(() => {
        notification.style.display = "none"; // Hide after1 seconds
    }, 1000);
}

// //////////////////////////////////////////////////////////////////
function addtask() {
    if (inputfield.value === "") {
        alert("Please add text");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputfield.value;

        // Create the delete (×) span
        let span = document.createElement("span");
        span.classList.add("span1");
        span.innerHTML = "\u00d7";

        // Create the edit (✏) span
        let edit = document.createElement("span");
        edit.classList.add("span2");
        edit.innerHTML = "\u270F";

        // Append spans to the list item
        li.appendChild(span);
        li.appendChild(edit);
        listfield.appendChild(li); // Append the list item to the list

        // Show notification for adding
        showNotification("Task added successfully!");

        inputfield.value = ""; // Clear input field
        save(); // Save the updated list
    }
}

btn1.addEventListener("click", addtask);

// ////////////////////////////////////////////
// checked, remove, or edit
listfield.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked"); // Toggle checked class
      save();
      showNotification("done");

    } else if (e.target.className === "span1") { // For delete button
      e.target.parentElement.remove(); // Remove the list item
      save();
      showNotification("Task removed successfully!");

    } else if (e.target.className === "span2") { // For edit button
      let taskText = e.target.parentElement.firstChild; // Get the task text (the first child)
      let newTaskText = prompt("Edit your task:", taskText.textContent); // Prompt for new task text
      if (newTaskText) { // If the user entered new text
        taskText.textContent = newTaskText; // Update the task text
        save(); // Save the updated list
        showNotification("task edited successfully!");

      }
    }
  });
  
// ////////////////////////////////////////////
// save tasks
function save() {
    localStorage.setItem("data", listfield.innerHTML);
}

// ///////////////////////////////////////////////
// show tasks
function show() {
    listfield.innerHTML = localStorage.getItem("data");
}

show();
