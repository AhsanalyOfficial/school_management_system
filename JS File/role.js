let form = document.querySelector('form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    roleData = {
        role_name: document.getElementById('role-name').value,
        role_id: document.getElementById('role-id').value,
        employee: document.getElementById('employee').checked,
        role: document.getElementById('role').checked,
        student: document.getElementById('student').checked,
        class: document.getElementById('class').checked,
        section: document.getElementById('section').checked,
        attendence: document.getElementById('attendence').checked,
        teacher: document.getElementById('teacher').checked,
        subject: document.getElementById('subject').checked,
    };
    let local = JSON.parse(localStorage.getItem('Role-Manage')) || [];
    local.push(roleData);
    localStorage.setItem('Role-Manage', JSON.stringify(local));
    document.getElementById('role-name').value = '';
    document.getElementById('role-id').value = '';
    document.getElementById('employee').checked = false;
    document.getElementById('role').checked = false;
    document.getElementById('student').checked = false;
    document.getElementById('class').checked = false;
    document.getElementById('section').checked = false;
    document.getElementById('attendence').checked = false;
    document.getElementById('teacher').checked = false;
    document.getElementById('subject').checked = false;
    displayData();
});

function displayData() {
    let local = JSON.parse(localStorage.getItem('Role-Manage')) || [];
    let table_body = document.getElementById('table-body');
    let empty = '';
    local.forEach((ele, i) => {
        empty += `<tr>
        <td>${ele.role_name}</td>
        <td>${ele.role_id}</td>
        <td class="thirdRow">
        <button class="editRow" id="updateButton-${i}" onclick="editData(${i})"><ion-icon name="pencil"></ion-icon></button>
        <button class="deleteRow" onclick="delData(${i})"><ion-icon name="trash"></ion-icon></button>
        </td>
        </tr>`
    });
    table_body.innerHTML = empty;
}

displayData();

function editData(i) {
    const local = JSON.parse(localStorage.getItem('Role-Manage')) || [];
    if (i >= 0 && i < local.length) {
        document.getElementById('role-name').value = local[i].role_name;
        document.getElementById('role-id').value = local[i].role_id;
        document.getElementById('employee').checked = local[i].employee;
        document.getElementById('role').checked = local[i].role;
        document.getElementById('student').checked = local[i].student;
        document.getElementById('class').checked = local[i].class;
        document.getElementById('section').checked = local[i].section;
        document.getElementById('attendence').checked = local[i].attendence;
        document.getElementById('teacher').checked = local[i].teacher;
        document.getElementById('subject').checked = local[i].subject;
    }
    let selectedRow = document.getElementById(`updateButton-${i}`).parentElement.parentElement;
    selectedRow.cells[2].innerHTML = `<button class="editRow" onclick="UpdateData(${i})"><ion-icon name="logo-edge"></ion-icon></button>
    <button class="deleteRow" onclick="delData(this)"><ion-icon name="trash"></ion-icon></button>`
}

function UpdateData(i) {
    const local = JSON.parse(localStorage.getItem('Role-Manage')) || [];
    if (i >= 0 && i < local.length) {
        local[i].role_name = document.getElementById('role-name').value;
        local[i].role_id = document.getElementById('role-id').value;
        local[i].employee = document.getElementById('employee').checked;
        local[i].role = document.getElementById('role').checked;
        local[i].student = document.getElementById('student').checked;
        local[i].class = document.getElementById('class').checked;
        local[i].section = document.getElementById('section').checked;
        local[i].attendence = document.getElementById('attendence').checked;
        local[i].teacher = document.getElementById('teacher').checked;
        local[i].subject = document.getElementById('subject').checked;
    }
    localStorage.setItem('Role-Manage', JSON.stringify(local));
    document.getElementById('role-name').value = '';
    document.getElementById('role-id').value = '';
    document.getElementById('employee').checked = false;
    document.getElementById('role').checked = false;
    document.getElementById('student').checked = false;
    document.getElementById('class').checked = false;
    document.getElementById('section').checked = false;
    document.getElementById('attendence').checked = false;
    document.getElementById('teacher').checked = false;
    document.getElementById('subject').checked = false;
    displayData();
}

function delData(i) {
    const local = JSON.parse(localStorage.getItem('Role-Manage')) || [];
    local.splice(i, 1);
    localStorage.setItem('Role-Manage', JSON.stringify(local));
    displayData();
} 
