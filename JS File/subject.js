let em = 0;
if (em == 0) {
    let selectedClass = JSON.parse(localStorage.getItem('Class-Data')) || [];
    let chooseClass = document.getElementById('choose_class_subject');
    selectedClass.forEach((element, i) => {
        chooseClass.innerHTML += `<option id="class_in_section-${i}" value="${element.className}">${element.className}</option>`
    })
}

let subjectForm = document.getElementById('subject_form');
let subjectData = JSON.parse(localStorage.getItem('Subject-Data')) || [];
console.log(subjectForm);
subjectForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let readSubject = {
        subjectClass: document.getElementById('choose_class_subject').value,
        subjectName: document.getElementById('subject').value
    };
    if (readSubject) {
        subjectData.push(readSubject);
        localStorage.setItem('Subject-Data', JSON.stringify(subjectData));
        document.getElementById('subject').value = "";
        displaySubject();
    }
});
function displaySubject() {
    let subjectTable = document.getElementById('subjectTable');
    subjectTable.innerHTML = `<tr>
        <th>Class Name</th>
        <th>Subject Name</th>
        <th>Actions</th>
    </tr>`;
    subjectData.forEach((ele, i) => {
        subjectTable.innerHTML += `<tr>
            <td>${ele.subjectClass}</td>
            <td>${ele.subjectName}</td>
            <td class="thirdRow">
                <button class="editRow" id="subjectUpdate-${i}" onclick="editSubject(${i})"><ion-icon name="pencil"></ion-icon></button>
                <button class="deleteRow" onclick="deleteSubject(${i})"><ion-icon name="trash"></ion-icon></button>
            </td>
            </tr>`;
    });
}

function deleteSubject(i) {
    subjectData.splice(i, 1);
    localStorage.setItem('Subject-Data', JSON.stringify(subjectData));
    displaySubject();
}

function editSubject(i) {
    let selectedRow = document.getElementById(`subjectUpdate-${i}`).parentElement.parentElement;
    document.getElementById('choose_class_subject').value = selectedRow.cells[0].innerHTML;
    document.getElementById('subject').value = selectedRow.cells[1].innerHTML;
    selectedRow.cells[2].innerHTML = `<td class="thirdRow">
        <button class="editRow" onclick="subjectUpdate(${i})"><ion-icon name="logo-edge"></ion-icon></button>
        <button class="deleteRow" onclick="deleteSubject(${i})"><ion-icon name="trash"></ion-icon></button>
    </td>`;
}

function subjectUpdate(i) {
    subjectData[i].subjectClass = document.getElementById('choose_class_subject').value;
    subjectData[i].subjectName = document.getElementById('subject').value;
    localStorage.setItem('Subject-Data', JSON.stringify(subjectData));
    displaySubject();
    document.getElementById('subject').value = "";
}

displaySubject();