let form = document.getElementById('formData');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let localData = JSON.parse(localStorage.getItem('Form-Data'));
    let email = document.getElementById('email').value;
    let selectedAllData = localData.filter(role => role.email === email);
    let filteredData = selectedAllData.length > 0 ? selectedAllData.map(role => role.rolesObj) : null;
    console.log(filteredData);
    readForm = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        newObj: filteredData
    }
    //
    localStorage.setItem('log-Data', JSON.stringify(readForm));
    //
    let staffData = JSON.parse(localStorage.getItem('Form-Data'));
    if (Array.isArray(staffData)) {
        for (let obj of staffData) {
            if (readForm.email === obj.email && readForm.password === obj.password) {
                if (obj.roles === "Admin") {
                    window.location.href = "/Page File/homepage.html"
                }
            } if (readForm.email === obj.email && readForm.password === obj.password) {
                if (obj.roles === "Teacher") {
                    window.location.href = "/Page File/homepage.html"
                }
            } if (readForm.email === obj.email && readForm.password === obj.password) {
                if (obj.roles === "Student") {
                    window.location.href = "/Page File/homepage.html"
                }
            }
            else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Please enter a valid info',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }
})