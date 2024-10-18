var recordIndexItems;

loadItemTable();

var ValidItemID = $("#inputiId")
var ValidItemName = $("#inputName")
var ValidItemCat = $("#inputCategory")
var ValidItemWei = $("#inputweight")
var ValidItemPrice = $("#inputPrice")
var ValidItemQty = $("#inputQty")
var isValidItemNameAndCategory = new RegExp("\\b[A-Z][a-z]*( [A-Z][a-z]*)*\\b");
var isValidPriceAndQty = new RegExp("^[0-9]+\\.?[0-9]*$");

$(ValidItemID).on("input", function () {
    $(ValidItemID).css({
        border: "2px solid #B05200"
    });
});

$(ValidItemName).on("input", function () {
    $(ValidItemName).css({
        border: "2px solid #B05200"
    });
});

$(ValidItemPrice).on("input", function () {
    $(ValidItemPrice).css({
        border: "2px solid #B05200"
    });
});

$(ValidItemQty).on("input", function () {
    $(ValidItemQty).css({
        border: "2px solid #B05200"
    });
});

$(ValidItemCat).on("input", function () {
    $(ValidItemCat).css({
        border: "2px solid #B05200"
    });
});

$(ValidItemWei).on("input", function () {
    $(ValidItemWei).css({
        border: "2px solid #B05200"
    });
});

function loadItemTable() {
    $("#items-table-tb").empty();
    $.ajax({
        url: "http://localhost:8081/api/v1/products",
        method: "GET",
        success: function (results) {
            $('#items-table-tb').empty();
            console.log(results);
            results.forEach(function (post) {
                var record = `<tr>
                                <td>${post.productId}</td>     
                                <td>${post.productName}</td>
                                <td>${post.productType}</td>     
                                <td>${post.productWeight}</td>
                                <td>${post.productPrice}</td>
                                <td>${post.productQty}</td>
                            </tr>`;
                $('#items-table-tb').append(record);
            });
            $('#productCount').text(results.length);
        },
        error: function (error) {
            console.log(error);
            alert("An error occurred while fetching the posts.");
        }
    });


}

function clearAll() {
    $('#inputiId').val("");
    $('#inputName').val("");
    $('#inputCategory').val("");
    $('#inputweight').val("");
    $('#inputPrice').val("");
    $('#inputQty').val("");
}

$('#clearItems').on('click', () => {
    clearAll();
});

$('#items-table-tb').on('click','tr',function () {
    recordIndexItems = $(this).index();

    var id = $(this).find("td:eq(0)").text();
    var name = $(this).find("td:eq(1)").text();
    var category = $(this).find("td:eq(2)").text();
    var weight = $(this).find("td:eq(3)").text();
    var price = $(this).find("td:eq(4)").text();
    var qty = $(this).find("td:eq(5)").text();

    $('#inputiId').val(id);
    $('#inputName').val(name);
    $('#inputCategory').val(category);
    $('#inputweight').val(weight);
    $('#inputPrice').val(price);
    $('#inputQty').val(qty);
});

function defaultBorderColor() {
    $(ValidItemID).css({
        border: "2px solid black"
    });
    $(ValidItemName).css({
        border: "2px solid black"
    });
    $(ValidItemPrice).css({
        border: "2px solid black"
    });
    $(ValidItemQty).css({
        border: "2px solid black"
    });
    $(ValidItemCat).css({
        border: "2px solid black"
    });
    $(ValidItemWei).css({
        border: "2px solid black"
    });
}

function emptyPlaceHolder() {
    $(ValidItemID).attr("placeholder", "");
    $(ValidItemName).attr("placeholder", "");
    $(ValidItemCat).attr("placeholder", "");
    $(ValidItemWei).attr("placeholder", "");
    $(ValidItemPrice).attr("placeholder", "");
    $(ValidItemQty).attr("placeholder", "");
}

function validItem() {
    var itemID = $('#inputiId').val();
    var itemName = $('#inputName').val();
    var itemCat = $('#inputCategory').val();
    var itemWei = $('#inputweight').val();
    var itemPrice = $('#inputPrice').val();
    var itemQty = $('#inputQty').val();

    if (itemID === "" || !isValidItemNameAndCategory.test(itemName) || !isValidPriceAndQty.test(itemPrice) || !isValidPriceAndQty.test(itemQty)
        || !isValidItemNameAndCategory.test(itemCat) || !isValidPriceAndQty.test(itemWei)) {

        $(ValidItemID).css({
            border: "3px solid red"
        });
        $(ValidItemName).css({
            border: "3px solid red"
        });
        $(ValidItemPrice).css({
            border: "3px solid red"
        });
        $(ValidItemQty).css({
            border: "3px solid red"
        });
        $(ValidItemCat).css({
            border: "3px solid red"
        });
        $(ValidItemWei).css({
            border: "3px solid red"
        });

        $(ValidItemID).attr("placeholder", "ID Empty");
        $(ValidItemName).attr("placeholder", "Wrong Input Try Again");
        $(ValidItemPrice).attr("placeholder", "Wrong Input");
        $(ValidItemQty).attr("placeholder", "Wrong Input Try Again");
        $(ValidItemCat).attr("placeholder", "Wrong Input Try Again");
        $(ValidItemWei).attr("placeholder", "Wrong Input Try Again");

        $(ValidItemID).addClass('red');
        $(ValidItemName).addClass('red');
        $(ValidItemPrice).addClass('red');
        $(ValidItemQty).addClass('red');
        $(ValidItemCat).addClass('red');
        $(ValidItemWei).addClass('red');
        return true;
    } else {
        defaultBorderColor();
        emptyPlaceHolder();
    }
}

$('#saveItems').on('click',() => {
    var itemID = $('#inputiId').val();
    var itemName = $('#inputName').val();
    var itemCat = $('#inputCategory').val();
    var itemWei = $('#inputweight').val();
    var itemPrice = $('#inputPrice').val();
    var itemQty = $('#inputQty').val();

   /* if (itemID === "" || !isValidItemNameAndCategory.test(itemName) || !isValidPriceAndQty.test(itemPrice) || !isValidPriceAndQty.test(itemQty)
        || !isValidItemNameAndCategory.test(itemCat) || !isValidPriceAndQty.test(itemWei)) {
        validItem();
        return false;
    }*/
    $.ajax({
        url: "http://localhost:8081/api/v1/products/"+itemID,
        type: "GET",
        headers: {"Content-Type": "application/json"},
        success: (res) => {
            if (res && JSON.stringify(res).toLowerCase().includes("not found")) {
                var form = new FormData();
                form.append("id", itemID);
                form.append("name", itemName);
                form.append("type", itemCat);
                form.append("weight", itemWei);
                form.append("price", itemPrice);
                form.append("qty", itemQty);


                var settings = {
                    "url": "http://localhost:8081/api/v1/products",
                    "method": "POST",
                    "timeout": 0,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);
                    loadItemTable();
                    alert("Product Added Successfully");
                });

            } else{
                alert("Product already exists");
            }
        },
        error: (res) => {
            console.error(res);
        }
    });
    loadItemTable();
    clearAll();
});

$('#deleteItems').on('click',() => {
    var itemID = $('#inputiId').val();

    $.ajax({
        url: "http://localhost:8081/api/v1/products/"+itemID,
        type: "GET",
        headers: {"Content-Type": "application/json"},
        success: (res) => {
            if (res && JSON.stringify(res).toLowerCase().includes("not found")) {
                alert("Product not found");
            } else{
                var settings = {
                    "url": "http://localhost:8081/api/v1/products/"+itemID,
                    "method": "DELETE",
                    "timeout": 0,
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);
                    loadItemTable();
                    alert("Product Deleted Successfully");
                });
            }
        },
        error: (res) => {
            console.error(res);
        }
    });
    clearAll();
});

$('#updateItems').on('click',() => {
    var itemID = $('#inputiId').val();
    var itemName = $('#inputName').val();
    var itemCat = $('#inputCategory').val();
    var itemWei = $('#inputweight').val();
    var itemPrice = $('#inputPrice').val();
    var itemQty = $('#inputQty').val();

    $.ajax({
        url: "http://localhost:8081/api/v1/products/"+itemID,
        type: "GET",
        headers: {"Content-Type": "application/json"},
        success: (res) => {
            if (res && JSON.stringify(res).toLowerCase().includes("not found")) {
                alert("Product not found");
            } else{
                var form = new FormData();
                form.append("id", itemID);
                form.append("name", itemName);
                form.append("type", itemCat);
                form.append("weight", itemWei);
                form.append("price", itemPrice);
                form.append("qty", itemQty);

                var settings = {
                    "url": "http://localhost:8081/api/v1/products",
                    "method": "PATCH",
                    "timeout": 0,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);
                    loadItemTable();
                    alert("Product Updated Successfully");
                });
            }
        },
        error: (res) => {
            console.error(res);
        }
    });
    clearAll();
});