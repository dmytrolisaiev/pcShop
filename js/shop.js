/*Корзина*/
const cart = document.querySelector('.cart');  //Находим корзину
const cartClose = document.querySelector('.cart__close'); //Находим кнопку закрыть корзину
const cartLink = document.querySelector('.cart-items');   //Находим кнопку Открыть корзину
const counterIndicator = document.querySelector('[data-counterIndicator]'); //Находим индикатор корзины
const cartContainer = cart.querySelector('.cart__container');   //Находим контейнер товаров корзины
const cart__summary= cart.querySelector('.cart__summary');      //Находим поле суммы по товару

/*Открываем корзину */
cartLink.addEventListener('click',function(){
    cart.classList.toggle('open');
    document.body.classList.toggle('active');
});

/*Закрываем корзину */
cartClose.addEventListener('click',function(){
     cart.classList.remove('open');
    document.body.classList.remove('active');
});

/*Ищем элементы заголовка, сообщения и подвал корзины*/
const  cart__title   = cart.querySelector('.cart__title');
const  cart__message = cart.querySelector('.cart__message');       
const  cart__bottom  = cart.querySelector('.cart__bottom'); 




/*Ф-ция подсчета суммы 1го товара и всех */
function calcAndPrintSumCart(){
    const totalPriceContainer = document.querySelector('.cart__summary');
    const itemInCard = document.querySelectorAll('.cart__product');
    let totalCartSum = 0;
    
    itemInCard.forEach(function(card){
        const thisCardCount = card.querySelector('[data-counter]');
        const thisCardPrice = card.querySelector('.cart__product-price');
        const thisCardSummary = card.querySelector('.cart__product-summary');
        const thisCardSum   = parseFloat(thisCardCount.value)* parseFloat(thisCardPrice.innerText);
        thisCardSummary.innerText = thisCardSum + ' грн.';
        totalCartSum = totalCartSum+thisCardSum;
    });
    totalPriceContainer.innerText = 'До сплати ' + totalCartSum + ' грн.';
    
}

/*Ф-ция изменения счетчика товаров на иконке корзины */
function countChange(){
    let countInCart = 0;
    const allCard = document.querySelectorAll('.cart__product');
    allCard.forEach(function(item){
        const thisCounter = item.querySelector('[data-counter]');
        countInCart = countInCart + parseInt(thisCounter.value);
    });
    counterIndicator.innerText = countInCart;
    if(countInCart===0){
        counterIndicator.innerText= "";
    }
}/*Ф-ция изменения счетчика товаров методом ввода в инпут */
function inputCountChange(){
        const allCounterInput = document.querySelectorAll('[data-counter]');
        allCounterInput.forEach(function(input){
        input.oninput = function(){
        if(parseInt(input.value)<0){
            input.value= 0; 
        }
        else if(input.value=='-'){
            input.value= 0;        }
        }
        
        })
};

/*Показываем и прячем сообщения*/
function ShowMessageInCart(){
    
    if(cart.querySelector('.cart__product')!=null){
     cart__title.classList.add('WithProduct');
     cart__message.classList.add('WithProduct');
     cart__bottom.classList.add('WithProduct');
    }
    else{
     cart__title.classList.remove('WithProduct');
     cart__message.classList.remove('WithProduct');
     cart__bottom.classList.remove('WithProduct');
    }
 
}


document.addEventListener('click', function(event){
    
    /*Когда нажали на кнопку добавления в корзину*/
    if(event.target.hasAttribute("data-addCartButton"))
    {
        /*Берем информацию о товаре, который выбрали */
        const currentCard  = event.target.closest('.card');
        const currentCardInfo = {
                articul: currentCard.dataset.articul,
                imgSrc: currentCard.querySelector('img').getAttribute("src"),
                title: currentCard.querySelector('.card_title').innerText,
                price:currentCard.querySelector(".card_price").innerText,
                count:1
        }

        /*Если товар уже есть в корзине */
        const curentProductInCart = cartContainer.querySelector(`[data-articul="${currentCardInfo.articul}"]`);
        if(curentProductInCart){
            const dataCounter = curentProductInCart.querySelector('[data-counter]');
            dataCounter.value = parseInt(dataCounter.value)+currentCardInfo.count;
            

        }
        else{
        /*Шаблон карточки в корзине*/
        let productInCartHtml  = 
        `<div class="cart__product" data-articul="${currentCardInfo.articul}">
    <div class="cart__product-remove">
        Видалити
    </div>
    <div class="cart__product-photo">
        <img src="${currentCardInfo.imgSrc}" alt="Товар" width="150">
    </div>
    <div class="cart__product-info">
        <div class="cart__product-title">
            ${currentCardInfo.title}
        </div>
        <div class="cart__product-price">
            ${currentCardInfo.price}
        </div>
        <div class="cart__product-actions">
            <button data-action="minus">-</button>
            <input type="text" name="" value="${currentCardInfo.count}" data-counter id="">
            <button data-action="plus">+</button>
        </div>
        <div class="cart__product-summary">
        </div>
    </div>
        </div>`;
        /*Добавляем перед концом контейнера товаров корзины*/
        cartContainer.insertAdjacentHTML('beforeend',productInCartHtml);
        }
        
       
   
    }
    /*Меняем количество товаров в корзине*/
    if(event.target.closest('.cart__product')){
        const cardCounter = event.target.closest('.cart__product').querySelector('[data-counter]');
        /*Если нажали на минус*/
        if(event.target.dataset.action==='minus'){
       /*Если товаров больше 1*/
       if(cardCounter.value>1){
        cardCounter.value = --cardCounter.value;
       

       }
        /*Если товаров меньше*/
       else{
        cardCounter.closest('.cart__product').remove();
        
       }
       }
        /*Если нажали на плюс*/
        if(event.target.dataset.action==='plus'){
         cardCounter.value = ++cardCounter.value;
       
        }
        if(event.target.classList.contains('cart__product-remove')){
        event.target.closest('.cart__product').remove();
        }
        
     
    }
    countChange();
    calcAndPrintSumCart();
    inputCountChange();
    ShowMessageInCart();

});















