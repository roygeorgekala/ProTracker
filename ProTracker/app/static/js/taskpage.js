document.addEventListener('DOMContentLoaded', function () {
  var refresher = setInterval(refresh, 5000);
})

function refresh() {

  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open("GET", window.location.href + "refresh", false);
  ajaxRequest.send();
  updated_tasks = JSON.parse(ajaxRequest.response);
  test = Object.entries(updated_tasks);
  children = document.querySelectorAll('.draggable');
  var tasks = [];
  for (let index = 0; index < children.length; index++) {
    tasks.push(children[index].id);
  }


  var recieved_tasks = [];
  for (let index = 0; index < test.length; index++) {
    recieved_tasks.push(test[index][0]);
    if (!tasks.includes(test[index][0])) {


      //Creation of the new LI object to be added
      var newLi = document.createElement("li");
      newLi.setAttribute("id", test[index][0]);
      newLi.setAttribute("class", "draggable");
      newLi.setAttribute("draggable", "true");
      newLi.style.cursor = "move";
      newLi.setAttribute("ondragstart", "drag(event)");

      var span1 = document.createElement("span");
      span1.setAttribute("class", "handle ui-sortable-handle");

      var icon1 = document.createElement("i");
      icon1.setAttribute("class", "fa fa-ellipsis-v mr-1");
      span1.appendChild(icon1);

      var icon2 = document.createElement("i");
      icon2.setAttribute("class", "fa fa-ellipsis-v mr-1");
      span1.appendChild(icon2);

      newLi.appendChild(span1);

      var span2 = document.createElement("span");
      span2.setAttribute("class", "text ml-1");
      span2.innerHTML = test[index][1][0];
      newLi.appendChild(span2);

      var small1 = document.createElement("small");
      small1.setAttribute("class", "label label-info");

      var icon3 = document.createElement("i");
      icon3.setAttribute("class", "fa fa-clock-o");
      small1.appendChild(icon3);

      title = document.createElement("span");
      title.setAttribute("id", "time");
      title.innerHTML = " " + test[index][1][1];

      console.log(test[index][1][1]);

      small1.appendChild(title);

      newLi.appendChild(small1);

      document.getElementById('to-be-done-ul').appendChild(newLi);

      //Following code to run the desktop notifications
      if (!window.Notification) {
        console.log('Browser does not support notifications.');
      } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
          // show notification here
          var notify = new Notification('New Task Assigned!', {
            body: test[index][1][0],
          });
        } else {
          // request permission from user
          Notification.requestPermission().then(function (p) {
            if (p === 'granted') {
              // show notification here
              var notify = new Notification('New Task Assigned!', {
                body: test[index][1][0],
              });
            } else {
              console.log('User blocked notifications.');
            }
          }).catch(function (err) {
            console.error(err);
          });
        }
      }

    }
  }
  //console.log(recieved_tasks);
  for (let index = 0; index < tasks.length; index++) {
    if (!recieved_tasks.includes(tasks[index])) {
      console.log(tasks[index]);
      document.getElementById(tasks[index]).remove();
    }

  }
}

function clearTasks() {
  console.log("Clearing tasks");


  children = document.getElementById("completed-ul").childNodes;
  for (let index = 0; index < children.length; index++) {
    if (children[index].nodeName == "LI") {
      var time = children[index].querySelector("#time").innerHTML;
      var timeArray = time.split(",");
      var year = parseInt(timeArray[1].substring(1));
      var month = timeArray[0].split(" ")[1];
      var date = parseInt(timeArray[0].split(" ")[2]);
      var hour = parseInt(timeArray[2].split(":")[0].substring(1));
      var minutes = parseInt(timeArray[2].split(":")[1].substring(0, 2));
      var spot = timeArray[2].split(" ")[2];
      let months = {
        "January": 0,
        "February": 1,
        "March": 2,
        "April": 3,
        "May": 4,
        "June": 5,
        "July": 6,
        "August": 7,
        "September": 8,
        "October": 9,
        "November": 10,
        "December": 11,
      };

      if (spot[0] == 'p') {
        hour += 12;
      }


      var taskdate = new Date(year, months[month], date, hour, minutes, 0, 0);


      console.log(Math.abs(new Date() - taskdate));
      if ((Math.abs(new Date() - taskdate)) > 100000) {

        var ajaxRequest = new XMLHttpRequest();

        console.log(children[index].id);
        ajaxRequest.open("GET", "del/" + String(children[index].id), true);
        ajaxRequest.send();
        children[index].remove();
      }
    }
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  //console.log(data)
  document.getElementById('completed-ul').appendChild(document.getElementById(data))
  var ajaxRequest = new XMLHttpRequest();

  ajaxRequest.open("GET", "change/" + data, true);
  ajaxRequest.send()

  //console.log(ajaxRequest.response)

}

function dropToBeDone(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  //console.log(data)
  document.getElementById('to-be-done-ul').appendChild(document.getElementById(data))

  var ajaxRequest = new XMLHttpRequest();

  ajaxRequest.open("GET", "change/" + data, true);
  ajaxRequest.send()

  //console.log(ajaxRequest.response)

}