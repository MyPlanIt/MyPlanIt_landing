document.querySelector("#phonenumber").addEventListener("focusout", (e) => {
  const val = e.target.value;
  const phonenumber = val.replace(
    /([0-9]{3})\D*([0-9]{4})\D*([0-9]{4})/,
    "$1-$2-$3"
  );
  e.target.value = phonenumber;
});

document.querySelector("#phonenumber").addEventListener("input", (e) => {
  e.target.classList.remove("warning");
});

document.querySelector("#submit").addEventListener("click", (e) => {
  const phonenumber = document.querySelector("#phonenumber");
  if (phonenumber.value.length == 0) {
    phonenumber.classList.add("warning");
  }
});

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const phoneNum = document.querySelector("#phonenumber").value;
  const job = document.querySelector("#job").value;
  const todoPlan = document.querySelector("#todoplan").value;
  const body = { phoneNum, job, todoPlan };

  fetch("https://myplanit.link/landingpage/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => {
    document.querySelector("#phonenumber").value = "";
    document.querySelector("#job").value = "";
    document.querySelector("#todoplan").value = "";

    const div = document.createElement("div");
    div.id = "popup";
    const popup = document.createElement("img");
    const exit = document.createElement("img");
    popup.src = "/public/img/popup.png";
    popup.classList.add("main");
    exit.src = "/public/img/exit.png";
    exit.id = "exit-button";
    div.appendChild(popup);
    div.appendChild(exit);
    document.body.appendChild(div);
    document.querySelector("#main").style.display = "none";
    exit.addEventListener("click", (e) => {
      document.querySelector("#main").style.display = "flex";
      popup.parentNode.removeChild(popup);
      exit.parentNode.removeChild(exit);
    });
  });
});

document.querySelector("img.main").addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

const mainImgs = document.querySelectorAll("img.main");

for (let i = 0; i < mainImgs.length; i++) {
  mainImgs[i].addEventListener("dragstart", (e) => {
    e.preventDefault();
  })
}
