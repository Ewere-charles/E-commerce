//Hamburger menu and control

const hamburger = document.querySelector('#hamburger');
const overlay = document.querySelector('#overlay');
const menu = document.querySelector('#menu');

const hamburgerIcons = {
    open: '<svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z" fill="#69707D" fill-rule="evenodd"/></svg>',
    close: '<svg width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fill-rule="evenodd"/></svg>'
}


let count = 0;

hamburger.addEventListener('click', ()=>{
    count++;
    switch (count) {

            case 1:
                hamburger.innerHTML = hamburgerIcons.close;
                overlay.classList.add('appear');
                menu.classList.add('slide-in');
                overlay.classList.remove('vanish');
                menu.classList.remove('slide-out');

                overlay.classList.add('flex');
                overlay.classList.remove('hidden');
            break;
    
            default:
                hamburger.innerHTML = hamburgerIcons.open;
                overlay.classList.remove('appear');
                menu.classList.remove('slide-in');
                overlay.classList.add('vanish');
                menu.classList.add('slide-out');

                setTimeout(()=>{
                    overlay.classList.remove('flex')
                    overlay.classList.add('hidden');
                }, 600);

            break;
    }

    
    count > 1 ? count = 0 : count;
});



//product image controller

const productImage = document.querySelector('#product_img');
const thumbnails = document.querySelectorAll('.thumbnail');
const prevs = document.querySelectorAll('.prev');
const nexts = document.querySelectorAll('.next');



thumbnails.forEach((thumbnail, tIndex) => {

    const thumbnailParent = thumbnail.closest('div');

    thumbnail.addEventListener('click', ()=>{
        thumbnails.forEach(nonActive => {
            nonActive.classList.remove('active_image');
            const nonActiveParent = nonActive.closest('div');
            nonActiveParent.classList.remove('active');
        });

        if(thumbnail){
            changeImage(tIndex);
            thumbnail.classList.add('active_image');
            thumbnailParent.classList.add('active');
        }
        else{
            thumbnailParent.classList.remove('active');
        }
    })
});

function changeImage(number){
    return productImage.setAttribute('src', `./images/image-product-${number + 1}.jpg`);
}


let imageCounter = Math.abs(0);

nexts.forEach((next) => {
    next.addEventListener('click', () => {
        imageCounter++;
        const nextImage = imageCounter % thumbnails.length;
      
        // Remove active_image and active classes from all thumbnails
        thumbnails.forEach(thumbnail => {
          const thumbnailParent = thumbnail.closest('div');
          thumbnail.classList.remove('active_image');
          thumbnailParent.classList.remove('active');
        });
      
        // Add active_image and active classes to the next thumbnail
        const nextThumbnail = thumbnails[nextImage];
        const nextThumbnailParent = nextThumbnail.closest('div');
        nextThumbnail.classList.add('active_image');
        nextThumbnailParent.classList.add('active');
    
        
        console.log(`imageCounter = ${imageCounter} / ${thumbnails.length} and remainder = ${nextImage}`);
      
        changeImage(nextImage);
      });
})

prevs.forEach((prev) =>{
    prev.addEventListener('click', ()=> {
        if(imageCounter < 1){
            imageCounter = 4 ;
        }
        imageCounter--;
        const prevImage = Math.abs(imageCounter % thumbnails.length);

        //removing default active class

        thumbnails.forEach(thumbnail => {
            const parentThumbnail = thumbnail.closest('div');
            parentThumbnail.classList.remove('active');
            thumbnail.classList.remove('active_image');
        });

      
        // Add active_image and active classes to the next thumbnail
        
        const oldThumbnailp = thumbnails[prevImage];
        const oldParentThumbnailp = oldThumbnailp.closest('div');
        oldThumbnailp.classList.add('active_image');
        oldParentThumbnailp.classList.add('active');
        
        changeImage(prevImage);
    });
});


//veiw product section 
const body = document.querySelector('body');


productImage.addEventListener('click', () => {
    const clickedThumbnail = document.createElement('div');
    const product = productImage.closest('div');
    const productClone = product.cloneNode(true);

    const prevBtn = productClone.querySelector('.prev');
    const nextBtn = productClone.querySelector('.next');
    const modalProductImage = productClone.querySelector('#product_img');
    const modalThumbnails = productClone.querySelectorAll('.thumbnail');

    prevBtn.innerHTML = product.querySelector('.prev').innerHTML;
    nextBtn.innerHTML = product.querySelector('.next').innerHTML;

    prevBtn.classList.remove('md:hidden', 'top-[50%]', 'sm:left-[8%]');
    nextBtn.classList.remove('md:hidden', 'top-[50%]', 'sm:right-[8%]');


    prevBtn.classList.add('top-[40%]', 'md:-left-5');
    nextBtn.classList.add('top-[40%]', 'md:-right-5');

    const exit = document.createElement('button');
    exit.innerHTML = '<svg class=" fill-white hover:fill-orange-400" width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill-rule="evenodd"/></svg>';

    exit.classList.add('absolute', 'top-[-20px]', 'right-4', 'md:top-[65px]', 'md:right-0')

    productClone.appendChild(exit);

    clickedThumbnail.classList.add('pt-[50px]','md:pt-0', 'bg-[#000000f5]', 'z-50', 'fixed', 'top-0', 'left-0', 'h-full', 'w-full', 'flex', 'items-center', 'justify-center');
    clickedThumbnail.appendChild(productClone);
    body.appendChild(clickedThumbnail);

    exit.addEventListener('click', ()=>{
        clickedThumbnail.classList.add('hidden');
    })
    
    clickedThumbnail.classList.remove('hidden');



        prevBtn.addEventListener('click', ()=> {
            if(imageCounter < 1){
                imageCounter = 4 ;
            }
            imageCounter--;
            
            const prevImage = Math.abs(imageCounter % modalThumbnails.length);


            modalThumbnails.forEach(modalThumbnail => {
                const parentModalThumbnail = modalThumbnail.closest('div');
                parentModalThumbnail.classList.remove('active');
                modalThumbnail.classList.remove('active_image');
            });

            thumbnails.forEach(thumbnail => {
                const parentThumbnail = thumbnail.closest('div');
                parentThumbnail.classList.remove('active');
                thumbnail.classList.remove('active_image');
            });

          
            // Add active_image and active classes to the next thumbnail

            const activeThumbnailp = modalThumbnails[prevImage];
            const activeParentThumbnailp = activeThumbnailp.closest('div');
            activeThumbnailp.classList.add('active_image');
            activeParentThumbnailp.classList.add('active');

            const oldThumbnailp = thumbnails[prevImage];
            const oldParentThumbnailp = oldThumbnailp.closest('div');
            oldThumbnailp.classList.add('active_image');
            oldParentThumbnailp.classList.add('active');


            
            modalChangeImage(prevImage);
            changeImage(prevImage);
        });

        nextBtn.addEventListener('click', () => {
            imageCounter++;
            const nextImage = imageCounter % modalThumbnails.length;
          
            // Remove active_image and active classes from all thumbnails

            modalThumbnails.forEach(modalThumbnail => {
                const parentModalThumbnail = modalThumbnail.closest('div');
                parentModalThumbnail.classList.remove('active');
                modalThumbnail.classList.remove('active_image');
            });

            thumbnails.forEach(thumbnail => {
                const parentThumbnail = thumbnail.closest('div');
                parentThumbnail.classList.remove('active');
                thumbnail.classList.remove('active_image');
            });

          
            // Add active_image and active classes to the next thumbnail

            const activeThumbnailn = modalThumbnails[nextImage];
            const activeParentThumbnailn = activeThumbnailn.closest('div');
            activeThumbnailn.classList.add('active_image');
            activeParentThumbnailn.classList.add('active');

            const oldThumbnailn = thumbnails[nextImage];
            const oldParentThumbnailn = oldThumbnailn.closest('div');
            oldThumbnailn.classList.add('active_image');
            oldParentThumbnailn.classList.add('active');

            
            // console.log(`imageCounter = ${imageCounter} / ${thumbnails.length} and remainder = ${nextImage}`);
          
            modalChangeImage(nextImage);
            changeImage(nextImage);
          });

          modalThumbnails.forEach((modalThumbnail, modalIndex) =>{
            
            const thumbnailModalParent = modalThumbnail.closest('div');

                modalThumbnail.addEventListener('click', ()=>{
                    
                    modalThumbnails.forEach(nonActiveModal => {
                        const nonActiveModalParent = nonActiveModal.closest('div');
                        nonActiveModalParent.classList.remove('active');
                        nonActiveModal.classList.remove('active_image');
                    });

                    
                    thumbnails.forEach(thumbnail => {
                        const parentThumbnail = thumbnail.closest('div');
                        parentThumbnail.classList.remove('active');
                        thumbnail.classList.remove('active_image');
                    });

                    if(modalThumbnail){
                        modalChangeImage(modalIndex);
                        imageCounter = modalIndex;
                        modalThumbnail.classList.add('active_image');
                        thumbnailModalParent.classList.add('active');

        
                        const oldThumbnailn = thumbnails[modalIndex];
                        const oldParentThumbnailn = oldThumbnailn.closest('div');
                        oldThumbnailn.classList.add('active_image');
                        oldParentThumbnailn.classList.add('active');
                    }
                    else{
                        thumbnailModalParent.classList.remove('active');
                    }
                })


            })


          function modalChangeImage(modalNumber){
            return modalProductImage.setAttribute('src', `./images/image-product-${modalNumber + 1}.jpg`);
        }
  });

  //cart menu controll

  const cartIcon = document.querySelector('#cart_icon');
  const cart = document.querySelector('#cart');
  const cartContainer = document.querySelector('#cart_container');
  const empty = document.querySelector('#empty');
  const checkOut = document.querySelector('#check_out');
  const productDetails = document.querySelector('#product_details');
  const cartImageContainer = document.querySelector('#cart_image_container');
  const cartProductName = document.querySelector('#cart_product_name');
  const quantity = document.querySelector('#quantity');
  const total = document.querySelector('#total');
  const price = document.querySelector('#price');
  const cartImage = document.querySelector('#cart_image');
  const indicator = document.querySelector('#indicator');


  cartIcon.addEventListener('click', ()=>{
        cart.classList.toggle('hidden');
        cart.classList.toggle('flex');
        cart.classList.toggle('slide-down');
        cartIcon.classList.toggle('fill-orange-500');
        cartIcon.classList.toggle('fill-slate-600');
  })
  
  let cartItems = [];
  let quantityCount = 0;
  let logic = 0;
  let currentPrice = 0;

    function cartHandler(event){
        const button = event.target;
        const parentContainer = button.closest('section');
        const ItemName = parentContainer.querySelector('#product_name').textContent;
        const itemSrc = parentContainer.querySelector('#product_img').src;
        const itemPrice = parseFloat(parentContainer.querySelector('#price').textContent.replace('$', ''));


        const newItem = { 
            name : ItemName,
            price : itemPrice,
            src : itemSrc,
        }



            cartItems.push(newItem);
            checkOut.classList.remove('hidden');

            //create cart item infomations
            quantityCount++;
            quantityCounter(quantityCount, newItem.price);
            currentPrice = newItem.price;
            


            const orderImage = document.createElement('img');
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>';





            // const existingItemIndex = cartItems.findIndex(item => item.name === ItemName);

            if(logic === 0){
                cartItems.push(newItem);

                        cartItems.map((item, index) =>{

                        deleteBtn.addEventListener('click', () => {
                            cartItems = [];
                            empty.classList.remove('hidden');
                            checkOut.classList.add('hidden');
                            
                            productDetails.classList.add('hidden');
                            productDetails.classList.remove('flex');
                            cartImageContainer.classList.add('hidden');
                            cartContainer.classList.add('justify-center');
                            cartContainer.classList.remove('justify-between');
                            deleteBtn.classList.add('hidden');

                            logic = 1;
                            quantityCount = 0;
                            quantityCounter(quantityCount, item.price);
                            indicator.classList.add('hidden');
                            
                            cartIcon.classList.remove('fill-orange-500');
                            cartIcon.classList.add('fill-slate-600');


                            cart.classList.add('fade-out');
                            setTimeout(()=>{
                            cart.classList.add('hidden');
                            cart.classList.remove('fade-out');
                            }, 1100);
                            
                        });

                        cartImage.src = item.src;
                        cartProductName.innerHTML = item.name;
                        price.innerHTML = `$${item.price} x`;
                        cartContainer.appendChild(deleteBtn);
                        empty.classList.add('hidden');

                    //styling the ordered cart
                        productDetails.classList.remove('hidden');
                        productDetails.classList.add('flex');
                        cartImageContainer.classList.remove('hidden');
                        cartContainer.classList.remove('justify-center');
                        cartContainer.classList.add('justify-between');
                        orderImage.classList.add('w-full', 'h-full', 'rounded');
                        deleteBtn.classList.remove('hidden');

                            });
                            
                            logic = 3;

            }
            else{
                if(logic === 1){
                    logic = 3;
                    cartItems.push(newItem);

                    cartItems.map((item, index) =>{

                        deleteBtn.addEventListener('click', () => {
                            cartItems = [];
                            empty.classList.remove('hidden');
                            checkOut.classList.add('hidden');
                            
                            productDetails.classList.add('hidden');
                            productDetails.classList.remove('flex');
                            cartImageContainer.classList.add('hidden');
                            cartContainer.classList.add('justify-center');
                            cartContainer.classList.remove('justify-between');
                            deleteBtn.classList.add('hidden');

                            logic = 0;
                            quantityCount = 0;
                            quantityCounter(quantityCount, item.price);
                            indicator.classList.add('hidden');
                            
                            cartIcon.classList.remove('fill-orange-500');
                            cartIcon.classList.add('fill-slate-600');


                            cart.classList.add('fade-out');
                            setTimeout(()=>{
                            cart.classList.add('hidden');
                            cart.classList.remove('fade-out');
                            }, 1100);
                        });

                        cartImage.src = item.src;
                        cartProductName.innerHTML = item.name;
                        price.innerHTML = `$${item.price} x`;
                        cartContainer.appendChild(deleteBtn);
                        empty.classList.add('hidden');

                    //styling the ordered cart
                        productDetails.classList.remove('hidden');
                        productDetails.classList.add('flex');
                        cartImageContainer.classList.remove('hidden');
                        cartContainer.classList.remove('justify-center');
                        cartContainer.classList.add('justify-between');
                        orderImage.classList.add('w-full', 'h-full', 'rounded');
                        deleteBtn.classList.remove('hidden');


                            });
                }



                checkOut.classList.remove('hidden');
                productDetails.classList.add('flex');
                productDetails.classList.remove('hidden');
            }

    }

    function quantityCounter(counting, newPrice){

        quantity.innerHTML = counting;
        total.innerHTML = `$${newPrice * counting}`;
        indicator.classList.remove('hidden');
        indicator.innerHTML = counting;
    }

    const plus = document.querySelector('#plus');
    const minus = document.querySelector('#minus');

plus.addEventListener('click', ()=>{
    plus.classList.add('opacity-60');
    setTimeout(()=>{
        plus.classList.remove('opacity-60');
    },200);

    quantityCount++;
    quantityCounter(quantityCount, currentPrice);
})

minus.addEventListener('click', ()=>{
    minus.classList.add('opacity-60');
    setTimeout(()=>{
        minus.classList.remove('opacity-60');
    },200);

    quantityCount = Math.max(quantityCount - 1, 1);
    quantityCounter(quantityCount, currentPrice);
})


    const addToCart = document.querySelector('#add_to_cart');
    addToCart.addEventListener('click', cartHandler);

