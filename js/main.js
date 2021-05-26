let shopItems = [];
let btns = [];
$(document).ready(function () {

    products.forEach(item =>{
        $('.products').append($(`<div class="col-md-6 col-sm-12 col-lg-3 product p-4 mb-2">
        <img src="${item.image}" alt="Error Img" class="w-100 mb-2">
        <h3 class="text-center fs-4">${item.name}</h3>
        <h4 class="text-center">${item.price} $</h4>
        <button class="btn btn-danger w-100 ${item.sku}" onclick="addToCart(${item.sku})">Add to card</button>
        </div>`))
    })
    
    $('#cart').click(()=>{
        $('#cartModal').modal('show');
        $('.modal-body').html('');
        modalWrite(shopItems);
        
    })
        
});



function addToCart(sku){
    let p = products.find(item => item.sku == sku);
    p.count = 1;
    if(p){
        shopItems.push(p);
    }
    $('.count').text (shopItems.length);
    $(`.${sku}`).text('In card');
    $(`.${sku}`).attr('disabled', 'true');

}

function modalWrite(array){
    array.map(item =>{
        $('.modal-tana').append($(`<div class="shopItem-modal ">
            <img src="${item.image}" style="height:70px;" alt="">
            <h4>${item.name}</h4>
            <div class="calc-area">
                <h5>${item.price} $</h5>
                <button onclick = "plusAndMinus(true, ${item.sku})">+</button>
                <h4>${item.count}</h4>
                <button onclick = "plusAndMinus(false, ${item.sku})">-</button>
                <h5>${(item.price*item.count).toFixed(2)} $</h5>
            </div>
            <a href="#" onclick="deleteModalItem(${item.sku})" class="text-danger"><i class="fa fa-trash"></i></a>
        </div>`))
    })
}

function plusAndMinus(isPlus, sku){
    var product = shopItems.find(item => item.sku ==sku);
    if(isPlus){
            product.count += 1;
    }
    else{
        if(product.count>1){
            product.count -=1;
        }
    }
    var shopItems2 = [];
    shopItems.map(item =>{
        if (item.sku == product.sku){
            shopItems2.push(product)
        }
        else{
            shopItems2.push(item)
        }
    })
    shopItems = shopItems2;
    $('.modal-tana').html('');
    modalWrite(shopItems);
}

function deleteModalItem(sku){
    var shopItems2 = [];
    shopItems.map(item =>{
        if(!(item.sku == sku)){
            shopItems2.push(item);
        }
    })
    shopItems = shopItems2;
    $('.modal-tana').html('');
    modalWrite(shopItems2);
}
