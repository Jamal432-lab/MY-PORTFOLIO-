// ELEMENTS
const getStartedBtn = document.getElementById("getStartedBtn");
const loginBtn = document.getElementById("loginBtn");
const landing = document.getElementById("landing");
const home = document.getElementById("home");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");
const loginSubmit = document.getElementById("loginSubmit");

// SHOW HOME PAGE
getStartedBtn.addEventListener("click", () => {
  landing.classList.add("hidden");
  home.classList.remove("hidden");
});

// SHOW LOGIN MODAL
loginBtn.addEventListener("click", () => loginModal.classList.remove("hidden"));
closeModal.addEventListener("click", () => loginModal.classList.add("hidden"));

// LOGIN SUBMIT (Firebase or placeholder)
loginSubmit.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if(email && password){
    alert(`Logged in as ${email}`);
    loginModal.classList.add("hidden");
    landing.classList.add("hidden");
    home.classList.remove("hidden");
  } else alert("Please enter email and password");
});

// CATEGORY CLICK
document.querySelectorAll(".cat").forEach(cat => {
  cat.addEventListener("click", () => alert(`${cat.innerText} clicked`));
});

// MAP BUTTON
document.getElementById("mapBtn").addEventListener("click", () => alert("Map view coming soon!"));

// SWIPE CARDS (placeholder)
const swipeContainer = document.getElementById("swipeContainer");
const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");

let cards = Array.from(swipeContainer.children);
let currentIndex = cards.length-1;
cards.forEach((card,index)=>card.style.zIndex=index);

function swipe(direction){
  if(currentIndex<0) return;
  const card = cards[currentIndex];
  card.style.transform = `translateX(${direction==="right"?500:-500}px) rotate(${direction==="right"?20:-20}deg)`;
  card.style.opacity=0;
  currentIndex--;
}
likeBtn.addEventListener("click",()=>swipe("right"));
dislikeBtn.addEventListener("click",()=>swipe("left"));


