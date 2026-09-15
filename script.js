const heroSlides=Array.from(document.querySelectorAll('.hero-slide'));const heroDots=Array.from(document.querySelectorAll('.hero-dots button'));let currentHeroSlide=0;
function showHeroSlide(index){currentHeroSlide=(index+heroSlides.length)%heroSlides.length;heroSlides.forEach((slide,i)=>slide.classList.toggle('active',i===currentHeroSlide));heroDots.forEach((dot,i)=>{const active=i===currentHeroSlide;dot.classList.toggle('active',active);dot.setAttribute('aria-current',active?'true':'false')})}
heroDots.forEach((dot,index)=>dot.addEventListener('click',()=>showHeroSlide(index)));
setInterval(()=>showHeroSlide(currentHeroSlide+1),7200);

const cart=document.querySelector('.cart');const count=document.querySelector('.cart-count');const items=document.querySelector('.cart-items');const subtotal=document.querySelector('.subtotal b:last-child');const bar=document.querySelector('.progress span');const note=document.querySelector('.tier-note');let basket=[];
function openCart(){cart.classList.add('open');cart.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeCart(){cart.classList.remove('open');cart.setAttribute('aria-hidden','true');document.body.style.overflow=''}
function render(){count.textContent=basket.length;const total=basket.reduce((s,x)=>s+x.price,0);subtotal.textContent=`₹${total}`;items.innerHTML=basket.length?basket.map((x,i)=>`<div class="cart-line"><div><b>${x.name}</b><div>₹${x.price}</div></div><button data-remove="${i}" aria-label="Remove ${x.name}">Remove</button></div>`).join(''):'<p class="empty">Your cart is empty.</p>';const steps=[0,1,2,3,5],target=basket.length<1?1:basket.length<2?2:basket.length<3?3:5;bar.style.width=`${Math.min(100,basket.length/5*100)}%`;note.textContent=basket.length>=5?'Your 5-product bundle saving is unlocked.':`Add ${target-basket.length} more item${target-basket.length===1?'':'s'} to reach the next saving.`}
document.querySelector('.cart-open').addEventListener('click',openCart);document.querySelector('.cart-close').addEventListener('click',closeCart);document.querySelector('.scrim').addEventListener('click',closeCart);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart()});
document.querySelectorAll('.add').forEach(btn=>btn.addEventListener('click',()=>{const p=btn.closest('.product');basket.push({name:p.dataset.name,price:Number(p.dataset.price)});render();openCart()}));
document.querySelectorAll('.bundle-add').forEach(btn=>btn.addEventListener('click',()=>{basket.push({name:btn.dataset.name,price:Number(btn.dataset.price)});render();openCart()}));
items.addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;basket.splice(Number(b.dataset.remove),1);render()});

const reels=document.querySelector('.reel-row');document.querySelector('.reel-prev').addEventListener('click',()=>reels.scrollBy({left:-260,behavior:'smooth'}));document.querySelector('.reel-next').addEventListener('click',()=>reels.scrollBy({left:260,behavior:'smooth'}));
document.querySelectorAll('.reel-row button').forEach(button=>button.addEventListener('click',()=>{button.textContent=button.textContent==='▶'?'❚❚':'▶'}));
render();
