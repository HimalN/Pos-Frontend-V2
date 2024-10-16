import ItemModel from '../model/ItemsModel.js';
import {items} from "../db/db.js";
export {loadItemTable}
var recordIndexItems;

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

    items.map((item,index) => {
        var itemRecord = `<tr>
                        <td class="i-id">${item.id}</td>
                        <td class="i-name">${item.itemName}</td>
                        <td class="i-category">${item.category}</td>
                        <td class="i-weight">${item.weight}</td>
                        <td class="i-price">${item.price}</td>
                        <td class="i-qty">${item.qty}</td>
                    </tr>`
        $('#items-table-tb').append(itemRecord);
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

    var id = $(this).find(".i-id").text();
    var name = $(this).find(".i-name").text();
    var category = $(this).find(".i-category").text();
    var weight = $(this).find(".i-weight").text();
    var price = $(this).find(".i-price").text();
    var qty = $(this).find(".i-qty").text();

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

    if (itemID === "" || !isValidItemNameAndCategory.test(itemName) || !isValidPriceAndQty.test(itemPrice) || !isValidPriceAndQty.test(itemQty)
        || !isValidItemNameAndCategory.test(itemCat) || !isValidPriceAndQty.test(itemWei)) {
        validItem();
        return false;
    }
    let itemModel = new ItemModel(itemID, itemName, itemCat, itemWei, itemPrice, itemQty);

    items.push(itemModel);
    loadItemTable();
    clearAll();
    /*totalItems();*/
});

$('#deleteItems').on('click',() => {
    var itemID = $('#inputiId').val();
    var itemName = $('#inputName').val();
    var itemCat = $('#inputCategory').val();
    var itemWei = $('#inputweight').val();
    var itemPrice = $('#inputPrice').val();
    var itemQty = $('#inputQty').val();

    if (itemID === "" || !isValidItemNameAndCategory.test(itemName) || !isValidPriceAndQty.test(itemPrice) || !isValidPriceAndQty.test(itemQty)
        || !isValidItemNameAndCategory.test(itemCat) || !isValidPriceAndQty.test(itemWei)) {
        validItem();
        return false;
    }

    items.splice(recordIndexItems,1);
    loadItemTable();
    clearAll();
    /*totalItems();*/
});

$('#updateItems').on('click',() => {
    var itemID = $('#inputiId').val();
    var itemName = $('#inputName').val();
    var itemCat = $('#inputCategory').val();
    var itemWei = $('#inputweight').val();
    var itemPrice = $('#inputPrice').val();
    var itemQty = $('#inputQty').val();

    if (itemID === "" || !isValidItemNameAndCategory.test(itemName) || !isValidPriceAndQty.test(itemPrice) || !isValidPriceAndQty.test(itemQty)
        || !isValidItemNameAndCategory.test(itemCat) || !isValidPriceAndQty.test(itemWei)) {
        validItem();
        return false;
    }

    var iOb = items[recordIndexItems];
    iOb.id = itemID;
    iOb.name = itemName;
    iOb.category = itemCat;
    iOb.weight = itemWei;
    iOb.price = itemPrice;
    iOb.qty = itemQty;

    loadItemTable();
    clearAll();
    /*totalItems();*/
});