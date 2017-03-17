var snakeFig
var scl = 20;
var food;
var failBox = document.getElementById('log');
failBox.style.display = 'none';
var score = 0;
var scoreList = [];

var scoreBox = document.getElementById('highScore');

// direction booleans

var rightDir = true;
var downDir = false;
var upDir = false;
var leftDir = false;

function setup() {
    createCanvas(600, 600);
    snakeFig = new Snake();
    frameRate(10);
    pickLocation();
}

function pickLocation() {
    var cols = floor(width / scl);
    var rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function draw() {
    background(51);
    snakeFig.update();
    snakeFig.show();
    snakeFig.death();

    if (snakeFig.eat(food)) {
        pickLocation();
        score++;
    }

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
}

function keyPressed() {

    if (hasDied) {
        if (keyCode === 13) {
            failBox.style.display = 'none';
            snakeFig.dir(1, 0);
            hasDied = false;
            rightDir = true;
        }

    } else {
        if (keyCode === UP_ARROW) {
            snakeFig.dir(0, -1);
            upDir = true;
            leftDir = false;
            rightDir = false;

        } else if (keyCode === DOWN_ARROW) {
            snakeFig.dir(0, 1);
            downDir = true;
            leftDir = false;
            rightDir = false;
        } else if (keyCode === RIGHT_ARROW) {
            snakeFig.dir(1, 0);
            rightDir = true;
            upDir = false;
            downDir = false;
        } else if (keyCode === LEFT_ARROW) {
            snakeFig.dir(-1, 0);
            leftDir = true;
            upDir = false;
            downDir = false;
        }
    }

}

var hasDied = false;

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.eat = function (pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {

            this.total++;
            console.log(this.total);

            return true;

        } else {
            return false;
        }
    }

    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.death = function () {
        for (let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                failBox.style.display = 'block';
                failBox.innerHTML = 'You died!<br>Press Enter to try again.';
                this.xspeed = 0;
                this.yspeed = 0;
                this.tail = [];
                this.total = 0;
                this.x = 0;
                this.y = 0;
                hasDied = true;
                rightDir = false;
                downDir = false;
                upDir = false;
                leftDir = false;
                presentScore();
            }
        }
        if (downDir && upDir || leftDir && rightDir) {
            failBox.style.display = 'block';
            failBox.innerHTML = 'You died!<br>Press Enter to try again.';
            this.xspeed = 0;
            this.yspeed = 0;
            this.tail = [];
            this.total = 0;
            this.x = 0;
            this.y = 0;
            hasDied = true;
            rightDir = false;
            downDir = false;
            upDir = false;
            leftDir = false;
            presentScore();
        } else if (this.x < 0 || this.x > 580 || this.y < 0 || this.y > 580) {
            failBox.style.display = 'block';
            failBox.innerHTML = 'You died!<br>Press Enter to try again.';
            this.xspeed = 0;
            this.yspeed = 0;
            this.tail = [];
            this.total = 0;
            this.x = 0;
            this.y = 0;
            hasDied = true;
            rightDir = false;
            downDir = false;
            upDir = false;
            leftDir = false;
            presentScore();
        }
    }

    this.update = function () {

        if (this.total === this.tail.length) {

            for (let i = 0; i < this.tail.length; i++) {
                this.tail[i] = this.tail[i + 1];
            }

        }
        this.tail[this.total - 1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        //this.x = constrain(this.x, 0, width - scl);
        //this.y = constrain(this.y, 0, height - scl);
    }

    this.show = function () {
        fill(255);
        for (let i = 0; i < this.total; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }
}

function presentScore() {
    scoreList.push(score);
    console.log(score);
    console.log(scoreList);
    let highScore = 0;
    for (let i = 0; i<scoreList.length; i++){
        if (scoreList[i]>highScore){
            highScore = scoreList[i];
        }
    }
    scoreBox.innerHTML = `High Score: ${highScore}`;
    score = 0;
    /*
    localStorage.setItem("scoreList", scoreList);
    scoreList = localStorage.getItem("scoreList");
    console.log(scoreList);*/
}
