var recordIndexCustomers ;

loadCustomerTable();
/****THE VALIDATION STARTS HERE****/

var ValidCustomerID = $("#inputCId")
var ValidCustomerName = $("#inputCName")
var ValidCustomerAddress = $("#inputAddress")
var ValidCustomerPhoneNumber = $("#inputTp")
var isValidCustomerName = new RegExp("\\b[A-Z][a-z]*( [A-Z][a-z]*)*\\b");
var isValidCustomerAddress = new RegExp("^[A-Za-z0-9'\\/\\.,\\s]{5,}$");
var isValidPhoneNumber = new RegExp("^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$");

/*The red Border will go instantly when the user inputs some text in to the inout fields*/
$(ValidCustomerID).on("input", function () {
    $(ValidCustomerID).css({
        border: "1px solid black"
    });
});

$(ValidCustomerName).on("input", function () {
    $(ValidCustomerName).css({
        border: "1px solid black"
    });
});

$(ValidCustomerAddress).on("input", function () {
    $(ValidCustomerAddress).css({
        border: "1px solid black"
    });
});

$(ValidCustomerPhoneNumber).on("input", function () {
    $(ValidCustomerPhoneNumber).css({
        border: "1px solid black"
    });
});

/*After the customer Saved then this function will call and with this it wil clear all the placeholders*/
function emptyPlaceHolder() {
    $(ValidCustomerID).attr("placeholder", "");
    $(ValidCustomerName).attr("placeholder", "");
    $(ValidCustomerAddress).attr("placeholder", "");
    $(ValidCustomerPhoneNumber).attr("placeholder", "");
}

/*This will add Default border colors to the input fields soon as customer saves*/
function defaultBorderColor() {
    $(ValidCustomerID).css({
        border: "2px solid black"
    });
    $(ValidCustomerName).css({
        border: "2px solid black"
    });
    $(ValidCustomerAddress).css({
        border: "2px solid black"
    });
    $(ValidCustomerPhoneNumber).css({
        border: "2px solid black"
    });
}

/*Here is the Full validation happens with the RegExp method*/
function validCustomer() {
    var customerID = $('#inputCId').val();
    var customerName = $('#inputCName').val();
    var customerAddress = $('#inputAddress').val();
    var phoneNumber = $('#inputTp').val();

    if (customerID === "" || !isValidCustomerName.test(customerName) || !isValidCustomerAddress.test(customerAddress) || !isValidPhoneNumber.test(phoneNumber)) {

        $(ValidCustomerID).css({
            border: "3px solid red"
        });
        $(ValidCustomerName).css({
            border: "3px solid red"
        });
        $(ValidCustomerAddress).css({
            border: "3px solid red"
        });
        $(ValidCustomerPhoneNumber).css({
            border: "3px solid red"
        });

        $(ValidCustomerID).attr("placeholder", "ID Empty");
        $(ValidCustomerName).attr("placeholder", "Wrong Input Try Again");
        $(ValidCustomerAddress).attr("placeholder", "Wrong Input Try Again");
        $(ValidCustomerPhoneNumber).attr("placeholder", "Wrong Input Try Again");

        $(ValidCustomerID).addClass('red');
        $(ValidCustomerName).addClass('red');
        $(ValidCustomerAddress).addClass('red');
        $(ValidCustomerPhoneNumber).addClass('red');

    }  else {
        defaultBorderColor();
        emptyPlaceHolder();
    }
}

/****VALIDATION ENDS HERE****/


function loadCustomerTable() {
    $("#customers-table-tb").empty();
    $.ajax({
        url: "http://localhost:8081/api/v1/customers",
        type: "GET",
        dataType:'Json',
        success: function (results) {
            $('#customer-table').empty();
            results.forEach(function (post) {
                var record = `<tr>
                                <td class = "id">${post.id}</td>     
                                <td class = "name">${post.name}</td>
                                <td class = "address">${post.address}</td>     
                                <td class = "phoneNumber">${post.phone}</td>
                            </tr>`;
                $('#customers-table-tb').append(record);
            });
            $('#customerCount').text(results.length);
        },
        error: function (error) {
            console.log(error);
            alert("An error occurred while fetching the posts.");
        }
    });
}

function clearAll() {
    $('#inputCId').val("");
    $('#inputCName').val("");
    $('#inputAddress').val("");
    $('#inputTp').val("");
}

$('#clearAllCustomers').on('click',() => {
    clearAll();
});

$('#customers-table-tb').on('click','tr',function () {
    recordIndexCustomers = $(this).index();

    var id = $(this).find("td:eq(0)").text();
    var name = $(this).find("td:eq(1)").text();
    var address = $(this).find("td:eq(2)").text();
    var phoneNumber = $(this).find("td:eq(3)").text();

    $('#inputCId').val(id);
    $('#inputCName').val(name);
    $('#inputAddress').val(address);
    $('#inputTp').val(phoneNumber);
});

$('#saveCustomer').on('click', () => {

    var customerID = $('#inputCId').val();
    var customerName = $('#inputCName').val();
    var customerAddress = $('#inputAddress').val();
    var phoneNumber = $('#inputTp').val();

    if (customerID === "" || !isValidCustomerName.test(customerName) || !isValidCustomerAddress.test(customerAddress) || !isValidPhoneNumber.test(phoneNumber)) {
        validCustomer();
        return;
    }


    $.ajax({
        url: "http://localhost:8081/api/v1/customers/"+customerID,
        type: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        success:  (res) =>{
            if (res && JSON.stringify(res).toLowerCase().includes("not found")) {
                var form = new FormData();
                form.append("customerID", customerID);
                form.append("customerName", customerName);
                form.append("customerAddress", customerAddress);
                form.append("phoneNumber", phoneNumber);

                var settings = {
                    "url": "http://localhost:8081/api/v1/customers",
                    "method": "POST",
                    "timeout": 0,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);
                });
                alert("Customer Added");
                loadCustomerTable();
            } else {
                alert("Customer ID already exists");
            }

        }
        }
    )
});

$('#deleteCustomer').on('click',() => {
    var customerID = $('#inputCId').val();
    var customerName = $('#inputCName').val();
    var customerAddress = $('#inputAddress').val();
    var phoneNumber = $('#inputTp').val();

    if (customerID === "" || !isValidCustomerName.test(customerName) || !isValidCustomerAddress.test(customerAddress) || !isValidPhoneNumber.test(phoneNumber)) {
        validCustomer();
        return;
    }

    customers.splice(recordIndexCustomers,1);
    defaultBorderColor();
    emptyPlaceHolder();
    loadCustomerTable();
    clearAll();
    /*totalCustomers();*/
});

$('#updatedCustomer').on('click',() => {

    var customerID = $('#inputCId').val();
    var customerName = $('#inputCName').val();
    var customerAddress = $('#inputAddress').val();
    var phoneNumber = $('#inputTp').val();

    $.ajax({
        url:"http://localhost:8081/api/v1/customers/"+customerID,
        type:"GET",
        headers: {"Content-type": "application/json"},
        success: (res) => {
            if (res && JSON.stringify(res).toLowerCase().includes("not found")) {
                alert("Customer ID not found");
            } else {
                var form = new FormData();
                form.append("customerId", customerID);
                form.append("customerName", customerName);
                form.append("customerAddress", customerAddress);
                form.append("customerPhone", phoneNumber);

                var settings = {
                    "url": "http://localhost:8081/api/v1/customers",
                    "method": "PATCH",
                    "timeout": 0,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);
                    console.log("Customer Updated");
                    alert("Customer Updated");
                    loadCustomerTable();
                });
            }
        },
        error: (res) => {
            console.error(res);
        }
    })
    defaultBorderColor();
    emptyPlaceHolder();
    loadCustomerTable();
    clearAll();
});