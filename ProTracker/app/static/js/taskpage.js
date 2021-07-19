document.addEventListener('DOMContentLoaded', function () {
  var refresher = setInterval(refresh, 10000);
})

function refresh() {

  //console.log(ajaxRequest.response);
  //console.log(ajaxRequest.response.split(" "));
  //console.log(updated_tasks)
  //console.log(Object.entries(updated_tasks)[0][0]);

  //console.log(updated_tasks);
  //console.log(document.getElementById('completed-ul').childNodes);

  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open("GET", "refresh/", false); //TODO: Change this to true
  ajaxRequest.send();
  updated_tasks = JSON.parse(ajaxRequest.response);
  test = Object.entries(updated_tasks);
  children = document.querySelectorAll('.draggable');
  var tasks = [];
  for (let index = 0; index < children.length; index++) {
    tasks.push(children[index].id);
  }

  for (let index = 0; index < test.length; index++) {

    if (!tasks.includes(test[index][0])) {
      console.log(test[index][0]);
      console.log(test[index][1]);
      console.log(test[index][1][0]);
      console.log(test[index][1][1]);


      // if (!window.Notification) {
      //   console.log('Browser does not support notifications.');
      // } else {
      //   // check if permission is already granted
      //   if (Notification.permission === 'granted') {
      //     // show notification here
      //     var notify = new Notification('New Task Assigned!', {
      //       body: test[index][1],
      //     });
      //   } else {
      //     // request permission from user
      //     Notification.requestPermission().then(function (p) {
      //       if (p === 'granted') {
      //         // show notification here
      //         var notify = new Notification('New Task Assigned!', {
      //           body: test[index][1],
      //         });
      //       } else {
      //         console.log('User blocked notifications.');
      //       }
      //     }).catch(function (err) {
      //       console.error(err);
      //     });
      //   }
      // }

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

      var inp = document.createElement("input");
      inp.setAttribute("type", "checkbox");
      newLi.appendChild(inp);

      var span2 = document.createElement("span");
      span2.setAttribute("class", "text ml-1");
      span2.innerHTML = test[index][1][0];
      newLi.appendChild(span2);

      var small1 = document.createElement("small");
      small1.setAttribute("class", "label label-info");

      var icon3 = document.createElement("i");
      icon3.setAttribute("class", "fa fa-clock-o");
      small1.appendChild(icon3);

      var date_created = test[index][1][1];
      console.log(date_created);
      var time = document.createTextNode(date_created);
      small1.appendChild.time;

      newLi.appendChild(small1);

      document.getElementById('to-be-done-ul').appendChild(newLi);

    }


  }
}


// function notifyMe() {
//     if (!window.Notification) {
//         console.log('Browser does not support notifications.');
//     } else {
//         // check if permission is already granted
//         if (Notification.permission === 'granted') {
//             // show notification here
//             var notify = new Notification('New Task', {
//                 body: 'Task1',
//             });
//         } else {
//             // request permission from user
//             Notification.requestPermission().then(function (p) {
//                 if (p === 'granted') {
//                     // show notification here
//                     var notify = new Notification('New Task', {
//                         body: 'Task1',
//                     });
//                 } else {
//                     console.log('User blocked notifications.');
//                 }
//             }).catch(function (err) {
//                 console.error(err);
//             });
//         }
//     }
// }

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