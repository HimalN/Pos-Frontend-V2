
$('.dashboard').css({display:'block'})
$('.customer').css({display:'none'})
$('.products').css({display:'none'})
$('.orders').css({display:'none'})

$("#nav-home").eq(0).on('click', ()=>{
    $('.customer').css({display:'none'})
    $('.products').css({display:'none'})
    $('.dashboard').css({display:'block'})
    $('.orders').css({display:'none'})
});

$("#nav-customer").eq(0).on('click', ()=>{
    $('.customer').css({display:'block'})
    $('.products').css({display:'none'})
    $('.dashboard').css({display:'none'})
    $('.orders').css({display:'none'})
});
$("#nav-products").eq(0).on('click', ()=>{
    $('.customer').css({display:'none'})
    $('.products').css({display:'block'})
    $('.orders').css({display:'none'})
    $('.dashboard').css({display:'none'})
});
$("#nav-orders").eq(0).on('click', ()=>{
    $('.customer').css({display:'none'})
    $('.products').css({display:'none'})
    $('.dashboard').css({display:'none'})
    $('.orders').css({display:'block'})
});
