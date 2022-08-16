const playerTable = document.getElementById('player-table');
const cpuTable = document.getElementById('cpu-table');
const ball = document.getElementById('ball')
const numberBall = document.getElementById('numberBall');
const gameNumbersBox = document.getElementById('gameNumbers');

let playerNum = [];
let cpuNum = [];
let gameNums = [];
let playerSlots = 15;
let cpuSlots = 15;

const fillTable = () => {
  let table = ''
  for (let i = 0; i < 91; i++) {
    let el = `<div id="${i}" class="numBox">${i}</div>`
    table = table + el
  }
  gameNumbersBox.innerHTML = table
}
const fillCrads = (player, htmlElement) => {
  do {
    let num = Math.floor(Math.random() * (91) + 0)
    let repeatedNum = player.indexOf(num)
    //if num is repeated
    if (repeatedNum != -1) {
      do {
        num = Math.floor(Math.random() * (91) + 0)
        repeatedNum = player.indexOf(num)
      } while (repeatedNum != -1);
    }
    player.push(num)
  } while (player.length < 15)

  player.sort((a, b) => a - b)

  let table = ''
  for (let i = 0; i < player.length; i++) {
    const element = player[i];
    if (player === playerNum) {
      let el = `<div id="${element}Player" class="number">${element}</div>`
      table = table + el
    } else {
      let el = `<div id="${element}Cpu" class="number">${element}</div>`
      table = table + el
    }

  }
  htmlElement.innerHTML = table
}



let changeCardBtn = document.getElementById('changeCard');
changeCardBtn.addEventListener('click', (e) => {
  e.preventDefault()
  playerNum = []
  fillCrads(playerNum, playerTable)
})

const getRandomNumber = () => {
  let num = Math.floor(Math.random() * (91) + 0)
  let repeatedNum = gameNums.indexOf(num)

  //if num is repeated
  if (repeatedNum != -1) {
    do {
      num = Math.floor(Math.random() * (91) + 0)
      repeatedNum = gameNums.indexOf(num)
    } while (repeatedNum != -1);
  }
  gameNums.push(num)
  checkNumber(num)
  numberBall.value = num


}

const checkNumber = (number) => {
  let findPlayerNum = playerNum.find(n => n == number);
  let findCpuNum = cpuNum.find(n => n == number);
  document.getElementById(number).style.background = '#34eb77'
  if (findPlayerNum) {
    document.getElementById(`${findPlayerNum}Player`).style.background = '#E74C3C'
      --playerSlots;
  }
  if (findCpuNum) {
    document.getElementById(`${findCpuNum}Cpu`).style.background = '#5499C7'
      --cpuSlots;
  }


}

const resetGame = ()=> {
  playerNum = [];
  cpuNum = [];
  gameNums = [];
  playerSlots = 15;
  cpuSlots = 15;
  numberBall.value = "Click me!"
  numberBall.style.fontSize = "20 px"
  fillTable()
  fillCrads(playerNum, playerTable);
  fillCrads(cpuNum, cpuTable);
}



ball.addEventListener('click', e => {
  e.preventDefault();
  changeCardBtn.style.display = 'none'
  numberBall.style.fontSize = '35px'
  if (gameNums.length < 91) {
    getRandomNumber();
    if (playerSlots === 0) {
      alert(`Bingo !! Player wins`)
      resetGame()
    }
    if (cpuSlots === 0) {
      alert(`Bingo !! Cpu wins`)
      resetGame()
    }
  }

});

document.getElementById('reset').addEventListener('click',(e)=>{
  e.preventDefault()
  resetGame()
})

fillTable()
fillCrads(playerNum, playerTable);
fillCrads(cpuNum, cpuTable);




