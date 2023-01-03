class AimGround {
  constructor() {
    this.speed = 1;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setGrid(row, column) {
    this.row = row;
    this.column = column;

    for (var i = 0; i < row; i++) {
      $("#gridContainer").append(
        `<div class='pointContainer' id='box${i}'></div>`
      );

      for (var j = 0; j < column; j++) {
        $(`#box${i}`).append(`<div class='point' id='point${i}${j}'></div>`);
      }
    }
  }

  startGame() {
    var speed = $("#speed").val();
    var time = $("#time").val();
    $(".points").text("00");

    this.gametime = setTimeout(() => {
      this.stopGame();
    }, time);

    $("#startBtn").prop("disabled", true);
    $("#stopBtn").prop("disabled", false);
    this.interval = setInterval(() => {
      $(this.currPoint)
        .removeClass("activePoint")
        .off()
        .css("backgroundColor", "rgb(47, 47, 47)");
      this.currPoint = `#point${Math.floor(
        Math.random() * this.row
      )}${Math.floor(Math.random() * this.column)}`;
      $(this.currPoint)
        .addClass("activePoint")
        .on("click", () => {
          console.log($(this.currPoint).css("backgroundColor", "green"));
          var currPoints = $(".points").text();
          var newPoint = parseInt(currPoints);
          newPoint++;
          $(".points").text(`${newPoint}`.padStart(2, "0"));
          console.log(newPoint);
        });
    }, speed);
  }

  stopGame() {
    $(this.currPoint)
      .removeClass("activePoint")
      .off()
      .css("backgroundColor", "rgb(47, 47, 47)");
    clearInterval(this.interval);
    clearInterval(this.gametime);
    $("#startBtn").prop("disabled", false);
    $("#stopBtn").prop("disabled", true);
  }
}

var game = new AimGround();
game.setGrid(10, 40);

const startGame = () => game.startGame();
const stopGame = () => game.stopGame();
