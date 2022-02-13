let xToMove = true
let boardState = [0,0,0,0,0,0,0,0,0]
let board = [
    document.getElementById('1,1'), document.getElementById('1,2'), document.getElementById('1,3'),
    document.getElementById('2,1'), document.getElementById('2,2'), document.getElementById('2,3'),
    document.getElementById('3,1'), document.getElementById('3,2'), document.getElementById('3,3')
]
let boardListeners = [null, null, null, null, null, null, null, null, null,]

updateBoard(xToMove, boardState, board, boardListeners)

function updateBoard(xToMove, boardState, board, boardListeners) {
    for (let i = 0; i < 9; i++) {
        if(boardState[i] === 0) {
            if(boardListeners[i] !== null) {
                board[i].removeEventListener('click', boardListeners[i])
            }
            boardListeners[i] = makePostionListener(i, xToMove, boardState, board, boardListeners)
            board[i].addEventListener('click', boardListeners[i])
        } else {
            board[i].removeEventListener('click', boardListeners[i])
        }
    }
}

function makePostionListener(i, xToMove, boardState, board, boardListeners) {
    function postionOnClick() {
        if(xToMove === true){
            board[i].textContent = '  X  '
            document.getElementById('title').textContent = 'O to move'
            boardState[i] = 1
        } else {
            board[i].textContent = '  O  '
            document.getElementById('title').textContent = 'X to move'
            boardState[i] = -1
        }
        xToMove = !xToMove
        updateBoard(xToMove, boardState, board, boardListeners)
    }
    return postionOnClick
}