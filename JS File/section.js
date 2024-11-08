let emp = 0;
if (emp == 0) {
    let selectedClass = JSON.parse(localStorage.getItem('Class-Data')) || [];
    let chooseClass = document.getElementById('choose_class');
    selectedClass.forEach((element, i) => {
        chooseClass.innerHTML += `<option id="class_in_section-${i}" value="${element.className}">${element.className}</option>`
    })
}

let sectionForm = document.getElementById('section_form');
let localSection = JSON.parse(localStorage.getItem('Section-Data')) || [];

sectionForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let readSection = {
        sectionId: document.getElementById('section_id').value,
        sectionName: document.getElementById('section').value,
        sectionClass: document.getElementById('choose_class').value
    };
    if (readSection) {
        localSection.push(readSection);
        localStorage.setItem('Section-Data', JSON.stringify(localSection));
        document.getElementById('section_id').value = "";
        document.getElementById('section').value = "";
        displaySection();
    }
});
var chooseClass;
function displaySection() {
    let sectionTable = document.getElementById('sectionTable');
    console.log(chooseClass);
    sectionTable.innerHTML = `<tr>
        <th>Class Name</th>
        <th>Section ID</th>
        <th>Section Name</th>
        <th>Actions</th>
    </tr>`;
    localSection.forEach((ele, i) => {
        sectionTable.innerHTML += `<tr>
            <td>${ele.sectionClass}</td>
            <td>${ele.sectionId}</td>
            <td>${ele.sectionName}</td>
            <td class="thirdRow">
                <button class="editRow" id="sectionUpdate-${i}" onclick="editSection(${i})"><ion-icon name="pencil"></ion-icon></button>
                <button class="deleteRow" onclick="deleteSection(${i})"><ion-icon name="trash"></ion-icon></button>
            </td>
            </tr>`;
    });
}

function deleteSection(i) {
    localSection.splice(i, 1);
    localStorage.setItem('Section-Data', JSON.stringify(localSection));
    displaySection();
}

function editSection(i) {
    let selectedRow = document.getElementById(`sectionUpdate-${i}`).parentElement.parentElement;
    document.getElementById('choose_class').value = selectedRow.cells[0].innerHTML;
    document.getElementById('section_id').value = selectedRow.cells[1].innerHTML;
    document.getElementById('section').value = selectedRow.cells[2].innerHTML;
    selectedRow.cells[3].innerHTML = `<td class="thirdRow">
        <button class="editRow" onclick="sectionUpdate(${i})"><ion-icon name="logo-edge"></ion-icon></button>
        <button class="deleteRow" onclick="deleteSection(${i})"><ion-icon name="trash"></ion-icon></button>
    </td>`;
}

function sectionUpdate(i) {
    localSection[i].sectionClass = document.getElementById('choose_class').value;
    localSection[i].sectionId = document.getElementById('section_id').value;
    localSection[i].sectionName = document.getElementById('section').value;
    localStorage.setItem('Section-Data', JSON.stringify(localSection));
    displaySection();
}

displaySection();