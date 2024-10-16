import OrdersModel from '../model/OrdersModel.js';
import {orders} from "../db/db.js";
import {customers} from "../db/db.js";
import {items} from "../db/db.js";
import {loadItemTable} from "./ItemsController.js";
var recordIndexOrders;

var ValidCustomerId = $("#inputOCId");
var ValidCustomerName = $("#inputOCName");
var ValidAddress = $("#inputOCAddress");
var ValidTp = $("#inputOCTp");
var ValidItemId = $("#inputOIId");
var ValidItemName = $("#inputOIName");
var ValidQty = $("#inputOIQty");
var ValidPrice = $("#inputOIprice");
var ValidOrderId = $("#inputOrderId");
var ValidOrderDate = $("#inputODate");
var isValidName = new RegExp("\\b[A-Z][a-z]*( [A-Z][a-z]*)*\\b");
var isValidPriceAndQty = new RegExp("^[0-9]+\\.?[0-9]*$");
var isValidPhoneNumber = new RegExp("^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$");
var isValidCustomerAddress = new RegExp("^[A-Za-z0-9'\\/\\.,\\s]{5,}$");

$(ValidCustomerId).on("input", function () {
    $(ValidCustomerId).css({
        border: "2px solid black"
    });
});
$(ValidCustomerName).on("input", function () {
    $(ValidCustomerName).css({
        border: "2px solid black"
    });
});
$(ValidAddress).on("input", function () {
    $(ValidAddress).css({
        border: "2px solid black"
    });
});
$(ValidTp).on("input", function () {
    $(ValidTp).css({
        border: "2px solid black"
    });
});
$(ValidItemId).on("input", function () {
    $(ValidItemId).css({
        border: "2px solid black"
    });
});
$(ValidItemName).on("input", function () {
    $(ValidItemName).css({
        border: "2px solid black"
    });
});
$(ValidQty).on("input", function () {
    $(ValidQty).css({
        border: "2px solid black"
    });
});
$(ValidPrice).on("input", function () {
    $(ValidPrice).css({
        border: "2px solid black"
    });
});
$(ValidOrderId).on("input", function () {
    $(ValidOrderId).css({
        border: "2px solid black"
    });
});
$(ValidOrderDate).on("input", function () {
    $(ValidOrderDate).css({
        border: "2px solid black"
    });
});

function ClearAll() {
    $('#inputOCId').val("");
    $('#inputOCName').val("");
    $('#inputOCAddress').val("");
    $('#inputOCTp').val("");
    $('#inputOIId').val("");
    $('#inputOIName').val("");
    $('#inputOIQty').val("");
    $('#inputOIprice').val("");
    $('#inputOrderId').val("");
    $('#inputODate').val("");
    $('#price').val("");
}

function searchCustomers(term) {
    const searchTerm = term.toLowerCase();

    for (let i = 0; i < customers.length; i++) {
        if (searchTerm === customers[i].id.toLowerCase() || searchTerm === customers[i].telephone.toLowerCase()) {
            $('#inputOCId').val(customers[i].id);
            $('#inputOCName').val(customers[i].name);
            $('#inputOCAddress').val(customers[i].address);
            $('#inputOCTp').val(customers[i].telephone);
            break;
        }
    }
}

$('#inputOCId').on('input', function() {
    const searchQuery = $('#inputOCId').val();
    searchCustomers(searchQuery);
});

function searchItems(term) {
    const searchTerm = term.toLowerCase();

    for (let i = 0; i < items.length; i++) {
        if (searchTerm === items[i].id.toLowerCase() || searchTerm === items[i].itemName.toLowerCase()) {
            $('#inputOIId').val(items[i].id);
            $('#inputOIName').val(items[i].itemName);
            $('#inputOIprice').val(items[i].price);
        }
    }
}

$('#inputOIId').on('input', function() {
    const searchQuery = $('#inputOIId').val();
    searchItems(searchQuery);
});

function loadOrderTable() {
    $("#orders-table-tb").empty();

    orders.map((item, index) => {
        var orderRecord = `<tr>
            <td class="o-id">${item.orderId}</td>
            <td class="o-date">${item.date}</td>
            <td class="o-customerId">${item.customerId}</td>
            <td class="o-customerName">${item.cName}</td>
            <td class="o-address">${item.address}</td>
            <td class="o-tp">${item.tp}</td>
            <td class="o-itemId">${item.itemId}</td>
            <td class="o-itemName">${item.iName}</td>
            <td class="o-qty">${item.qty}</td>
            <td class="o-price">${item.price}</td>
            <td class="o-total">${item.total}</td>
        </tr>`
        $('#orders-table-tb').append(orderRecord);
    });
}

$('#orders-table-tb').on('click','tr',function () {
    recordIndexOrders = $(this).index();

    var oId = $(this).find(".o-id").text();
    var orderDate = $(this).find(".o-date").text();
    var customerId = $(this).find(".o-customerId").text();
    var customerName = $(this).find(".o-customerName").text();
    var address = $(this).find(".o-address").text();
    var tp = $(this).find(".o-tp").text();
    var itemId = $(this).find(".o-itemId").text();
    var itemName = $(this).find(".o-itemName").text();
    var qty = $(this).find(".o-qty").text();
    var price = $(this).find(".o-price").text();
    var total = $(this).find(".o-total").text();

    $('#inputOCId').val(customerId);
    $('#inputOCName').val(customerName);
    $('#inputOCAddress').val(address);
    $('#inputOCTp').val(tp);
    $('#inputOIId').val(itemId);
    $('#inputOIName').val(itemName);
    $('#inputOIQty').val(qty);
    $('#inputOIprice').val(price);
    $('#inputOrderId').val(oId);
    $('#inputODate').val(orderDate);
    $('#price').val(total);
});

function validOrder() {
    var customerId = $('#inputOCId').val();
    var customerName = $('#inputOCName').val();
    var address = $('#inputOCAddress').val();
    var tp = $('#inputOCTp').val();
    var itemId = $('#inputOIId').val();
    var itemName = $('#inputOIName').val();
    var qty = $('#inputOIQty').val();
    var price = $('#inputOIprice').val();
    var orderId = $('#inputOrderId').val();
    var orderDate = $('#inputODate').val();

    if (itemId === "" || orderId === "" || customerId === "" || orderDate === "" || !isValidName.test(itemName)
        || !isValidPriceAndQty.test(price) || !isValidPriceAndQty.test(qty) || !isValidPhoneNumber.test(tp)
        || !isValidName.test(customerName) || !isValidPhoneNumber.test(tp) || !isValidCustomerAddress.test(address)) {

        $(ValidCustomerId).css({
            border: "3px solid red"
        });
        $(ValidCustomerName).css({
            border: "3px solid red"
        });
        $(ValidAddress).css({
            border: "3px solid red"
        });
        $(ValidTp).css({
            border: "3px solid red"
        });
        $(ValidItemId).css({
            border: "3px solid red"
        });
        $(ValidItemName).css({
            border: "3px solid red"
        });
        $(ValidQty).css({
            border: "3px solid red"
        });
        $(ValidPrice).css({
            border: "3px solid red"
        });
        $(ValidOrderId).css({
            border: "3px solid red"
        });
        $(ValidOrderDate).css({
            border: "3px solid red"
        });

        $(ValidCustomerId).attr("placeholder", "ID Empty");
        $(ValidCustomerName).attr("placeholder", "Wrong Input Try Again");
        $(ValidAddress).attr("placeholder", "Wrong Input");
        $(ValidTp).attr("placeholder", "Wrong Input");
        $(ValidItemId).attr("placeholder", "Wrong Input");
        $(ValidItemName).attr("placeholder", "Wrong Input");
        $(ValidQty).attr("placeholder", "Wrong Input");
        $(ValidPrice).attr("placeholder", "Wrong Input Try Again");
        $(ValidOrderId).attr("placeholder", "Wrong Input");
        $(ValidOrderDate).attr("placeholder", "Wrong Input");

        $(ValidCustomerId).addClass('red');
        $(ValidCustomerName).addClass('red');
        $(ValidAddress).addClass('red');
        $(ValidTp).addClass('red');
        $(ValidItemId).addClass('red');
        $(ValidItemName).addClass('red');
        $(ValidQty).addClass('red');
        $(ValidPrice).addClass('red');
        $(ValidOrderId).addClass('red');
        $(ValidOrderDate).addClass('red');
    }
}

function emptyPlaceHolder() {
    $(ValidCustomerId).attr("placeholder", "");
    $(ValidCustomerName).attr("placeholder", "");
    $(ValidAddress).attr("placeholder", "");
    $(ValidTp).attr("placeholder", "");
    $(ValidItemId).attr("placeholder", "");
    $(ValidItemName).attr("placeholder", "");
    $(ValidQty).attr("placeholder", "");
    $(ValidPrice).attr("placeholder", "");
    $(ValidOrderId).attr("placeholder", "");
    $(ValidOrderDate).attr("placeholder", "");
}

function defaultBorderColor() {
    $(ValidCustomerId).css({
        border: "2px solid black"
    });
    $(ValidCustomerName).css({
        border: "2px solid black"
    });
    $(ValidAddress).css({
        border: "2px solid black"
    });
    $(ValidTp).css({
        border: "2px solid black"
    });
    $(ValidItemId).css({
        border: "2px solid black"
    });
    $(ValidItemName).css({
        border: "2px solid black"
    });
    $(ValidQty).css({
        border: "2px solid black"
    });
    $(ValidPrice).css({
        border: "2px solid black"
    });
    $(ValidOrderId).css({
        border: "2px solid black"
    });
    $(ValidOrderDate).css({
        border: "2px solid black"
    });
}

$('#placeOrder').on('click', function() {

    var customerId = $('#inputOCId').val();
    var customerName = $('#inputOCName').val();
    var address = $('#inputOCAddress').val();
    var tp = $('#inputOCTp').val();

    var itemId = $('#inputOIId').val();
    var itemName = $('#inputOIName').val();
    var qty = $('#inputOIQty').val();
    var price = $('#inputOIprice').val();

    var orderId = $('#inputOrderId').val();
    var orderDate = $('#inputODate').val();

    var total = price * qty;

    if (itemId === "" || orderId === "" || customerId === "" || orderDate === "" || !isValidName.test(itemName)
        || !isValidPriceAndQty.test(price) || !isValidPriceAndQty.test(qty) || !isValidPhoneNumber.test(tp)
        || !isValidName.test(customerName) || !isValidPhoneNumber.test(tp) || !isValidCustomerAddress.test(address)) {
        validOrder();
        return false;
    }

    var existingItemIndex = items.findIndex(item => item.id === itemId);

    if (existingItemIndex !== -1) {
        /*If the item exists, update its quantity*/
        items[existingItemIndex].qty -= qty;
    }

    var existingOrderIndex = orders.findIndex(order => order.customerId === customerId && order.itemId === itemId);

    if (existingOrderIndex !== -1) {
        /*If the order already exists for the same customer and item, update it*/
        orders[existingOrderIndex].qty += parseInt(qty);
        orders[existingOrderIndex].total += total;
    } else {
        /*If the order doesn't exist, create a new one*/
        let orderModel = new OrdersModel(orderId,orderDate,customerId,customerName,address,tp,itemId,itemName,qty,price,total);
        orders.push(orderModel);
    }

    emptyPlaceHolder();
    defaultBorderColor();
    loadOrderTable();
    loadItemTable();
    updatePriceTag();
    ClearAll();
});

function updatePriceTag() {
    let totalPrice = 0;
    orders.forEach(order => {
        totalPrice += order.total;
    });
    $('#price').text("Rs : "+totalPrice+"/=");
}

$('#deleteOrders').on('click', function () {
    var customerId = $('#inputOCId').val();
    var customerName = $('#inputOCName').val();
    var address = $('#inputOCAddress').val();
    var tp = $('#inputOCTp').val();
    var itemId = $('#inputOIId').val();
    var itemName = $('#inputOIName').val();
    var qty = $('#inputOIQty').val();
    var price = $('#inputOIprice').val();
    var orderId = $('#inputOrderId').val();
    var orderDate = $('#inputODate').val();


    if (itemId === "" || orderId === "" || customerId === "" || orderDate === "" || !isValidName.test(itemName)
        || !isValidPriceAndQty.test(price) || !isValidPriceAndQty.test(qty) || !isValidPhoneNumber.test(tp)
        || !isValidName.test(customerName) || !isValidPhoneNumber.test(tp) || !isValidCustomerAddress.test(address)) {
        validOrder();
        return false;
    }
    orders.splice(recordIndexOrders,1);
    emptyPlaceHolder();
    defaultBorderColor();
    loadOrderTable();
    updatePriceTag();
    ClearAll();
});

$('#updateOrders').on('click',function () {

    var customerId = $('#inputOCId').val();
    var customerName = $('#inputOCName').val();
    var address = $('#inputOCAddress').val();
    var tp = $('#inputOCTp').val();

    var itemId = $('#inputOIId').val();
    var itemName = $('#inputOIName').val();
    var qty = $('#inputOIQty').val();
    var price = $('#inputOIprice').val();

    var orderId = $('#inputOrderId').val();
    var orderDate = $('#inputODate').val();

    var totalPrice = price * qty;

    if (itemId === "" || orderId === "" || customerId === "" || orderDate === "" || !isValidName.test(itemName)
        || !isValidPriceAndQty.test(price) || !isValidPriceAndQty.test(qty) || !isValidPhoneNumber.test(tp)
        || !isValidName.test(customerName) || !isValidPhoneNumber.test(tp) || !isValidCustomerAddress.test(address)) {
        validOrder();
        return false;
    }

    var oOb = orders[recordIndexOrders];
    var oldOrderQty = parseInt(oOb.qty);

    oOb.orderId = orderId;
    oOb.date = orderDate;
    oOb.customerId = customerId;
    oOb.cName = customerName;
    oOb.address = address;
    oOb._tp = tp;
    oOb.itemId = itemId;
    oOb.iName = itemName;
    oOb.qty = qty;
    oOb.price = price;
    oOb.total = totalPrice;

    var existingItemIndex = items.findIndex(item => item.id === itemId);

    if (existingItemIndex !== -1) {
        var existingQty = parseInt(items[existingItemIndex].qty);
        var qtyDifference = qty - oldOrderQty;

        items[existingItemIndex].qty = existingQty - qtyDifference;
    }

    emptyPlaceHolder();
    defaultBorderColor();
    loadOrderTable();
    loadItemTable();
    updatePriceTag();
    ClearAll();
});