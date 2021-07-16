const doc = document;
const menuOpen = doc.querySelector(".menu");
const menuClose = doc.querySelector(".close");
const overlay = doc.querySelector(".overlay");

menuOpen.addEventListener("click", () => {
  overlay.classList.add("overlay--active");
});

menuClose.addEventListener("click", () => {
  overlay.classList.remove("overlay--active");
});

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  //ev.target.appendChild(document.getElementById(data));
  document.getElementById('completed-ul').appendChild(document.getElementById(data))
}

function dropToBeDone(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  //ev.target.appendChild(document.getElementById(data));
  document.getElementById('to-be-done-ul').appendChild(document.getElementById(data))

  var ajaxRequest = new XMLHttpRequest();

  ajaxRequest.open("GET","testing",true);
  ajaxRequest.send()

  console.log(ajaxRequest.responseText);
  console.log(ajaxRequest);
  data = ajaxRequest.responseText;
  console.log(data);
  data = ajaxRequest.response;
  console.log(data);




}