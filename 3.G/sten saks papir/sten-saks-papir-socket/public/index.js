let clientSocket
let currentPage = '#lobby'
let nameInput, nameButton, rejectButton, timer, stone, scissor, paper, player1, player1Choice, player2, player2Choice,winner, restartButton

function setup(){
  noCanvas()
  initVariables()
  //vis en side
  shiftPage('#lobby')
  //log på serveren 
  clientSocket = io.connect()
  // er vi "velkomne" til at spille
  clientSocket.on('welcome', okay => {
    if(okay){
      shiftPage('#name')
    }else{
      shiftPage('#reject')
      rejectButton.mousePressed(() => {
        window.location.reload()
      })
    }
  })

  //Kan vi starte?
  clientSocket.on('play', okay => {
    if(okay){
      shiftPage('#play')
    }
  })

  //når navnet bliver indtasted og trykkes på OK
  nameButton.mousePressed(()=>{
    if(nameInput.value() != ''){
      clientSocket.emit('name', nameInput.value())
      shiftPage('#lobby')
    }else{
      confirm('Skriv did navn din bitch')
    }
  })

  stone.mousePressed(()=>clientSocket.emit('choice', 'stone'))
  scissor.mousePressed(()=>clientSocket.emit('choice', 'scissor'))
  paper.mousePressed(()=>clientSocket.emit('choice', 'paper'))

  clientSocket.on('result', winner =>{
    console.log('vi har en vinder: ' + winner)
    winner.html(winner.name)
    shiftPage('#result')
  })


}

function shiftPage(pageId){
  select(currentPage).removeClass('show')
  select(pageId).addClass('show')
  currentPage = pageId
}

function initVariables(){
  //let nameInput, nameButton, rejectButton, timer, stone, scissor, paper, player1, player1Choice, player2, player2Choice,winner, restartButton
  nameInput = select('#nameInput')
  nameButton = select('#nameButton')
  rejectButton = select('#rejectButton')
  timer = select('#timer')
  stone = select('#stone')
  scissor = select('#scissor')
  paper = select('#paper')
  player1 = select('#player1')
  player2 = select('#player2')
  player1Choice = select('#player1Choice')
  player2Choice = select('#player2Choice')
  winner = select('#winner')
  restartButton = select('#restartButton')
}

