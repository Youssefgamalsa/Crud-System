let price = document.getElementById("price");
let title = document.getElementById("title");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = "create";
let tmp;

// get total (1)  

function gettotal() {
  if (price.value != "") {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a20505";
  }
}

// ceate product (2);

let array;
if (localStorage.product != null) {
  array = JSON.parse(localStorage.product);
} else {
  array = [];
}

submit.onclick = function () {
  let user = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  }
  if (user.title !='' && user.price !='' && user.category !='' &&  user.count < 100)
   {
  if (mode === "create") {
    if (user.count > 1) {
      for (let i = 0; i < user.count ; i++) {
        array.push(user);
      }
    } else {
      array.push(user);
    }
  } else {
    array[tmp] = user;
    submit.innerHTML = "Create";
    mode = "create";
    count.style.display = "block";
  }
  clearinputs();
}

  // save at localstorage
  localStorage.setItem("product", JSON.stringify(array));
  read();
}
// clear inputs

function clearinputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
read();
// read products
function read() {
  gettotal();
  let title = "";
  for (let i = 0; i < array.length; i++) {
    title += `
        <tr>
        <td>${i+1}</td>
        <td>${array[i].title}</td>
        <td>${array[i].price}</td>
        <td>${array[i].taxes}</td>
        <td>${array[i].ads}</td>
        <td>${array[i].discount}</td>
        <td>${array[i].total}</td>
        <td>${array[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deletion(${i})"id="delete">delete</button></td>
        </tr>
        `;
    document.getElementById("tbody").innerHTML = title;
    let btndelete = document.getElementById("deleteAll");

    if (array.length > 0) {
      btndelete.innerHTML = `<button onclick="deleteAll()"> delete all (${array.length}) </button>`;
    } else {
      btndelete.innerHTML = "";
    }
  }
}
// delete 
function deletion(i) {
  array.splice(i, 1);
  localStorage.product = JSON.stringify(array);
  read();
}

function deleteAll() {
  localStorage.clear();
  array.splice(0,array.length -1);
  read();
}
// update 
function updateData(i) {
  title.value = array[i].title;
  price.value = array[i].price;
  taxes.value = array[i].taxes;
  ads.value = array[i].ads;
  discount.value = array[i].discount;
  category.value = array[i].category;
  submit.innerHTML = "Update";
  count.style.display = "none";
  gettotal();
  mode = "update";
  tmp = i;
  scroll({
    top:0,
    behavior:"smooth"
  })
}

// search 
let search = document.getElementById("search");
let searchmode = "title";

function getmode(id) {
  if (id === "searchtitle") {
    searchmode = "title";
  } else {
    searchmode = "category";
  }
  search.focus();
  search.placeholder = " search by " + searchmode;
  read();
}

function searchby(value) {
  let table = "";
  if (searchmode == "title") {
    for (let i = 0; i < array.length; i++) {
      if (array[i].title.includes(value.toLowerCase())) {
        table += `
                <tr>
                <td>${i+1}</td>
                <td>${array[i].title}</td>
                <td>${array[i].price}</td>
                <td>${array[i].taxes}</td>
                <td>${array[i].ads}</td>
                <td>${array[i].discount}</td>
                <td>${array[i].total}</td>
                <td>${array[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deletion(${i})"id="delete">delete</button></td>
                </tr>
                `;
      }
    }
document.getElementById("tbody").innerHTML = table;
  } else {
    let table = "";
    if (searchmode == "category") {
      for (let i = 0; i < array.length; i++) {
        if (array[i].category.includes(value.toLowerCase())) {
          table += `
                  <tr>
                  <td>${i}</td>
                  <td>${array[i].title}</td>
                  <td>${array[i].price}</td>
                  <td>${array[i].taxes}</td>
                  <td>${array[i].ads}</td>
                  <td>${array[i].discount}</td>
                  <td>${array[i].total}</td>
                  <td>${array[i].category}</td>
                  <td><button onclick="updateData(${i})" id="update">update</button></td>
                  <td><button onclick="deletion(${i})"id="delete">delete</button></td>
                  </tr>
                  `;
        }
      }
    }
document.getElementById("tbody").innerHTML = table;
  }
}
