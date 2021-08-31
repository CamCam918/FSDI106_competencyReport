important = true;
formVisible = true;
serverURL = "https://fsdiapi.azurewebsites.net/";
myTasks = [];

function toggleImportant() {
  if (important) {
    $("#iImportant").removeClass("fas").addClass("far");
    important = false;
  } else {
    $("#iImportant").removeClass("far").addClass("fas");
    important = true;
  }
}

function saveTask() {
  let title = $("#txtTitle").val();
  let dueDate = $("#selDate").val();
  let location = $("#txtLocation").val();
  let priority = $("#selPriority").val();
  let color = $("#selColor").val();
  let contactP = $("#txtPhone").val();
  let contactE = $("#txtEmail").val();
  let description = $("#txtDescription").val();
  let task = new Task(
    title,
    important,
    dueDate,
    location,
    priority,
    color,
    contactP,
    contactE,
    description
  );
  console.log(task);
  $.ajax({
    type: "POST",
    url: serverURL + "api/tasks/",
    data: JSON.stringify(task), //from obj to string
    contentType: "application/json",
    success: function (res) {
      console.log("Server says", res);

      let t = JSON.parse(res); //from string to obj
      displayTask(t);
    },
    error: function (error) {
      console.error("Error saving task", error);
    },
  });
  clearInputs();
  // displayTask(task);

  //get the value
  //
}

function displayTask(task) {
  let iClass = "";
  if (task.important) {
    iClass = "fas fa-star";
  } else {
    iClass = "far fa-star";
  }

  let btn = "";

  if (!task.done) {
    //if not done
    btn = `<button onClick="doneTask('${task._id}')" id="doneBtn" class="btn btn-sm btn-dark">Done</button>`;
  }

  let syntax = `<div id="${task._id}" class="myTask " style="border-bottom: 4px solid ${task.color}">
    <i class="${iClass}" style="color:${task.color}"></i>
      <div class="info">
        <h4>${task.title}<h5/>
        <p>${task.description}</p>
      </div>
    <label>${task.location}</label><br>
    <label>${task.contactP}<br>${task.contactE}</label><br>
    <label>${task.dueDate}</label>
    ${btn}
    </div>`;

  if (task.done) {
    $(".done-tasks").append(syntax);
  } else {
    $(".pending-tasks").append(syntax);
  }
}

function doneTask(id) {
  console.log("Mark as done", id);
  $("#" + id).remove();

  // find the obj
  for (let i = 0; i < myTasks.length; i++) {
    let task = myTasks[i];
    if (task._id === id) {
      console.log("found it", task);

      task.done = true;

      $.ajax({
        type: "PUT",
        url: serverURL + "api/tasks",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function (res) {
          displayTask(task);
        },
        error: function (err) {
          console.error("Error updating task", err);
        },
      });
    }
  }
}

function fetchTasks() {
  $.ajax({
    type: "GET",
    url: serverURL + "api/tasks",
    success: function (res) {
      let allTasks = JSON.parse(res);
      //travel array
      for (let i = 0; i < allTasks.length; i++) {
        //get each task inside array
        let task = allTasks[i];
        //iff the task belongs to me:
        if (task.name === "CameronCH21") {
          myTasks.push(task);
          displayTask(task);
        }
      }

      //      :send to display
    },
    error: function (error) {
      console.error("Error getting data", error);
    },
  });
}

function clearInputs() {
  $("#txtTitle").val("");
  // $("#iImportant").val("");
  $("#selDate").val("");
  $("#txtLocation").val("");
  $("#selPriority").val("");
  $("#selColor").val("#000000");
  $("#txtPhone").val("");
  $("#txtEmail").val("");
  $("#txtDescription").val("");
}
function toggleForm() {
  $("#hideForm").click($(".section-form").toggle(300));
}
function clearAll() {
  $.ajax({
    type: "DELETE",
    url: serverURL + "api/tasks/clear/CameronCH21",
    success: function (res) {
      console.log(res);
      alert("your tasks were cleared");
    },
    error: function (err) {
      console.error("Error clearing Tasks", err);
    },
  });
}

// function toggleForm(){
//   $("#toggleForm").text($(".section-form").toggle(300))
// }

function init() {
  console.log("Calendar System");
  fetchTasks();
  // load data

  //hook events
  $("#iImportant").click(toggleImportant);
  $("#btnSave").click(saveTask);
  $("#toggleForm").click(toggleForm);
  $("#clearTasks").click(clearAll);
  // $("#doneBtn").click(doneTask);
}

window.onload = init;

/*
Delete Request to:
serverURL + "api/tasks/clear/CameronCH21"
show a confirmation message
*/
