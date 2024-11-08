let local = JSON.parse(localStorage.getItem("Form-Data")) || [];
// Form Data
let form = document.querySelector('form');
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let roleData = JSON.parse(localStorage.getItem('Role-Manage')) || [];
    let selectedRoleName = document.getElementById('Select-Role').value;
    let selectedRoleObject = roleData.find(role => role.role_name === selectedRoleName);
    console.log(selectedRoleObject);
    let filteredRoleObject = selectedRoleObject ? {
        role_name: selectedRoleObject.role_name,
        role_id: selectedRoleObject.role_id,
        employee: selectedRoleObject.employee,
        role: selectedRoleObject.role,
        student: selectedRoleObject.student,
        class: selectedRoleObject.class,
        section: selectedRoleObject.section,
        attendance: selectedRoleObject.attendance,
        teacher: selectedRoleObject.teacher
    } : null;

    let readData = {
        firstName: document.getElementById("firstName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        gender: document.getElementById("gender").value,
        roles: document.getElementById("Select-Role").value,
        rolesObj: filteredRoleObject,
    };
    let find = 0;
    let local = JSON.parse(localStorage.getItem("Form-Data")) || [];
    for (let k of local) {
        if (readData.email == k.email) {
            find = 1;
        }
    }
    if (find === 1) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Invali Email',
            showConfirmButton: false,
            timer: 1500
        })
    } else {
        local.push(readData);
        localStorage.setItem("Form-Data", JSON.stringify(local));
        //
        document.getElementById("firstName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("address").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("gender").value = "";
        //
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully Added',
            showConfirmButton: false,
            timer: 1500
        })
        //
        setData();
        //
        setTimeout(function () {
            document.querySelector('.empData').style.height = '0px';
            let blur = document.querySelector('.table-container');
            blur.style = "filter: blur(0px);"
        }, 1500)
    }

});
//
function addRole() {
    let local = JSON.parse(localStorage.getItem('Role-Manage')) || [];
    let selectRole = document.getElementById('Select-Role');
    selectRole.innerHTML = local.map(role => `<option value="${role.role_name}">${role.role_name}</option>`).join('');
}
addRole();
// Set DataSource
function setData() {
    let local = JSON.parse(localStorage.getItem("Form-Data")) || [];
    let empty = '';
    let tableBody = document.getElementById('tableBody');
    local.forEach((element, i) => {
        empty += `<tr>
        <td>${element.firstName}</td>
        <td>${element.email}</td>
        <td>${element.password}</td>
        <td>${element.address}</td>
        <td>${element.phone}</td>
        <td>${element.gender}</td>
        <td>
        <button type="button" onclick="statusCheck(${i})" class="stateStyle" id="status-${i}">Active</button>
        </td>
        <td>${element.roles}</td>
        <td class="thirdRow">
        <button class="editRow" id="updateButton-${i}" onclick="editData(${i})"><ion-icon name="pencil"></ion-icon></button>
        <button class="deleteRow" onclick="delData(${i})"><ion-icon name="trash"></ion-icon></button>
        </td>
        </tr>`;
    });
    tableBody.innerHTML = empty;
}
setData();
// Delete Data
function delData(i) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            let local = JSON.parse(localStorage.getItem("Form-Data")) || [];
            local.splice(i, 1);
            localStorage.setItem("Form-Data", JSON.stringify(local));
            setData();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}
// Edit Data
function editData(i) {
    document.getElementById("firstName").value = local[i].firstName;
    document.getElementById("email").value = local[i].email;
    document.getElementById("password").value = local[i].password;
    document.getElementById("address").value = local[i].address;
    document.getElementById("phone").value = local[i].phone;
    document.getElementById("gender").value = local[i].gender;
    //
    document.querySelector('.empData').style.top = '10%';
    document.querySelector('.table-container').style = "filter: blur(2.5px);"
    //
    document.getElementById('submit').style.display = 'none';
    document.getElementById('updateData').style.display = 'block';
    upBtn.setAttribute('data-index', i);

}
// Check Status
function statusCheck(i) {
    let checkState = 1;
    let selectedRow = document.getElementById(`status-${i}`);
    if (selectedRow.textContent === "Active") {
        selectedRow.textContent = "Inactive";
        checkState = 0;
        selectedRow.style.backgroundColor = "#218838"
    } else {
        selectedRow.textContent = "Active";
        checkState = 1;
        selectedRow.style.backgroundColor = "#28a745"
    }
}
// Update Data
function updateData() {
    let i = parseInt(document.getElementById('updateData').getAttribute('data-index'));
    if (!isNaN(i)) {
        let selectedRoleName = document.getElementById('Select-Role').value;
        let roleData = JSON.parse(localStorage.getItem('Role-Manage')) || [];
        let selectedRoleObject = roleData.find(role => role.role_name === selectedRoleName);
        let filteredRoleObject = selectedRoleObject ? {
            role_name: selectedRoleObject.role_name,
            role_id: selectedRoleObject.role_id,
            employee: selectedRoleObject.employee,
            role: selectedRoleObject.role,
            student: selectedRoleObject.student,
            class: selectedRoleObject.class,
            section: selectedRoleObject.section,
            attendance: selectedRoleObject.attendance,
            teacher: selectedRoleObject.teacher
        } : null;
        local[i].firstName = document.getElementById("firstName").value;
        local[i].email = document.getElementById("email").value;
        local[i].password = document.getElementById("password").value;
        local[i].address = document.getElementById("address").value;
        local[i].phone = document.getElementById("phone").value;
        local[i].gender = document.getElementById("gender").value;
        local[i].roles = document.getElementById("Select-Role").value;
        let updateRoleManage = filteredRoleObject;
        local[i].rolesObj = updateRoleManage
        localStorage.setItem("Form-Data", JSON.stringify(local));
        setData();
        document.querySelector('.empData').style.top = '-100%';
        document.querySelector('.table-container').style = "filter: blur(0px);"
    }
}
// Display Form
function newDataAdd() {
    let formDisplay = document.getElementById('newAdd');
    formDisplay.addEventListener('click', function (e) {
        let empData = document.querySelector('.empData');
        empData.style.top = '10%';
        let blur = document.querySelector('.table-container');
        blur.style = "filter: blur(1.8px);"
        document.getElementById('updateData').style.display = 'none';
        document.getElementById('submit').style.display = 'block';
    })
}
newDataAdd();
// Close Form
function closeForm() {
    let closeForm = document.getElementById('cancelAdd');
    closeForm.addEventListener('click', function (e) {
        let empData = document.querySelector('.empData');
        empData.style.top = '-100%';
        let blur = document.querySelector('.table-container');
        blur.style = "filter: blur(0px);"
    })
}
closeForm();