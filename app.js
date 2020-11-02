document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    const width = 10;

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
});