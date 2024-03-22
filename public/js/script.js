function explodeConfetti() {
    for(let index = 0; index <= Math.floor(Math.random()*5 + 5); index++){
        confetti({
        origin:{
            x: Math.random(),
            y: Math.random()
        }
        })
    }
}