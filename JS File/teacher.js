let teacherData = JSON.parse(localStorage.getItem('Form-Data')) || [];
window.addEventListener('load', displayData)
function displayData() {
    let table = document.getElementById('teacher_table');
    table.innerHTML = `<tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Role</th>
        <th>Action</th>
        </tr>`
    teacherData.forEach((ele, i) => {
        if (ele.roles === 'Teacher') {
            table.innerHTML += `<tr>
            <td>${ele.firstName}</td>
            <td>${ele.email}</td>
            <td>${ele.phone}</td>
            <td>${ele.roles}</td>
            <td><button type="button" onclick="onConfig(${i})" id="config-${i}" class="configer" ><ion-icon name="settings"></ion-icon></button></td>
            </tr>`
        }
    });
}
////////////////////////////////////////////////////////////////
let sub = document.querySelector('.teacherConfig');
sub.addEventListener('submit', function (e) {
    e.preventDefault();
    readData = {
        classOpt: document.getElementById('teacher_class').value,
        sectionOpt: document.getElementById('teacher_section').value,
        teacherName: document.getElementById('teacher_name').innerHTML
    }
    if (readData) {
        let assigneClass = JSON.parse(localStorage.getItem('Assign-Data')) || [];
        assigneClass.push(readData);
        localStorage.setItem('Assign-Data', JSON.stringify(assigneClass));
        displayAssignData();
        document.getElementById('teacher_class').value = "";
        document.getElementById('teacher_section').value = "";
    }
});
////////////////////////////////////////////////////////////////
function onConfig(i) {
    let teacherName = document.getElementById('teacher_name');
    teacherName.innerHTML = teacherData[i].firstName;
    let classData = JSON.parse(localStorage.getItem('Class-Data'));
    let sectionData = JSON.parse(localStorage.getItem('Section-Data'));
    let classOpt = document.getElementById('teacher_class');
    let sectionOpt = document.getElementById('teacher_section');
    sectionOpt.innerHTML = '';
    classData.forEach(ele => {
        classOpt.innerHTML += `<option value="${ele.className}">${ele.className}</option>`;
    });

    function updateSections() {
        let selectedClassName = classOpt.value;
        let sectionsForSelectedClass = sectionData.filter(ele => ele.sectionClass === selectedClassName);
        sectionOpt.innerHTML = '';
        sectionsForSelectedClass.forEach(ele => {
            sectionOpt.innerHTML += `<option value="${ele.sectionName}">${ele.sectionName}</option>`;
        });
    }
    classOpt.addEventListener('change', updateSections);
    updateSections();
    let configDiv = document.querySelector('.main-config');
    configDiv.style.height = '275px';
    configDiv.style.top = '15%';
    displayAssignData();
}
////////////////////////////////////////////////////////////////
function displayAssignData(i) {
    let selectedTeacherName = document.getElementById('teacher_name').innerHTML;
    let assigneClass = JSON.parse(localStorage.getItem('Assign-Data')) || [];
    let selectedAllData = assigneClass.filter(ele => ele.teacherName === selectedTeacherName);
    let tab = document.querySelector('.classTable');
    tab.innerHTML = "";
    tab.innerHTML = `<tr>
        <th>Class Name</th>
        <th>Section Name</th>
        <th>Action</th>
        </tr>`
    selectedAllData.forEach(ele => {
        tab.innerHTML += `<tr>
            <td>${ele.classOpt}</td>
            <td>${ele.sectionOpt}</td>
            <td><button class="deleteRow" onclick="delData(${i})"><ion-icon name="trash"></ion-icon></button></td>
            </tr>`
    })
}
////////////////////////////////////////////////////////////////
function delData(i) {
    let assigneClass = JSON.parse(localStorage.getItem('Assign-Data')) || [];
    assigneClass.splice(i, 1);
    localStorage.setItem('Assign-Data', JSON.stringify(assigneClass));
    displayAssignData();
}
////////////////////////////////////////////////////////////////
function closeConfig() {
    document.getElementById('teacher_class').innerHTML = "";
    document.getElementById('teacher_section').innerHTML = "";
    let configDiv = document.querySelector('.main-config');
    configDiv.style.height = '0px';
    configDiv.style.top = '-8%';
}