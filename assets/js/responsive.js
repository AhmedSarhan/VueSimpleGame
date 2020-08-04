new Vue({
    el: "#app",
    data: {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      turns: []
    },
    methods: {
      startGame: function () {
        this.gameIsRunning = true;
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.turns = [];
      },
      attack: function () {
        var damage = this.calculateDamage(3, 10);
        this.monsterHealth -= damage;
        this.turns.unshift({
          isPlayer: true,
          text: "player hits the monster for " + damage
        });
        if (this.checkWin()) {
          return;
        }
  
        this.monsterAttacks();
      },
      specialAttack: function () {
        var damage = this.calculateDamage(15, 25);
        this.monsterHealth -= damage;
        this.turns.unshift({
          isPlayer: true,
          text: "player hits the monster hard for " + damage
        });
        if (this.checkWin()) {
          return;
        }
  
        this.monsterAttacks();
      },
      heal: function () {
        if (this.playerHealth <= 90) {
          this.playerHealth += 10;
        } else {
          this.playerHealth = 100;
        }
        this.monsterAttacks();
        this.turns.unshift({
          isPlayer: true,
          text: "player heals for 10 "
        });
      },
      giveUp: function () {
        this.gameIsRunning = false;
        this.turns.unshift({
          isPlayer: true,
          text: "player givs up "
        });
      },
      monsterAttacks: function () {
        var damage = this.calculateDamage(2, 12);
        this.playerHealth -= damage;
        this.turns.unshift({
          isPlayer: false,
          text: "monster hits the player  for " + damage
        });
        this.checkWin();
      },
      calculateDamage: function (min, max) {
        return Math.max(Math.floor(Math.random() * max) + 1, min);
      },
      checkWin: function () {
        if (this.monsterHealth <= 0) {
          if (confirm("You won! New Game?")) {
            this.startGame();
          } else {
            this.gameIsRunning = false;
          }
          return true;
        } else if (this.playerHealth <= 0) {
          if (confirm("You lost! New Game?")) {
            this.startGame();
          } else {
            this.gameIsRunning = false;
          }
          return true;
        }
        return false;
      }
    }
  });
  