document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    
    var taskName = document.getElementById('taskName').value;
    var taskDuration = document.getElementById('taskDuration').value;
    var taskBreak = document.getElementById('taskBreak').value;
    
   
    addTaskToSchedule(taskName, taskDuration, taskBreak);

   
    var taskListItem = document.createElement('li');
    taskListItem.classList.add('task-item');
    taskListItem.innerHTML = `
    <div class="task-name">Task: ${taskName}</div>
    <div class="task-duration">Duration: ${taskDuration} mins</div>
    <div class="task-break">Break: ${taskBreak} mins</div>
`;

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'x';
    deleteButton.classList.add('delete-button');
    taskListItem.insertBefore(deleteButton, taskListItem.firstChild);
    deleteButton.addEventListener('click', function() {

    schedule = schedule.filter(task => task !== task);


    taskList.removeChild(taskListItem);
});


taskListItem.appendChild(deleteButton);


   
    document.getElementById('taskList').appendChild(taskListItem);

    
    document.getElementById('taskName').value = '';
    document.getElementById('taskDuration').value = '';
    document.getElementById('taskBreak').value = '';
});

document.getElementById('startNowButton').addEventListener('click', function() {
  
    document.getElementById('scheduleDisplay').innerHTML = '';

    
    startSchedule();
});

var schedule = [];

function addTaskToSchedule(taskName, taskDuration, taskBreak) {

    schedule.push({
        name: taskName,
        duration: taskDuration,
        break: taskBreak
    });
}

function startSchedule() {

    var currentTime = new Date();

    // Loop through the schedule and add each task to the schedule display
    for (var i = 0; i < schedule.length; i++) {
        var task = schedule[i];
        
        // Create a div for the task
        var taskDiv = document.createElement('div');
        // calculate task start time and end time
        var taskStart = new Date(currentTime);
        var taskEnd = new Date(currentTime.getTime() + task.duration * 60000);

        taskDiv.innerHTML = task.name + ' Start: ' + taskStart.toLocaleTimeString() + ' End: ' + taskEnd.toLocaleTimeString();
        taskDiv.classList.add('schedule-item');  // Add a class for styling
taskDiv.innerHTML = `
    <div class="schedule-task-name">Task: ${task.name}</div>
    <div class="schedule-task-start">Start: ${taskStart.toLocaleTimeString()}</div>
    <div class="schedule-task-end">End: ${taskEnd.toLocaleTimeString()}</div>
`;
    
        // Add the task div to the schedule display
        document.getElementById('scheduleDisplay').appendChild(taskDiv);
        
        // Update the current time for the next task (including the break time)
        currentTime = new Date(taskEnd.getTime() + task.break * 60000);
    }
}

// Make the task list sortable with Sortable.js
new Sortable(document.getElementById('taskList'), {
    animation: 150,
    onEnd: function(evt) {
        var item = schedule[evt.oldIndex];
        schedule.splice(evt.oldIndex, 1);
        schedule.splice(evt.newIndex, 0, item);
    }
});

document.getElementById('clearTasksButton').addEventListener('click', function() {
    // Clear the schedule array
    schedule = [];

    // Clear the task list items from the DOM
    var taskList = document.getElementById('taskList');
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
});
