let stdData = JSON.parse(localStorage.getItem('Std-Data')) || [];
let classData = JSON.parse(localStorage.getItem('Class-Data')) || [];
let sectionData = JSON.parse(localStorage.getItem('Section-Data')) || [];
let stdTab = document.querySelector('.stdTable');
let stdForm = document.getElementById('std_form');
/////////////////////////////////////////////////////////////
classData.forEach(ele => {
    let classId = document.getElementById('class_select');
    let sectionId = document.getElementById('section_select');
    classId.innerHTML += `<option value="${ele.className}">${ele.className}</option>`
    function upDate() {
        let selectedClassName = classId.value;
        let setSectionName = sectionData.filter(ele => ele.sectionClass === selectedClassName)
        console.log(setSectionName);
        sectionId.innerHTML = "";
        setSectionName.forEach(ele => {
            sectionId.innerHTML += `<option value="${ele.sectionName}">${ele.sectionName}</option>`;
        });
    }
    classId.addEventListener('change', upDate)
    upDate();
});
/////////////////////////////////////////////////////////////
stdForm.addEventListener('submit', function (e) {
    readStdData = {
        fName: document.getElementById('f_name').value,
        lName: document.getElementById('l_name').value,
        dBirth: document.getElementById('date_birth').value,
        institute: document.getElementById('institute').value,
        class: document.getElementById('class_select').value,
        section: document.getElementById('section_select').value,
    }
    if (readStdData) {
        stdData.push(readStdData);
        localStorage.setItem('Std-Data', JSON.stringify(stdData));
        formDisplay();
    }
})
function formDisplay() {
    stdTab.innerHTML = `<tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Date of Birth</th>
    <th>Institute</th>
    <th>Class Name</th>
    <th>Section Name</th>
    <th>Actions</th>
    </tr>`
    stdData.forEach((ele, i) => {
        stdTab.innerHTML += `<tr>
        <td>${ele.fName}</td>
        <td>${ele.lName}</td>
        <td>${ele.dBirth}</td>
        <td>${ele.institute}</td>
        <td>${ele.class}</td>
        <td>${ele.section}</td>
        <td class="thirdRow">
        <button class="editRow" id="update-${i}" onclick="editData(${i})"><ion-icon name="pencil"></ion-icon></button>
        <button class="deleteRow" onclick="deleteData(${i})"><ion-icon name="trash"></ion-icon></button>
        </td>
        </tr>`
    })
}
function editData(i) {
    document.getElementById('f_name').value = stdData[i].fName;
    document.getElementById('l_name').value = stdData[i].lName;
    document.getElementById('date_birth').value = stdData[i].dBirth;
    document.getElementById('institute').value = stdData[i].institute;
    //
    let upBtn = document.getElementById('updateStdData');
    upBtn.innerHTML = 'Update Data';
    upBtn.setAttribute('class', 'updateBtn');
    upBtn.setAttribute('data-index', i);
    let subBtn = document.getElementById('subBtn');
    subBtn.style.visibility = 'hidden';
    //
    let formDisplay = document.querySelector('.form-div');
    let tab = document.querySelector('.table-div');
    tab.style.filter = 'blur(2px)';
    formDisplay.style.height = '47%';
    formDisplay.style.top = '15%';

}
function updateStudentData() {
    let i = parseInt(document.getElementById('updateStdData').getAttribute('data-index'));
    if (!isNaN(i)) {
        stdData[i].fName = document.getElementById('f_name').value;
        stdData[i].lName = document.getElementById('l_name').value;
        stdData[i].dBirth = document.getElementById('date_birth').value;
        stdData[i].institute = document.getElementById('institute').value;
        stdData[i].class = document.getElementById('class_select').value;
        stdData[i].section = document.getElementById('section_select').value;
        localStorage.setItem('Std-Data', JSON.stringify(stdData));
        //
        closeForm();
        //
        formDisplay();
    }
}
////////////////////////////////////////////////////////////////////////////
function deleteData(i) {
    stdData.splice(i, 1);
    localStorage.setItem('Std-Data', JSON.stringify(stdData));
    formDisplay();
}
formDisplay();
////////////////////////////////////////////////////////////////////////////
function newStd() {
    let formDisplay = document.querySelector('.form-div');
    if (formDisplay) {
        let tab = document.querySelector('.table-div');
        tab.style.filter = 'blur(2px)';
        formDisplay.style.height = '47%';
        formDisplay.style.top = '15%';
    }
}
///////////////////////////////////////////////////////////////////////////
function closeForm() {
    let tab = document.querySelector('.table-div');
    let formDisplay = document.querySelector('.form-div');
    tab.style.filter = 'blur(0px)';
    formDisplay.style.height = '0%';
    formDisplay.style.top = '-20%';
}
