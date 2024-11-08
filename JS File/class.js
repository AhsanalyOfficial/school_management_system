let classForm = document.querySelector('#class_form');
let classIdInput = document.getElementById('class_id');
let classNameInput = document.getElementById('class');
let classTable = document.getElementById('classTable');
let localStore = JSON.parse(localStorage.getItem('Class-Data')) || [];

classForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let classId = parseInt(classIdInput.value);
    let className = classNameInput.value;

    if (classId && className) {
        localStore.push({ classId, className });
        localStorage.setItem('Class-Data', JSON.stringify(localStore));
        classIdInput.value = '';
        classNameInput.value = '';
        displayClass();
    }
});

function displayClass() {
    classTable.innerHTML = `<tr>
        <th>Class ID</th>
        <th>Class Name</th>
        <th>Action</th>
    </tr>`;

    localStore.forEach((ele, i) => {
        classTable.innerHTML += `<tr>
            <td>${ele.classId}</td>
            <td>${ele.className}</td>
            <td class="thirdRow">
                <button class="editRow" id="updateButton-${i}" onclick="editData(${i})"><ion-icon name="pencil"></ion-icon></button>
                <button class="deleteRow" onclick="delData(${i})"><ion-icon name="trash"></ion-icon></button>
            </td>
        </tr>`;
    });
}

function delData(i) {
    localStore.splice(i, 1);
    localStorage.setItem('Class-Data', JSON.stringify(localStore));
    displayClass();
}

function editData(i) {
    let selectedRow = document.getElementById(`updateButton-${i}`).parentElement.parentElement;
    classIdInput.value = localStore[i].classId;
    classNameInput.value = localStore[i].className;
    selectedRow.cells[2].innerHTML = `<td class="thirdRow">
        <button class="editRow" onclick="UpdateData(${i})"><ion-icon name="logo-edge"></ion-icon></button>
        <button class="deleteRow" onclick="delData(${i})"><ion-icon name="trash"></ion-icon></button>
    </td>`;
}

function UpdateData(i) {
    let inVal1 = classIdInput.value;
    let inVal2 = classNameInput.value;
    localStore[i].classId = inVal1;
    localStore[i].className = inVal2;
    localStorage.setItem('Class-Data', JSON.stringify(localStore));
    displayClass();
}

displayClass();