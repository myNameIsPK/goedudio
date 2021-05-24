var paraout = new URLSearchParams();
user_name = ["61110001", "61110002", "61110003", "61110004",
    "61110005", "61110006", "61110007", "61110008",
    "61110009", "61110010", "61110011", "61110012",
    "61110013", "61110014", "61110015", "61110016",
    "61110017", "61110018", "61110019", "61110020",
    "61110021", "61110022", "61110023", "61110024",
    "61110025", "61110026", "61110027", "61110028",
    "61110029", "61110030", "61110031", "61110032",
];
is_block = [0, 0, 0, 1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 1
];

function chang_page(numpage) {
    paraout.append("page", numpage);
    location.href = "Addmin.html?" + paraout.toString();
}
async function getUsers() {
    let url = 'https://bookingapi1.azurewebsites.net/api/users';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function init() {
    ///รับจาก DB
    userin = await getUsers();
    filteruser = userin.filter(function(user) {
        return user.isAdmin == false;
    });

    for (i = 0; i < 32; i++) {
        user_name[i] = filteruser[i].id;
        if (filteruser[i].blocked) {
            is_block[i] = 1;
        } else
            is_block[i] = 0;
    }
    ////////////////////////////add to show

    for (i = 0; i < 32; i++) {
        document.getElementById("b[" + i + "]").innerHTML = user_name[i];
        if (is_block[i] == 1) {
            document.getElementById("i[" + i + "]").checked = true;
        } else {
            document.getElementById("i[" + i + "]").checked = false;
        }
    }


    ///////show
    for (i = 0; i < 32; i++) {
        document.getElementById("b[" + i + "]").innerHTML = user_name[i];
        if (is_block[i] == 1) {
            document.getElementById("i[" + i + "]").checked = true;
        } else {
            document.getElementById("i[" + i + "]").checked = false;
        }
    }

    //////////////////clear zone
    document.getElementById("confirm").disabled = true;
    document.getElementById("confirm").style.background = "#CCD7DE";
    document.getElementById("checkQ").innerHTML = "";
}

function change() {
    document.getElementById("confirm").disabled = false;
    document.getElementById("confirm").style.background = "#B5E4FF";
    document.getElementById("checkQ").innerHTML = "ยืนยันการ Blacklist หรือไม่ ?";
}

async function putItem(url = '', name = '', body = {}) {
    try {
        let res = await fetch(url + '/' + name, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

async function putdata(index, bool) {
    let response = await putItem("https://bookingapi1.azurewebsites.net/api/users", user_name[index], {
        id: user_name[index],
        isAdmin: false,
        blocked: bool
    });
    if (response.status == 204)
        console.log("Update Success")
}

async function sent_data() {
    newis_block = [0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ];
    for (i = 0; i < 32; i++) {
        if (document.getElementById("i[" + i + "]").checked == is_block[i]) {

        } else {
            if (document.getElementById("i[" + i + "]").checked)
                newis_block[i] = 1;
            else
                newis_block[i] = 2;
        }
    }
    //ส่งค่าขึ้นDB
    for (i = 0; i < 32; i++) {
        if (newis_block[i] == 1) {
            await putdata(i, true);
        } else if (newis_block[i] == 2) {
            await putdata(i, false);
        }
    }

    await init();
}


init();