//user object
// "id": 11111111,
// "blocked": false,
// "isAdmin": true

//admin  object
// id	integer($int32)
// password	string
let listUsers = [];
let listAdmin = [];
let dialog = 3;
// 1. can login to user reserve
// 2. can login to password admin page
// 3. cant login no user id
// 4. cant login blocked
let diaglogAdmin = 2;
// 1. can login to admin control
// 2. cant login Wrong Password



function showUser(data) {
    data.forEach(val => {
        listUsers.push(val);
    })
}

async function getUser() {
    let response = await fetch('https://bookingapi1.azurewebsites.net/api/users');
    let data = await response.json();
    showUser(data);
    console.log(listUsers);
}

function showAdmin(data) {
    data.forEach(val => {
        listAdmin.push(val);
    })
}

async function getAdmin() {
    let response = await fetch('https://bookingapi1.azurewebsites.net/api/admin');
    let data = await response.json();
    showAdmin(data);
    console.log(listAdmin);
}

function go_back() {
    location.href = "login.html";
    // console.log("logout");
}


function checkUser() {
    let stuID = document.getElementById("studentID").value;

    for (var i = 0; i < listUsers.length; i++) {
        if (stuID == listUsers[i].id && !listUsers[i].blocked && !listUsers[i].isAdmin) {
            dialog = 1;
            break;
        } else if (stuID == listUsers[i].id && listUsers[i].blocked) {
            dialog = 4;
            break;
        } else if (stuID == listUsers[i].id && listUsers[i].isAdmin) {
            dialog = 2;
            break;
        } else {
            dialog = 3;

        }
    }

    if (dialog == 1) {
        var para = new URLSearchParams();
        para.append("user_name", stuID);
        location.href = "user.html?" + para.toString();
        // console.log('Can login to user reserved');
    } else if (dialog == 2) {
        var para = new URLSearchParams();
        para.append("user_name", stuID);
        location.href = "loginAdmin.html?" + para.toString();
        // console.log('Can login to pass admin page');
    } else if (dialog == 3) {
        alert('Cant login No User');
    } else if (dialog == 4) {
        alert('Cant login Blocked');
    }

    dialog = 3;
    // if(isIn){
    // var para = new URLSearchParams();
    // para.append("user_name", stuID);
    // location.href = "http://127.0.0.1:5500/loginAdmin.html?" + para.toString();

    //     console.log('YessYessYessYessYess'); 
    // }else{
    //     console.log('NoNoNoNoNoNoNoNoNoNo');
    // }
    // console.log(typeof user_name);
}


function checkAdmin() {
    let adminPass = document.getElementById("password").value;
    var para2 = new URLSearchParams(window.location.search);
    var adminId = para2.get("user_name");

    diaglogAdmin = 2;
    // console.log(adminId);
    for (var i = 0; i < listAdmin.length; i++) {
        if (adminId == listAdmin[i].id && adminPass == listAdmin[i].password) {
            diaglogAdmin = 1;
            break;
        } else {
            diaglogAdmin = 2;
        }
    }

    if (diaglogAdmin == 1) {
        // alert('can login to admin control');
        location.href = "Addmin.html?"
    } else {
        alert('cant login Wrong Password');
    }

}

getUser();
getAdmin();

// fetch('https://bookingapi1.azurewebsites.net/api/users')
//     .then( response => response.json())
//     .then( data => showData(data));