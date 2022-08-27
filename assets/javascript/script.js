//aliasing the luxon class
var DateTime = luxon.DateTime;

//setting date
document.querySelector("#currentDay").textContent = DateTime.now().toFormat('cccc, dd MMMM');

//current hour
var current = DateTime.now().toFormat('H');
console.log(current);

//Create timeblocks
    //For loop for 9-5
    //condition for past/present/future
    //make textarea clickable, receive/submit

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
        $("#hour"+x).append('<textarea class="col-sm-10 description"></textarea>');
        //create save icon
        $("#hour"+x).append('<button class="col-sm-1 saveBtn btn"><i class="far fa-save fa-lg"></i></button>');
        if (i < current) {
            $( "#hour"+ x + " textarea" ).addClass("past");
        } else if (i == current) {
            $( "#hour"+ x + " textarea" ).addClass("present");
        } else if (i > current) {
            $( "#hour"+ x + " textarea" ).addClass("future");
        }
    }
}

createTimeBlocks();

//Fill timeblocks from local storage
//Color time blocks for past/present/future
//Allow addition of text/tasks to timeblockks
//Save text/task to local storage
