function filterEvents (category,btn){
    console.log("Clicked:",category);
    const cards = document.querySelectorAll(".event-card");
    cards.forEach(card => {
        if(category==="all" || card.classList.contains(category)){
            card.style.display = "inline-block";
        }else{
            card.style.display = "none";
        }
    });
}
const categories = document.querySelectorAll(".category");
categories.forEach(category => {
    category.addEventListener("click",() => {
       categories.forEach(btn => btn.classList.remove("active"));
       category.classList.add("active");
    });
});
