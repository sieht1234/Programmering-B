


//dette er et for loop//
//i står for index 
for(let i =0; i<20; i++){
    let card = document.createElement('div')
    card.classList.add('card')
    card.style.animation = 'anim';
    card.style.animationDelay = i/40 +'s';
    card.style.animationDuration = '.100s';
    document.querySelector('main').append(card)
}
//apepend sætter vi efter indhold