//C R U  D S



var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice')
var productCat = document.getElementById('productCat')
var productDesc = document.getElementById('productDesc')
var tableRow = document.getElementById('tableRow')
var productNameFeedback = document.getElementById('productNameFeedback')
var productPriceFeedback = document.getElementById('productPriceFeedback')
var btn = document.getElementById('btn')


var productList = JSON.parse(localStorage.getItem('list')) || [];
display(productList)

btn.onclick = function () {
    if (btn.innerHTML == 'update')
        finalEdit()
    else
        addProduct()
}



function addProduct() {
    if (productNameRegex() && productPriceRegex()) {
        var product = {
            productName: productName.value,
            productPrice: productPrice.value,
            productCat: productCat.value,
            productDesc: productDesc.value
        }
        productList.push(product)
        localStorage.setItem('list', JSON.stringify(productList))
        display(productList)
        productNameFeedback.innerHTML = ''
        productPriceFeedback.innerHTML = ''
         reset()
    }
    else {
        notNameValidation()
        notPriceValidation()
    }

}

function display(listArray) {
    var box = ''

    for (var i = 0; i < listArray.length; i++) {
        box += `
    <tr>
    <td>${i + 1}</td>
    <td class="hightlight">${listArray[i].productName}</td>
    <td>${listArray[i].productPrice}</td>
    <td>${listArray[i].productCat}</td>
    <td>${listArray[i].productDesc}</td>
    <td><button class="btn btn-danger" onclick="deleteFun(${i})">Delete</button></td>
    <td><button class="btn btn-info"  onclick="updateFun(${i})">Update</button></td>
   </tr>
    `
    }

    tableRow.innerHTML = box
}


function reset() {
    productName.value = '';
    productPrice.value = '';
    productCat.value = '';
    productDesc.value = '';
}


//delete fun

function deleteFun(index) {
    productList.splice(index, 1)
    localStorage.setItem('list', JSON.stringify(productList))
    display(productList)
}


//update

var globalIndex;
function updateFun(index) {
    globalIndex = index
    productName.value = productList[index].productName;
    productPrice.value = productList[index].productPrice;
    productCat.value = productList[index].productCat;
    productDesc.value = productList[index].productDesc;
    btn.innerHTML = 'update'
}


/// final edit fun

function finalEdit() {
    var product = {
        productName: productName.value,
        productPrice: productPrice.value,
        productCat: productCat.value,
        productDesc: productDesc.value
    }

    productList.splice(globalIndex, 1, product)
    localStorage.setItem('list', JSON.stringify(productList))
    display(productList)
    btn.innerHTML = 'add Product'
}


//search

function searchFun(ele) {
    var searchedArr = []
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].productName.toLowerCase().includes(ele.value.toLowerCase())) {
            searchedArr.push(productList[i])
        }
    }
    display(searchedArr)
    var hightlight = document.getElementsByClassName('hightlight')
    for (var i = 0; i < hightlight.length; i++) {
        hightlight[i].innerHTML = hightlight[i].innerHTML.replace(new RegExp(ele.value, 'gi'), `<span>${ele.value}</span>`)
    }
}

//validation

function productNameRegex() {
    var regex = /^[A-Z][a-z]{2,5}$/
    return (regex.test(productName.value))
}
function productPriceRegex() {
    var regex = /^[1-9][0-9]{1,}$/
    return (regex.test(productPrice.value))
}

function notNameValidation() {
    if (!productNameRegex()) {
        if (productName.value == '')
         { productNameFeedback.innerHTML = 'product name is requred' }
        else { productNameFeedback.innerHTML = 'not match , start with capital letter , 3-5 small ' }
    }
    else
    productNameFeedback.innerHTML =''
}
function notPriceValidation() {
    if (!productPriceRegex()) {
        if (productPrice.value == '') 
        { productPriceFeedback.innerHTML = 'product price is requred' }
        else { productPriceFeedback.innerHTML = 'not match   ' }
    }
    else
    productPriceFeedback.innerHTML =''
}

productName.addEventListener('keyup',notNameValidation)
productPrice.addEventListener('keyup',notPriceValidation)