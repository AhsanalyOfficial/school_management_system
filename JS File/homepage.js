window.addEventListener("load", function (e) {
    let localData = JSON.parse(localStorage.getItem("log-Data"));
    let getrolename = "";
    if (localData) {
        let getRole = localData.newObj;
        // console.log(getRole);
        for (let data of getRole) {
            // console.log(data.role_name);
            getrolename = data.role_name;
        }
    }

    let logName = document.getElementsByClassName("logName");
    for (let i = 0; i < logName.length; i++) {
        let currentElement = logName[i];
        // console.log(currentElement.innerHTML);
        currentElement.innerHTML = getrolename;
    }
    let roleData = JSON.parse(localStorage.getItem("Role-Manage"));
    let selectedRole = roleData.filter((ele) => ele.role_name === getrolename);
    // console.log(selectedRole);
    for (let roles of selectedRole) {
        // console.log(roles);
        let attendanceElement = document.querySelector(".attendence");
        // console.log(attendanceElement);
        if (attendanceElement) {
            if (roles.attendance === true) {
                attendanceElement.style.visibility = "visible";
            } else {
                attendanceElement.style.visibility = "hidden"; // Hide the element
            }
        }
        let attendance1 = document.querySelector(".role");
        let attendance2 = document.querySelector(".staff");
        let attendance3 = document.querySelector(".student");
        let attendance4 = document.querySelector(".class");
        let attendance5 = document.querySelector(".section");
        let attendance6 = document.querySelector(".subject");
        let attendance7 = document.querySelector(".teacher");
        let attendance8 = document.querySelector(".attendence");
        let attendance9 = document.querySelector(".home");
        if (attendance9) {
            if (roles.role === true) {
                attendance9.style.visibility = "visible";
            } else {
                attendance9.parentElement.style.display = "none";
            }
        }
        if (attendance1) {
            if (roles.role === true) {
                attendance1.style.visibility = "visible";
            } else {
                attendance1.parentElement.style.display = "none";
            }
        }
        if (attendance2) {
            if (roles.employee === true) {
                attendance2.style.visibility = "visible";
            } else {
                attendance2.parentElement.style.display = "none";
            }
        }
        if (attendance3) {
            if (roles.student === true) {
                attendance3.style.visibility = "visible";
            } else {
                attendance3.parentElement.style.display = "none";
            }
        }
        if (attendance4) {
            if (roles.class === true) {
                attendance4.style.visibility = "visible";
            } else {
                attendance4.parentElement.style.display = "none";
            }
        }
        if (attendance5) {
            if (roles.section === true) {
                attendance5.style.visibility = "visible";
            } else {
                attendance5.parentElement.style.display = "none";
            }
        }
        if (attendance6) {
            if (roles.subject === true) {
                attendance6.style.visibility = "visible";
            } else {
                attendance6.parentElement.style.display = "none";
            }
        }
        if (attendance7) {
            if (roles.teacher === true) {
                attendance7.style.visibility = "visible";
            } else {
                attendance7.parentElement.style.display = "none";
            }
        }
        if (attendance8) {
            if (roles.teacher === true) {
                attendance8.style.visibility = "visible";
            } else {
                attendance8.parentElement.style.display = "none";
            }
        }
    }
    // }
    const updateCount = (id, dataKey) => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = JSON.parse(
                localStorage.getItem(dataKey) || "[]"
            ).length;
        }
    };
    updateCount("activeStudent", "Std-Data");
    updateCount("activeStaff", "Form-Data");
    updateCount("activeClass", "Class-Data");
    updateCount("activeSection", "Section-Data");
    updateCount("activeRole", "Role-Manage");
    //  //
    const updateTeacher = (id, key) => {
        const ele = document.getElementById(id);
        if (ele) {
            let teacherLocal = JSON.parse(localStorage.getItem(key)) || [];
            let find = teacherLocal.filter((item) => item.roles === "Teacher");
            ele.innerHTML = find.length;
        }
    };
    updateTeacher("activeTeacher", "Form-Data");
});
//
function openNav() {
    const sideNav = document.getElementById("mySidenav");
    const sideBarLinks = document.querySelectorAll("#sideBar");

    if (sideNav.style.width === "250px") {
        sideNav.style.width = "80px";
        sideBarLinks.forEach((link) => {
            link.style.display = "none";
        });
    } else {
        sideNav.style.width = "250px";
        sideBarLinks.forEach((link) => {
            link.style.display = "block";
        });
    }
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "80px";
    let side = document.querySelectorAll("#sideBar");
    side.forEach((ele) => {
        ele.style.display = "none";
    });
}
let getIcon = document.querySelectorAll('.sideIcon');
getIcon.forEach(ele => {
    ele.addEventListener("click", function (e) {
        const sideNav = document.getElementById("mySidenav");
        const sideBarLinks = document.querySelectorAll("#sideBar");
        if (sideNav.style.width === "250px") {
            sideNav.style.width = "80px";
            sideBarLinks.forEach((link) => {
                link.style.display = "none";
            });
        } else {
            sideNav.style.width = "250px";
            sideBarLinks.forEach((link) => {
                link.style.display = "block";
            });
        }
    })
});
//  //
function loadContent(pageName) {
    document.getElementById("content").src = pageName;
}
// //
function showlogout() {
    let logout = document.querySelector('.logout');
    if (logout.style.height === "0px" && logout.style.top === "0px") {
        logout.style.height = "25px";
        logout.style.top = "50px";
    } else {
        logout.style.height = "0px";
        logout.style.top = "0px";
    }
}
function logout() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You want to logout",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Logout!',
                'Your file has been deleted.',
                'success'
            );
            setTimeout(function () {
                window.location.href = "/Page File/signin.html";
            }, 1000);
        }
    });
}
