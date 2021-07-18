
document.addEventListener('DOMContentLoaded', function () {
  var refresher = setInterval(refresh, 1000);
})

function refresh() {
  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open("GET", "refresh/",false);//TODO: Change this to true
  ajaxRequest.send();

  //console.log(ajaxRequest.response);
  //console.log(ajaxRequest.response.split(" "));
  updated_tasks = JSON.parse(ajaxRequest.response);
  //console.log(updated_tasks)
  //console.log(Object.entries(updated_tasks)[0][0]);

  //console.log(updated_tasks);
  //console.log(document.getElementById('completed-ul').childNodes);

  children = document.querySelectorAll('.draggable');
  var tasks = [];
  for (let index = 0; index < children.length; index++) {
    tasks.push(children[index].id);
  }
  // for (let index = 0; index < updated_tasks.length; index++) {
  //   //console.log(updated_tasks[index]);
  //   if (!tasks.includes(updated_tasks[index])) {
  //     console.log(updated_tasks[index]);
  //     //document.getElementById('to-be-done-ul').appendChild(document.createElement('li'));
  //     var li = document.createElement('li');

  //   }
  //}
  for (let index = 0; index < Object.entries(updated_tasks).length; index++) {
    //console.log(Object.entries(updated_tasks)[index][0]);
    if (!tasks.includes(Object.entries(updated_tasks)[index][0])) {
      console.log(Object.entries(updated_tasks)[index][0]);
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
  
    ajaxRequest.open("GET","change/"+data,true);
    ajaxRequest.send()

    //console.log(ajaxRequest.response)

  }
  
  function dropToBeDone(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //console.log(data)
    document.getElementById('to-be-done-ul').appendChild(document.getElementById(data))
  
    var ajaxRequest = new XMLHttpRequest();
  
    ajaxRequest.open("GET","change/"+data,true);
    ajaxRequest.send()

    //console.log(ajaxRequest.response)
  
  }