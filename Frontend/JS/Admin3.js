GetAllUsers();
GetAllReviews();
async function GetAllUsers() {
  try {
    let res = await fetch(`${baseURL}/users`, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });
    let data = await res.json();
    RenderUsers(data.data);
  } catch (error) {
    console.log(error);
  }
}
function RenderUsers(data) {
  let AllUsers = document.getElementById("AllUsers");
  data = data.map((item) => {
    return `
            <div id="ChildUsers">
           <center> <img width="100px" src="Images/icons/avatar.png" alt=""></center>
            <h5>${item.name}</h5>
            <label style="font-size:10px">ID :${item._id}</h4>
            <label style="color: grey;"> ${item.email}</label><br>
            <label>${item.gender}</label><br>
            <label for="">${item.role}</label><br>
            <label for="">Joined on : ${item.createdAt}</label><br>
            <br>
            <div id="childuserremove"><button id="manageuserbtn">Remove User</button>
            </div>
        </div>`;
  });
  AllUsers.innerHTML = data.join("");
}

async function GetAllReviews() {
  try {
    let res = await fetch(`${baseURL}/reviews`, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });
    let data = await res.json();
    RenderReviews(data.Review);
  } catch (error) {
    console.log(error);
  }
}
function RenderReviews(data) {
  let AllReviews = document.getElementById("AllReviews");
  data = data.map((item) => {
    return ` 
    <div id="ChildReview">
      <img width="30px" src="Images/icons/avatar.svg" alt="">
       <label id="revUserN">${item.UserName}</label><br>
       <label for=""><b>UserID:</b> ${item.UserID}</label><span style="color:white">---</span>
       <label for=""><b>ProductID :</b> ${item.ProductID}</label><span style="color:white">----</span>
       <label for=""><b>Type:</b>${item.Type}</label><br>
       <label id="contentRev"><b>Content:</b> ${item.ReviewBody}</label><br>
    <div id="revbuttons">
    <button><b>Like</b></button><span style="color:white">--</span>
       <button><b>Delete</b></button><span style="color:white">--</span>
       <button><b>Report</b></button></div>
       
    </div>
       `;
  });
  AllReviews.innerHTML = data.join("");
}
let ClearCart = document.getElementById("ClearCart");
ClearCart.addEventListener("click", () => {
  swal({
    title: "Verify this Order?",
    text: "This Order will be Verified.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Order Verified", {
        icon: "success",
      });
      let ManageOrderBlock = document.getElementById("ManageOrderBlock");
      ManageOrderBlock.innerHTML = `
      <h4 style="color: red;"> No More Orders for today</h4>
      
      
      `;
    } else {
      swal("Order Status Pending");
    }
  });
});
let ClearCart2 = document.getElementById("ClearCart2");
ClearCart2.addEventListener("click", () => {
  swal({
    title: "Reject this Order?",
    text: "This Order will be rejected.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Order Rejected", {
        icon: "info",
      });
      let ManageOrderBlock = document.getElementById("ManageOrderBlock");
      ManageOrderBlock.innerHTML = `
      <h4 style="color: red;"> No More Orders for today..</h4>
      
      
      `;
    } else {
      swal("Order Status Pending");
    }
  });
});
