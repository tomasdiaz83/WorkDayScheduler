//aliasing the luxon class
var DateTime = luxon.DateTime;
var dt = DateTime.now().toFormat('cccc, dd MMMM');

//creating objects of tasks
var tasks = {
    hour08 : "",
    hour09 : "",
    hour10 : "",
    hour11 : "",
    hour12 : "",
    hour13 : "",
    hour14 : "",
    hour15 : "",
    hour16 : "",
    hour17 : "",
}

//obtaining stored tasks
var storedTasks = JSON.parse(localStorage.getItem(""+dt+""));
console.log(storedTasks);

//filling task object if stored
if (storedTasks) {
    Object.assign(tasks, storedTasks);
}

//setting current date element
document.querySelector("#currentDay").textContent = dt;

//setting current hour
var current = DateTime.now().toFormat('H');

//creating the time blocks from 9-5
function createTimeBlocks() {
    for (i = 8; i < 18; i++) {
        //stringify the "i" time
        x = i.toString();
        //add leading 0 if necessary
        if (x.length < 2) {
            x = "0" + x;
        }
        //create timeBlock
        $("#container").append("<div id = 'hour"+x+"' class = 'row time-block'>");
        //create hour block
        $("#hour"+x).append("<div class='col-sm-1 hour'>"+DateTime.fromISO(x+':00').toFormat("h:mm a").toLowerCase()+"</div>");
        //create TextArea
        $("#hour"+x).append('<textarea class = "col-sm-10 description"></textarea>');
        //fill task list from storage
        $("#hour"+x+" textarea").val(tasks["hour"+x+""]);
        //create save icon
        $("#hour"+x).append('<button class = "btn col-sm-1 saveBtn"><i class="fa fa-save fa-2x"></i></button>');
        if (i < current) {
            $( "#hour"+ x + " textarea" ).addClass("past");
        } else if (i == current) {
            $( "#hour"+ x + " textarea" ).addClass("present");
        } else if (i > current) {
            $( "#hour"+ x + " textarea" ).addClass("future");
        }
    }
}

//make the scheduler blocks
createTimeBlocks();

//click the button to save a task
$("button").on("click", function(e) {
    e.preventDefault();
    var hour = $(this).parent().attr("id");
    var newTasks = $("#"+hour).children().eq(1).val();
    console.log(hour);
    console.log(newTasks);
    tasks[hour] = newTasks;
    localStorage.setItem(dt, JSON.stringify(tasks));
});