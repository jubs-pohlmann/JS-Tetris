document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    const width = 10;
    let nextRandom = 0;
    let timerId;

    /* HOW TO USE FUNCTIONS:
    function functionName(){
        //code goes here
    }
    OR
    functionName = function () {
        //code goes here
    }
    OR
    functionName = () => {
        //code goes here
    } 
    HOW TO USE .FOREACH
    array.forEach(variable => {
        //code dealing with each variable inside array
    }) */

    /* The Tetrominoes
    COMO FUNCIONA:
    Ao resolvermos o index de lTetromino, por exemplo, obtemos
    [01,11,21,02] -> esses serao os indexes a serem coloridos na primeira linha
    na grid total [00 01 02
                   10 11 12
                   20 21 22]
    os valores seguintes serao todas as rotacoes possiveis do tetromino.
    */

    //DRAWING TETROMINOES USING classList.add()
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2+2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [width*2, width*2+1, width+1, width+2],
        [0, width, width+1, width*2+1],
        [width*2, width*2+1, width+1, width+2],
        [0, width, width+1, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;

    let random = Math.floor(Math.random()*theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    function draw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        });
    }

    function undraw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        });
    }

    //ASSIGN FUNCTION TO KEYCODES
    function control(e){
        if(e.keyCode === 37) moveLeft();
        else if(e.keyCode === 38) rotate();
        else if(e.keyCode === 39) moveRight();
        else if(e.keyCode === 40) moveDown();
    }

    document.addEventListener('keyup', control);

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
        }
    }

    function moveLeft(){
        undraw();
        //.some testa se ALGUM item do array satisfaz a propriedade definida 
        const isAtLeftEdge = current.some(index => 
            ((currentPosition + index) % width === 0)
        );

        if(!isAtLeftEdge) currentPosition -=1;

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }

        draw();
    }

    function moveRight(){
        undraw();

        const isAtRightEdge = current.some(index => 
            ((currentPosition + index) % width === width-1)
        );

        if(!isAtRightEdge) currentPosition +=1;

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1;
        }

        draw();
    }

    function rotate(){
        //BUG Z L I CAN BE ROTATED OUT OF SCREEN
        undraw();
        currentRotation++;

        if(currentRotation === current.length) currentRotation = 0;

        current = theTetrominoes[random][currentRotation];
        draw();
    }

    //mini-grid display
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 0;

    //the tetrominos without rotations
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
        [0, 1, displayWidth, displayWidth+1], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]//iTetromino
    ];

    function displayShape(){
        //remove any trace of a tetromino from the entire grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        });

        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino');
        });
    }

    startButton.addEventListener('click', () => {
        if(timerId){
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random()*theTetrominoes.length);
            displayShape();
        }
    })
});