var paraout = new URLSearchParams();
book = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, ];
room = 1;
month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function chang_page(numpage) {
    paraout.append("page", numpage);
    location.href = "Addmin.html?" + paraout.toString();
}

function logout() {
    location.href = "login.html";
    console.log("logout");
}
async function getData() {
    let url = 'https://dinolabkmitl.azurewebsites.net/Api/GetLab/' + room;
    try {
        let res = await fetch(url, { mode: 'no-cors' });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
async function init() {

    n = new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    daystate = 0;
    for (i = 0; i < 14; i++) {
        if (d + i > 31) {
            d = 1;
            daystate = i;
            m = m + 1;
        }
        if (daystate == 0) {
            document.getElementById("day[" + i + "]").innerHTML = (d + (i - daystate)) + " " + month[m] + " " + y;
        } else {
            document.getElementById("day[" + i + "]").innerHTML = "&nbsp&nbsp&nbsp" + (d + (i - daystate)) + " " + month[m] + " " + y;
        }

    }

    ///รับจาก DB


    newbook = [
            [10, 10, 10, 10, 10, 10, 10],
            [10, 10, 10, 10, 10, 10, 10],
            [10, 10, 10, 10, 10, 10, 10],
            [10, 10, 10, 10, 10, 10, 10],
            [10, 10, 10, 10, 10, 10, 10],
            [10, 10, 10, 10, 10, 10, 10],
            [10, 10, 10, 10, 10, 10, 10],
            [10, 10, 10, 10, 10, 10, 10],
            [10, 10, 10, 10, 10, 10, 10],
            [10, 10, 10, 10, 10, 10, 10],
            [10, 10, 10, 10, 10, 10, 10],
            [10, 10, 10, 10, 10, 10, 10],
            [10, 10, 10, 10, 10, 10, 10],
            [10, 10, 10, 10, 10, 10, 10]
        ]
        ///newbook[วัน][เวลา]
        //datain = await getData();
    console.log(datain);
    for (i = 0; i < 98; i++) {
        if (i < 14) {
            book[i] = newbook[i % 14][0];
        } else if (i < 28) {
            book[i] = newbook[i % 14][1];
        } else if (i < 42) {
            book[i] = newbook[i % 14][2];
        } else if (i < 56) {
            book[i] = newbook[i % 14][3];
        } else if (i < 70) {
            book[i] = newbook[i % 14][4];
        } else if (i < 84) {
            book[i] = newbook[i % 14][5];
        } else if (i < 98) {
            book[i] = newbook[i % 14][6];
        }
    }
    ////////////////////////////add to show




    ///////show
    for (i = 0; i < 98; i++) {
        document.getElementById("booking[" + i + "]").innerHTML = book[i];

    }
    //////////////////clear zone

}

function go_bt1() {
    room = 1;
    document.getElementById("bt1").className = "active";
    document.getElementById("bt2").className = "";
    document.getElementById("bt3").className = "";
    document.getElementById("bt4").className = "";
    document.getElementById("bt5").className = "";
}

function go_bt2() {
    room = 2;
    document.getElementById("bt1").className = "";
    document.getElementById("bt2").className = "active";
    document.getElementById("bt3").className = "";
    document.getElementById("bt4").className = "";
    document.getElementById("bt5").className = "";
}

function go_bt3() {
    room = 3;
    document.getElementById("bt1").className = "";
    document.getElementById("bt2").className = "";
    document.getElementById("bt3").className = "active";
    document.getElementById("bt4").className = "";
    document.getElementById("bt5").className = "";
}

function go_bt4() {
    room = 4;
    document.getElementById("bt1").className = "";
    document.getElementById("bt2").className = "";
    document.getElementById("bt3").className = "";
    document.getElementById("bt4").className = "active";
    document.getElementById("bt5").className = "";
}

function go_bt5() {
    room = 5;
    document.getElementById("bt1").className = "";
    document.getElementById("bt2").className = "";
    document.getElementById("bt3").className = "";
    document.getElementById("bt4").className = "";
    document.getElementById("bt5").className = "active";
}

function go_blacklist() {
    location.href = "blacklist.html";
}

init();