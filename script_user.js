 data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
 stock = 20;
 booking = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
 img = ["1.png", "2.svg", "3.svg", "4.svg", "5.svg"];
 room = 0;
 user = 61000001;
 time = ['08', '10', '13', '15'];
 roomName = ['computer', 'scope', 'meter', 'toolbox', 'arduino'];
 listId = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
 let url = 'https://bookingapi1.azurewebsites.net/api/booking';
 month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

 async function getstock(nameja) {
     try {
         let res = await fetch("https://bookingapi1.azurewebsites.net/api/Items/total" + '/' + nameja);
         return await res.json();
     } catch (error) {
         console.log(error);
     }
 }
 async function prestock() {
     datain = await getstock(roomName[room]);
     if (datain.total > 20)
         stock = 20;
     else
         stock = datain.total;
     for (i = 0; i < 20; i++) {
         if (stock - datain.totalArray[i] < 0)
             data[i] = 0;
         else
             data[i] = stock - datain.totalArray[i];
     }
     console.log(datain.total);
     console.log(datain.totalArray);
 }

 async function deleteBooking(url = '', id) {
     try {
         let res = await fetch(url + '/' + id, {
             method: 'DELETE',
         })
         return await res.json();
     } catch (error) {
         console.log(error);
     }
 }

 async function deleteBiik(input) {
     let response = await deleteBooking(url, input);
     console.log(response)
 }
 async function getBooking() {
     try {
         let res = await fetch(url);
         return await res.json();
     } catch (error) {
         console.log(error);
     }
 }
 async function prepearBook() {
     newbookings = await getBooking();
     listbook = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
     for (i = 0; i < 20; i++) {
         listId[i] = 0;
     }
     //console.log(bookings)
     // filter
     filterBookings = newbookings.filter(function(item) {
         return item.bookerId == user && item.itemName == roomName[room];
     });
     //console.log(listbook);
     for (i = 0; i < 20; i++) {
         //console.log(filterBookings.length);
         for (j = 0; j < filterBookings.length; j++) {
             if (i < 5) {
                 if (filterBookings[j].dateSlot == (i % 5) + 1 && filterBookings[j].time == time[0]) {
                     listbook[i] = 1;
                     listId[i] = filterBookings[j].id;
                 }
             } else if (i < 10) {
                 if (filterBookings[j].dateSlot == (i % 5) + 1 && filterBookings[j].time == time[1]) {
                     listbook[i] = 1;
                     listId[i] = filterBookings[j].id;
                 }
             } else if (i < 15) {
                 if (filterBookings[j].dateSlot == (i % 5) + 1 && filterBookings[j].time == time[2]) {
                     listbook[i] = 1;
                     listId[i] = filterBookings[j].id;
                 }

             } else {
                 if (filterBookings[j].dateSlot == (i % 5) + 1 && filterBookings[j].time == time[3]) {
                     listbook[i] = 1;
                     listId[i] = filterBookings[j].id;
                 }

             }

         }
     }
     //console.log(listbook);
     return listbook;
 }

 async function postBooking(url = '', body = {}) {
     try {
         let res = await fetch(url, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(body)
         });
         return await res.json();
     } catch (error) {
         console.log(error);
     }
 }

 async function postBook(id, nameja, slot, timeja) {
     let response = await postBooking(url, {
         bookerId: id,
         itemName: nameja,
         dateSlot: slot,
         time: timeja
     });
     console.log(response)
 }


 async function init() {
     n = new Date();
     y = n.getFullYear();
     m = n.getMonth() + 1;
     d = n.getDate();
     daystate = 0;
     //อัฟเดดค่าจากDB
     booking = await prepearBook();
     await prestock();
     //
     for (i = 0; i < 5; i++) {
         if (d + i > 31) {
             d = 1;
             daystate = i;
             m = m + 1;
         }
         document.getElementById("day[" + i + "]").innerHTML = (d + (i - daystate)) + " " + month[m] + " " + y;
     }
     for (i = 0; i < 20; i++) {
         document.getElementById("b[" + i + "]").innerHTML = "&nbsp&nbsp&nbsp" + data[i] + "/" + stock;
         if (data[i] == 0) {
             document.getElementById("d[" + i + "]").style.backgroundColor = "#FF8585";
             document.getElementById("i[" + i + "]").disabled = true;
         } else {
             document.getElementById("d[" + i + "]").style.backgroundColor = "#71E899";
             document.getElementById("i[" + i + "]").disabled = false;
         }
         if (booking[i] == 1) {
             document.getElementById("d[" + i + "]").style.backgroundColor = "#71E8E1"
             document.getElementById("i[" + i + "]").disabled = false;
             document.getElementById("i[" + i + "]").checked = true;
         } else {
             document.getElementById("i[" + i + "]").checked = false;
         }
     }
     //clear zone

     document.getElementById("user_name").innerHTML = user;

     document.getElementById("icon").src = img[room];
     document.getElementById("icon").height = "60";
     document.getElementById("icon").width = "60";

     document.getElementById("checkQ").innerHTML = "";
     document.getElementById("confirm").disabled = true;
     document.getElementById("confirm").style.background = "#CCD7DE";

     document.getElementById("logout").addEventListener("mouseover", function() {
         document.getElementById("logoutIcon").src = "logout 2.svg";
     });

     document.getElementById("logout").addEventListener("mouseout", function() {
         document.getElementById("logoutIcon").src = "logout 1.svg";
     });
 }
 async function sent_data() {
     newbooking = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
     for (i = 0; i < 20; i++) {

         if (document.getElementById("i[" + i + "]").checked == booking[i]) {

         } else {
             if (document.getElementById("i[" + i + "]").checked)
                 newbooking[i] = 1;
             else
                 newbooking[i] = 2;
         }

     }
     //ส่งค่าขึ้นDB
     console.log(newbooking);
     for (i = 0; i < 20; i++) {
         if (newbooking[i] == 1) {
             if (i < 5) {
                 await postBook(user, roomName[room], (i % 5) + 1, time[0]);
             } else if (i < 10) {
                 await postBook(user, roomName[room], (i % 5) + 1, time[1]);
             } else if (i < 15) {
                 await postBook(user, roomName[room], (i % 5) + 1, time[2]);
             } else {
                 await postBook(user, roomName[room], (i % 5) + 1, time[3]);
             }
         } else {
             if (newbooking[i] == 2)
                 await deleteBiik(listId[i]);
         }
     }

     //
     await init();
 }

 function change() {
     document.getElementById("confirm").disabled = false;
     document.getElementById("confirm").style.background = "#B5E4FF";
     document.getElementById("checkQ").innerHTML = "ยืนยันการจองหรือไม่ ?";
 }

 function to_room1() {
     room = 0;
     document.getElementById("room1").className = "active";
     document.getElementById("room2").className = "";
     document.getElementById("room3").className = "";
     document.getElementById("room4").className = "";
     document.getElementById("room5").className = "";
     document.getElementById("item").innerHTML = "คอมพิวเตอร์";
     document.getElementById("item").style.fontWeight = "bold";
     init();
 }

 function to_room2() {
     room = 1;
     document.getElementById("room1").className = "";
     document.getElementById("room2").className = "active";
     document.getElementById("room3").className = "";
     document.getElementById("room4").className = "";
     document.getElementById("room5").className = "";
     document.getElementById("item").innerHTML = "ออสซิโลสโคป";
     document.getElementById("item").style.fontWeight = "bold";
     init();
 }

 function to_room3() {
     room = 2;
     document.getElementById("room1").className = "";
     document.getElementById("room2").className = "";
     document.getElementById("room3").className = "active";
     document.getElementById("room4").className = "";
     document.getElementById("room5").className = "";
     document.getElementById("item").innerHTML = "มัลติมิเตอร์";
     document.getElementById("item").style.fontWeight = "bold";
     init();
 }

 function to_room4() {
     room = 3;
     document.getElementById("room1").className = "";
     document.getElementById("room2").className = "";
     document.getElementById("room3").className = "";
     document.getElementById("room4").className = "active";
     document.getElementById("room5").className = "";
     document.getElementById("item").innerHTML = "กล่องเครื่องมือ";
     document.getElementById("item").style.fontWeight = "bold";
     init();
 }

 function to_room5() {
     room = 4;
     document.getElementById("room1").className = "";
     document.getElementById("room2").className = "";
     document.getElementById("room3").className = "";
     document.getElementById("room4").className = "";
     document.getElementById("room5").className = "active";
     document.getElementById("item").innerHTML = "บอร์ด Arduino";
     document.getElementById("item").style.fontWeight = "bold";
     init();
 }

 //  function logout() {
 //      location.href = "blacklist.html";
 //      console.log("logout");
 //  }





 function logout() {
     location.href = "login.html";
     console.log("logout");
 }



 var parain = new URLSearchParams(window.location.search);
 user = parain.get("user_name");
 init();