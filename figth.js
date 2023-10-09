

// ** Grabs elements from the DOM and stores them into variables **
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

// ** Check if either players health is  0 and if it is, then update isOver to true **
const updateGame = (p1, p2, gameState) => {
  // Update the DOM with the names and the latest health of players
  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health
  // Condition IF either player health is <= 0 then set isOver to true and declareWinner
  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true;
    gameState = game.isOver
    resultDiv.innerText = game.declareWinner(game.isOver, p1, p2)
    return gameState
    //p1.health<=0?`${p2.name} wins`:`${p1.name} wins`
  }
}


class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }

  kick(player,enemy,attackDmg){
    let damageAmount = 2*(Math.ceil(Math.random() * attackDmg) + 1)
    enemy.health-=damageAmount
    updateGame(p1,p2,game.isOver)

    return `${player.name} attacks ${enemy.name} for 
    ${damageAmount} damage`
  }
  // ** Attack an enemy with a random number from 0 to YOUR attackDmg bonus **
  strike(player, enemy, attackDmg) {

    // Get random number between 1 - 10 and that is damageAmount
    let damageAmount = Math.ceil(Math.random() * attackDmg) + 1
    // Subtract the enemy health with the damageAmount
    enemy.health -= damageAmount;
    //  Update the game and DOM with updateGame()
    updateGame(p1, p2, game.isOver)
    //  Return a message of 'player name attacks enemy name for damageAmount'
    return `${player.name} attacks ${enemy.name} for 
    ${damageAmount} damage`
  }
  // ** Heal the player for random number from  1 to 5 **
  heal(player) {

    // Get random number between 1 - 5 and store that in hpAmount
    let hpAmount = Math.ceil(Math.random() * 5)
    // Add hpAmount to players health
    player.health += hpAmount
    //  Update the game and DOM with updateGame()
    updateGame(p1, p2, game.isOver)
    //  Return a message of 'player name heals for hpAmount HP'
    return `${player.name} heals for ${hpAmount}`

  }
}


  constructor() {
    this.isOver = false;
  }

  // ** If the game is over and a player has 0 health declare the winner! **
  declareWinner(isOver, p1, p2) {

    // Create a message variable that will hold a message based on the condition
    let message='Tie';
    // If isOver is true AND p1 health is <= 0 then update message variable  to 'p1 WINS!'
    if (isOver && p1.health <= 0) {
      message = `${p2.name} WINS`
    }
    else if (isOver && p2.health <= 0) {
      message = `${p1.name} WINS`
    }
    document.getElementById('victory').play()
    return message
  }

  reset(p1, p2) {
    p1.health=100
    p2.health=100
    this.isOver=false
    resultDiv.innerText=''
    updateGame(p1,p2,this.isOver)
  }

  play(p1, p2) {
    this.reset(p1,p2)
    while (!this.isOver) {
      p1.strike(p1,p2,p1.attackDmg)
      p2.heal(p2)
      p2.strike(p2,p1,p2.attackDmg)
      p1.heal(p1)
    }
    // Once isOver is TRUE run the declareWinner() method 
    return this.declareWinner(this.isOver,p1,p2)
  }

}

let player1 = new Player('Aditya', 100, 10)
let player2 = new Player('Adi', 100, 10)

let p1 = player1;
let p2 = player2;

let game = new Game()
updateGame(p1, p2, game.isOver)

let gameState;


playButton.onclick=()=>resultDiv.innerText=game.play(p1,p2)


// ** Player 1 Controls **
document.addEventListener('keydown', function (e) {
  // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
  if(e.key=='q'&& p2.health>0&&game.isOver==false){
    p1.strike(p1,p2,p1.attackDmg)
    document.getElementById('p1attack').play()
  }

});
document.addEventListener('keydown', function (e) {
  // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
  if(e.key=='w'&& p2.health>0&&game.isOver==false){
    p1.kick(p1,p2,p1.attackDmg)
    document.getElementById('p2kick').play()
  }

});

document.addEventListener('keydown', function (e) {

  // if you press a AND the player health is greater than 0 AND isOver is still false then strike()
  if(e.key=='a'&& p2.health>0&&game.isOver==false){
    p1.heal(p1)
    document.getElementById('p1heal').play()
  }

});

// ** Player 2 Controls **
document.addEventListener('keydown', function (e) {

  // if you press p AND enemy health is greater than 0 AND isOver is still false then stike()
  if(e.key=='p'&& p1.health>0&&game.isOver==false){
    p2.strike(p2,p1,p2.attackDmg)
    document.getElementById('p2attack').play()
  }

});
document.addEventListener('keydown', function (e) {

  // if you press p AND enemy health is greater than 0 AND isOver is still false then stike()
  if(e.key=='o'&& p1.health>0&&game.isOver==false){
    p2.strike(p2,p1,p2.attackDmg)
    document.getElementById('p2kick').play()
  }

});

document.addEventListener('keydown', function (e) {
  // if you press l AND the player health is greater than 0 AND isOver is still false then heal()
  if(e.key=='l'&& p1.health>0){
    p2.heal(p2)
    document.getElementById('p2heal').play()
  }

});



//console.log(p1.strike(p1,p2,attackDmg))
