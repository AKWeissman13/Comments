let form = document.forms.newComment;
let dateChoice = form.dateChoice;
let date = form.date;
let comment = form.comment;
let submit = form.submit;
let userName = form.userName;
const comments = document.querySelector("[data-comments]");
let likes = document.querySelectorAll(".like");
let dels = document.querySelectorAll(".delete");
let inputs = document.querySelectorAll("form input");
inputs.forEach((input) => {
  input.onkeydown = function (e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };
});
focus = [userName, comment];

function del(element) {
  element.parentElement.parentElement.remove();
}
function like(element) {
  if (element.getAttribute("src") == "imgs/unlike.svg") {
    element.setAttribute("src", "imgs/like.svg");
  } else {
    element.setAttribute("src", "imgs/unlike.svg");
  }
}

focus.forEach((element) => {
  element.onfocus = function () {
    element.setAttribute("id", "valid");
  };
});

dateChoice.addEventListener("click", () => {
  if (dateChoice.checked == true) {
    date.style.display = "block";
  } else {
    date.style.display = "none";
  }
});

submit.onclick = function () {
  var tempDiv = document.createElement("div");
  tempDiv.classList.add("post__old-comment");
  if (validate() == true) {
    addComment(tempDiv);
    clear();
  } else {
    clear();
  }
};

comment.onkeydown = function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    var tempDiv = document.createElement("div");
    tempDiv.classList.add("post__old-comment");
    if (validate() == true) {
      addComment(tempDiv);
      clear();
    } else {
      clear();
    }
  }
};
function validate() {
  if ((userName.value != "") & (comment.value != "")) {
    return true;
  } else {
    userName.value == ""
      ? userName.setAttribute("id", "invalid")
      : userName.setAttribute("id", "valid");
    comment.value == ""
      ? comment.setAttribute("id", "invalid")
      : comment.setAttribute("id", "valid");
    return false;
  }
}
function addComment(tempDiv) {
  let lastComment = comments.children[comments.children.length - 1];
  let a = new Date();
  let time = "";
  var month = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Майя",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Ноября",
    "Декабря",
  ];
  let d = new Date();

  if ((date.value != "") & (dateChoice.checked == true)) {
    d = new Date(date.value);
  } else {
    d = new Date();
  }
  if ((d.getFullYear() == a.getFullYear()) & (d.getMonth() == a.getMonth())) {
    if (d.getDate() == a.getDate()) {
      time = "Сегодня в " + ("0" + a.getHours()).slice(-2) + ":" + ("0" + a.getMinutes()).slice(-2);
    } else if (d.getDate() == a.getDate() - 1) {
      time = "Вчера в " + ("0" + a.getHours()).slice(-2) + ":" + ("0" + a.getMinutes()).slice(-2);
    } else {
      time =
        d.getDate() +
        " " +
        month[d.getMonth() - 1] +
        " в " +
        ("0" + a.getHours()).slice(-2) +
        ":" +
        ("0" + a.getMinutes()).slice(-2);
    }
  } else {
    time =
      d.getDate() +
      " " +
      month[d.getMonth() - 1] +
      " " +
      d.getFullYear() +
      " года" +
      " в " +
      ("0" + a.getHours()).slice(-2) +
      ":" +
      ("0" + a.getMinutes()).slice(-2);
  }
  tempDiv.innerHTML = `<div class="user__img-block">
  <div class="user__img">
  </div>
  </div>
  <div class="post__old-comment-content">
  <a href="#" class="user__name">${userName.value}</a>
  <p class="post__text">${comment.value}</p>
  <p class="user__date">${time}</p>
  </div>
  <div class="post__action-icons">
  <img src="imgs/bin.svg" alt="" class="delete" onclick="del(this)">
  <img src="imgs/unlike.svg" alt="" class="like" onclick="like(this)">
  </div>
  `;
  lastComment.insertAdjacentElement("beforeBegin", tempDiv);
}

function clear() {
  userName.value = "";
  comment.value = "";
  date.value = "";
  date.style.display = "none";
  dateChoice.checked = false;
}
