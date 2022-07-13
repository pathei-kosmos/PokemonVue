const app = Vue.createApp({
  data() {
    return {
      player: 100,
      opp: 100,
      rounds: 0,
      game: "",
      disabledBtn: false,
      message: "Fuir",
      shakePlayer: 0,
      shakeAdv: 0,
      atkDrako: 0,
      atkCara: 0,
      atkSpeCara: 0,
      healCara: 0,
      runPlayer: 0,
      att: "",
      soin: "",
      log: [],
    };
  },

  methods: {
    attackPlayer() {
      let deg = Math.floor(Math.random() * (10 - 5) + 5);
      this.opp -= deg;
      this.shakeAdversary();
      this.atkCara = !this.atkCara;
      setTimeout(() => {
        this.atkCara = !this.atkCara;
      }, 500);
      this.att = `Carabaffe inflige ${deg} de dégats à Dracaufeu`;
      this.log.push(this.att);
      this.attackAdv();
    },

    attackSpePlayer() {
      let deg = Math.floor(Math.random() * (16 - 10) + 10);
      this.opp -= deg;
      this.shakeAdversary();
      this.atkSpeCara = !this.atkSpeCara;
      setTimeout(() => {
        this.atkSpeCara = !this.atkSpeCara;
      }, 500);
      this.att = `Carabaffe lance son attaque spéciale et inflige ${deg} de dégats à Dracaufeu`;
      this.log.push(this.att);
      this.attackAdv();
    },

    soigner() {
      let deg = 50;
      this.player += deg;
      this.soin = `Carabaffe récupere ${deg} PV `;
      this.log.push(this.soin);
      this.healCara = !this.healCara;
      setTimeout(() => {
        this.healCara = !this.healCara;
      }, 500);
      setTimeout(() => {
        this.attackAdv();
      }, 200);
    },

    attackAdv() {
      this.disabledBtn = !this.disabledBtn;
      let deg = Math.floor(Math.random() * (21 - 15) + 15);
      setTimeout(() => {
        this.player -= deg;
      }, 500);
      this.att = `Dracaufeu inflige ${deg} de dégats à Carabaffe`;
      this.log.push(this.att);
      setTimeout(() => {
        this.shakePlayerF();
      }, 500);
      setTimeout(() => {
        this.atkDrako = !this.atkDrako;
      }, 500);
      setTimeout(() => {
        this.atkDrako = !this.atkDrako;
      }, 1000);
      setTimeout(() => {
        this.disabledBtn = !this.disabledBtn;
      }, 1000);
      this.rounds++;
    },

    reloadPage(duree) {
      setTimeout(() => {
        window.location.reload();
      }, duree);
    },

    gameOver() {
      this.runPlayerF();
      this.disabledBtn = !this.disabledBtn;
      this.message = "Game Over";
      setTimeout(() => {
        this.game = "loss";
      }, 500);
    },

    shakePlayerF() {
      this.shakePlayer = !this.shakePlayer;
      setTimeout(() => {
        this.shakePlayer = !this.shakePlayer;
      }, 300);
    },

    shakeAdversary() {
      this.shakeAdv = !this.shakeAdv;
      setTimeout(() => {
        this.shakeAdv = !this.shakeAdv;
      }, 300);
    },

    runPlayerF() {
      this.runPlayer = !this.runPlayer;
    },
  },

  watch: {
    rounds(value) {
      if (value > 3) {
        setTimeout(() => {
          this.rounds = 0;
        }, 1000);
      }
    },

    player(value) {
      if (value < 0) {
        this.player = 0;
      } else if (value > 100) {
        this.player = 100;
      }
      if (value <= 0 && this.opp > 0) {
        this.game = "loss";
        setTimeout(() => {
          $("#modal").modal("show");
        }, 1000);
        this.reloadPage(5000);
      }
    },
    
    opp(value) {
      if (value < 0) {
        this.opp = 0;
      } else if (value > 100) {
        this.opp = 100;
      }
      if (value <= 0 && this.player > 0) {
        this.game = "win";
        setTimeout(() => {
          $("#modal").modal("show");
        }, 500);
        this.reloadPage(5000);
      }
    },
  },
});
app.mount("#app");
