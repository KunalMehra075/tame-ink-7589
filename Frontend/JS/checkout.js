let pre1 = document.getElementById("pre1");
let pre2 = document.getElementById("pre2");
let collapse1 = document.getElementById("collapseOne");
let collapse2 = document.getElementById("collapseTwo");
let collapse3 = document.getElementById("collapseThree");
let collapse4 = document.getElementById("collapseFour");
let clbtn1 = document.getElementById("clbtn1");
let clbtn2 = document.getElementById("clbtn2");
let clbtn3 = document.getElementById("clbtn3");
let clbtn4 = document.getElementById("clbtn4");

let cont = document.getElementById("continue");
cont.addEventListener("click", () => {
  collapse1.classList.remove("show");
  collapse2.classList.add("show");
  clbtn1.classList.add("collapsed");
  clbtn2.classList.remove("collapsed");
  clbtn1.ariaExpanded = "false";
  clbtn2.ariaExpanded = "true";
});
let paynow = document.getElementById("paynow");
paynow.addEventListener("click", () => {
  swal({
    title: "Confirm the Order?",
    text: "Payment Will Be recieved when order will be delivered.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      collapse3.classList.remove("show");
      collapse4.classList.add("show");
      clbtn3.classList.add("collapsed");
      clbtn4.classList.remove("collapsed");
      clbtn3.ariaExpanded = "false";
      clbtn4.ariaExpanded = "true";
      timerfn();
    } else {
      swal("Payment Unsuccessful");
    }
  });
});

pre1.addEventListener("click", () => {
  pre1.classList.add("activeadd");
  pre2.classList.remove("activeadd");
  swal({
    title: "Choose this Address?",
    text: "H.no 70 New Basti Ranjhi Jabalpur",
    icon: "info",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      collapse2.classList.remove("show");
      collapse3.classList.add("show");
      clbtn2.classList.add("collapsed");
      clbtn3.classList.remove("collapsed");
      clbtn2.ariaExpanded = "false";
      clbtn3.ariaExpanded = "true";
    }
  });
});
pre2.addEventListener("click", () => {
  pre2.classList.add("activeadd");
  pre1.classList.remove("activeadd");
  swal({
    title: "Choose this Address?",
    text: "Sec 2/3 Near CB Mall, Ashok Nagar Indore",
    icon: "info",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      collapse2.classList.remove("show");
      collapse3.classList.add("show");
      clbtn2.classList.add("collapsed");
      clbtn3.classList.remove("collapsed");
      clbtn2.ariaExpanded = "false";
      clbtn3.ariaExpanded = "true";
    }
  });
});

function limitText(limitField, limitNum) {
  if (limitField.value.length > limitNum) {
    limitField.value = limitField.value.substring(0, limitNum);
  }
}

function timerfn() {
  let timer = document.getElementById("timer");
  let otptime = setInterval(() => {
    let x = +timer.innerText;
    x--;
    if (x < 10) {
      x = "0" + x;
    }
    timer.innerHTML = x;
    if (x == 0) {
      clearTimeout(otptime);
      return;
    }
  }, 1000);
}
