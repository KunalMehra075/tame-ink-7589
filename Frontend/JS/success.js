localStorage.setItem("OrangeGoogleAuth", true);
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
if (params.successId) {
    let id = params.successId.trim().split(`"`)[1];
    console.log(id);
    let LetsGoButton = document.getElementById("LetsGoButton");
    LetsGoButton.addEventListener("click", () => {
        GoogleLoginFunction(id);
    });

} else {
    //? <!----------------------------------------------- < failed> ----------------------------------------------->
    let LetsGoButtonFailed = document.getElementById("LetsGoButtonFailed")
    if (LetsGoButtonFailed) {
        LetsGoButtonFailed.addEventListener("click", () => {
            window.location.href = "index.html"
        })

    }
}
async function GoogleLoginFunction(id) {
    let baseURL = "https://orange-fry-backend.vercel.app";
    try {
        let res = await fetch(`${baseURL}/google/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ userID: id }),
        });
        let data = await res.json();
        console.log(data);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("current-user", JSON.stringify(data.user));
        if (data.user && data.user.role == "Admin") {
            swal({
                title: "Welcome Back Admin! ",
                text: "Do you want to redirect to Admin's Portal?",
                icon: "info",
                buttons: true,
                dangerMode: true,
            }).then((admin) => {
                if (admin) {
                    setTimeout(() => {
                        spinner.style.display = "none"; //!Spinner
                        window.location.href = "Admin.html";
                    }, 1000);
                } else {
                    spinner.style.display = "none"; //!Spinner
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 500);
                }
            });
        } else {
            swal(
                "Login Successful!",
                "You are logged in, Lets Explore!",
                "success"
            );
            spinner.style.display = "none"; //!Spinner
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        }
    } catch (error) {
        console.log(error);
    }
}


