import {orders,items,customers} from "../db/db.js";

$("#nav-home").eq(0).on('click', ()=>{
    totalOrders();
    totalCustomers();
    totalItems();
    totalSales();
});

function totalOrders() {
    var total = orders.length;
    $('#totalOrdersHome').text(total);
}

function totalCustomers() {
    var total = customers.length;
    $('#totalCustomersHome').text(total);
}

function totalItems() {
    var total = items.length;
    $('#totalItemsHome').text(total);
}

function totalSales() {
    let totalSales = 0;
    orders.forEach(order => {
        totalSales += order.total;
    });
    $('#sales').text("Rs : "+totalSales+"/=");
}