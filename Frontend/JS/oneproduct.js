let ProductID = sessionStorage.getItem("oneproduct");
let Initiator = JSON.parse(sessionStorage.getItem("current-user"));
let mainimg = document.getElementById("mainimgX");
let img2 = document.getElementById("img2X");
let img3 = document.getElementById("img3X");
let img4 = document.getElementById("img4X");
let brc2 = document.getElementById("brc2");
let brc3 = document.getElementById("brc3");
let brc4 = document.getElementById("brc4");
let SixCardParent = document.getElementById("SixCardParent");
let PostReview = document.getElementById("PostReview");
let PostQuestion = document.getElementById("PostQuestion");
let review = document.getElementById("review-body");
let question = document.getElementById("question-body");
let Youtube = document.getElementById("Youtube");
let overtitle = document.getElementById("overtitle");
let title = document.getElementById("title");
let redprice = document.getElementById("redprice");
let off = document.getElementById("off");
let YouMayAlso = document.getElementById("SixCardParent");
let description = document.getElementById("description");

let DisplayDataID = sessionStorage.getItem("oneproduct");
async function FetchProduct(id) {
  try {
    let res = await fetch(`${baseURL}/products?_id=${id}`);
    let data = await res.json();
    RenderData(data.Products[0]);
  } catch (error) {
    console.log(error);
  }
}
FetchProduct(DisplayDataID);
function RenderData(obj) {
  mainimg.setAttribute("src", obj.thumbnail);
  img2.setAttribute("src", obj.images[0]);
  img3.setAttribute("src", obj.thumbnail);
  img4.setAttribute("src", obj.images[1]);
  img2.addEventListener("click", () => {
    mainimg.setAttribute("src", obj.images[0]);
  });
  img3.addEventListener("click", () => {
    mainimg.setAttribute("src", obj.thumbnail);
  });
  img4.addEventListener("click", () => {
    mainimg.setAttribute("src", obj.images[1]);
  });
  brc4.innerText = obj.title.substring(0, 38);
  description.innerText = obj.description;
  overtitle.innerText = obj.title;
  title.innerText = obj.title;
  redprice.innerText = `₹ ${obj.price}`;
  off.innerText = `(${obj.discount}% Off)`;
  FetchReviewsAndQuestions(obj._id);
  YouMayAlsoLike(obj.type);
  PostReview.addEventListener("click", () => {
    if (!Initiator) {
      swal(
        "Please Login First!",
        "In Order to post review please login first",
        "info"
      );
      return;
    } else {
      let Review = {
        ProductID: obj._id,
        UserID: Initiator._id,
        UserName: Initiator.name,
        Type: "Review",
        ReviewBody: review.value,
      };
      PostReviewRoute(Review);
    }
  });
  PostQuestion.addEventListener("click", () => {
    if (!Initiator) {
      swal(
        "Please Login First!",
        "In Order to post review please login first",
        "info"
      );
      return;
    } else {
      let Question = {
        ProductID: obj._id,
        UserName: Initiator.name,
        UserID: Initiator._id,
        Type: "Question",
        ReviewBody: question.value,
      };
      PostReviewRoute(Question);
    }
  });
}
async function PostReviewRoute(review) {
  let x = review.Type;
  try {
    let res = await fetch(`${baseURL}/reviews/post`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify(review),
    });
    let data = await res.json();
    console.log(data);
    swal("Done!", `Added ${x} Successfully `, "success");
    FetchReviewsAndQuestions(review.ProductID);
  } catch (error) {
    swal("Something went wrong.", `Unable to post ${x}`, "error");
    console.log(error);
  }
}
async function YouMayAlsoLike(type) {
  try {
    let res = await fetch(`${baseURL}/products?type=${type}`, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });
    let data = await res.json();
    RenderYouMayAlso(data.Products);
  } catch (error) {
    console.log(error);
  }
}
function RenderYouMayAlso(data) {
  data = data
    .map((item) => {
      return `
      <div>
      <img
        src="${item.thumbnail}"
        alt=""
      />
      <p style="color: grey">${item.title}</p>
      </div>`;
    })
    .join(" ");
  SixCardParent.innerHTML = data;
  Youtube.innerHTML = data;
}
async function FetchReviewsAndQuestions(id) {
  try {
    let res = await fetch(`${baseURL}/reviews?ProductID=${id}`);
    let data = await res.json();
    RenderReviewsAndQuestions(data.Review);
  } catch (error) {
    console.log(error);
  }
}
function RenderReviewsAndQuestions(data) {
  let revcontainer = document.getElementById("revcont");
  let quecontainer = document.getElementById("quecont");
  let ex = [...data];
  let Reviews = data.filter((item) => {
    return item.Type == "Review";
  });
  let Questions = ex.filter((item) => {
    return item.Type == "Question";
  });
  Reviews = Reviews.map((item) => {
    return `
    <div class="ChildReviews">
    <img width="40px" src="Images/icons/avatar1.png" alt="">
    <b><label style="color: rgb(22, 124, 47);">${item.UserName}</label></b>
    <div> <textarea rows="1" class="ReviewBodyInp" readonly/>${
      item.ReviewBody
    }</textarea></div>
    <div><label data-id=${item._id}  class="editcomment revbtns">Edit</label>
    <label class="deletecomment revbtns" data-id=${item._id} >Delete</label> 
                  <label class="donecomment revbtns" data-id=${
                    item._id
                  } >Done</label> 
                  <label class="likers revbtns"  >Likes : ${Math.floor(
                    Math.random() * 100
                  )} </label> <label><img width="16px" src="Images/icons/heart.png" alt="">
                  </label>
                  </div>
                  </div>
    `;
  }).join(" ");
  Questions = Questions.map((item) => {
    return `
    <div class="ChildReviews">
                  <img width="40px" src="Images/icons/avatar1.png" alt="">
                  <b><label style="color: rgb(189, 108, 108);">${item.UserName}</label></b>
                  
                  <div> <textarea rows="1" class="ReviewBodyInp" readonly/>${item.ReviewBody}</textarea></div>
                  <div><label data-id=${item._id}  class="editcomment revbtns">Edit</label>
                 
                  <label class="deletecomment revbtns" data-id=${item._id} >Delete</label> 
                  <label class="donecomment revbtns" data-id=${item._id} >Done</label> 
                  </div>
                  
                  </div>

    `;
  });

  revcontainer.innerHTML = Reviews;
  quecontainer.innerHTML = Questions;
  let Editors = document.getElementsByClassName("editcomment");
  let Deleters = document.getElementsByClassName("deletecomment");
  let Donners = document.getElementsByClassName("donecomment");
  let Likers = document.getElementsByClassName("likers");

  for (const del of Deleters) {
    del.addEventListener("click", async (e) => {
      if (!Initiator) {
        swal(
          "Please Login First!",
          "You cannot edit comment without loggin in!",
          "info"
        );
        return;
      }
      if (!(await VerifyId(e.target.dataset.id))) {
        // "warning","success","error","info"
        swal(
          "You are not Authorized",
          "You cannot modify other's reviews!",
          "error"
        );
        return;
      }
      swal({
        title: "Are you sure?",
        text: "Do you want to delete your comment?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          FetchDeleteReview(e.target.dataset.id);
        } else {
          swal("Your comment is not deleted");
        }
      });
    });
  }
  for (const edit of Editors) {
    edit.addEventListener("click", async (e) => {
      if (!Initiator) {
        swal(
          "Please Login First!",
          "You cannot edit comment without loggin in!",
          "info"
        );
        return;
      }
      if (!(await VerifyId(e.target.dataset.id))) {
        // "warning","success","error","info"
        swal(
          "You are not Authorized",
          "You cannot modify other's reviews!",
          "error"
        );
        return;
      }
      let inp = e.target.parentElement.parentElement.children[2].children[0];
      inp.removeAttribute("readonly");
      inp.classList.add("redborder");
      e.target.parentElement.children[2].style.display = "inline-block";
    });
  }
  for (const done of Donners) {
    done.addEventListener("click", (e) => {
      let inp = e.target.parentElement.parentElement.children[2].children[0];
      let ReviewBody = inp.value;
      let payload = { ReviewBody };
      inp.setAttribute("readonly", true);
      inp.classList.remove("redborder");
      FetchEditReview(e.target.dataset.id, payload);
    });
  }
}
async function FetchEditReview(id, payload) {
  try {
    let res = await fetch(`${baseURL}/reviews/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    });
    let data = await res.json();
    console.log(data);
    // "warning","success","error","info"
    swal("Edited Successfully", "Your Comment has been edited", "success");
    FetchReviewsAndQuestions(data.Updated.ProductID);
  } catch (error) {
    console.log(error);
  }
}
async function FetchDeleteReview(id) {
  try {
    let res = await fetch(`${baseURL}/reviews/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });
    let data = await res.json();
    console.log(data);
    swal("Deleted Successfully", "Your Comment has been Deleted", "success");
    FetchReviewsAndQuestions(data.Deleted.ProductID);
  } catch (error) {
    console.log(error);
  }
}
async function VerifyId(id) {
  try {
    let res = await fetch(`${baseURL}/reviews?_id=${id}`);
    let data = await res.json();
    if (data.Review[0].UserID === Initiator._id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
