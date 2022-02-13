let xToMove = true
let boardState
if(localStorage.getItem('boardState')) {
    boardState = JSON.parse(localStorage.getItem('boardState'))
} else {
    boardState = [0,0,0,0,0,0,0,0,0]
}

let board = [
    document.getElementById('1,1'), document.getElementById('1,2'), document.getElementById('1,3'),
    document.getElementById('2,1'), document.getElementById('2,2'), document.getElementById('2,3'),
    document.getElementById('3,1'), document.getElementById('3,2'), document.getElementById('3,3')
]
let boardListeners = [null, null, null, null, null, null, null, null, null,]

updateBoard(xToMove, boardState, board, boardListeners)

function updateBoard(xToMove, boardState, board, boardListeners) {
    // update every position on the board to reflect board state
    for (let i = 0; i < 9; i++) {
        board[i].textContent = '  ' + (!boardState[i] ? ' ' : (boardState[i] == 1 ? 'X' : 'O'))  + '  '
    }
    //determine if someone won and who it was
    let winner = whoWon(boardState)
    // stop the game and add text inicating the winner
    if ( !!winner == true) {
        document.getElementById('title').textContent = winner == 2 ? 'Cats game!' : (winner == 1 ? 'X' : ('O')) + " wins!"
        for (let i = 0; i < 9; i++) {
            board[i].removeEventListener('click', boardListeners[i])
        }
        localStorage.removeItem('boardState')
    }
    // if there is no winner indicate who the next person to move is 
    else {
        document.getElementById('title').textContent = (xToMove ? 'X' : 'O') + ' to move'
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
}

function makePostionListener(i, xToMove, boardState, board, boardListeners) {
    function postionOnClick() {
        if(xToMove === true){
            boardState[i] = 1
        } else {
            boardState[i] = -1
        }
        localStorage.setItem('boardState', JSON.stringify(boardState))
        xToMove = !xToMove
        updateBoard(xToMove, boardState, board, boardListeners)
    }
    return postionOnClick
}

function whoWon(boardState) {
    if(threeOfAKind(boardState[0], boardState[1], boardState[2])) {
        return boardState[0]
    }
    if(threeOfAKind(boardState[3], boardState[4], boardState[5])) {
        return boardState[3]
    }
    if(threeOfAKind(boardState[6], boardState[7], boardState[8])) {
        return boardState[6]
    }
    if(threeOfAKind(boardState[0], boardState[3], boardState[6])) {
        return boardState[0]
    }
    if(threeOfAKind(boardState[1], boardState[4], boardState[7])) {
        return boardState[1]
    }
    if(threeOfAKind(boardState[2], boardState[5], boardState[8])) {
        return boardState[2]
    }
    if(threeOfAKind(boardState[0], boardState[4], boardState[8])) {
        return boardState[0]
    }
    if(threeOfAKind(boardState[2], boardState[4], boardState[6])) {
        return boardState[2]
    }
    if(boardState[0] && boardState[1] && boardState[2] && boardState[3] && boardState[4] && boardState[5] && boardState[6] && boardState[7] && boardState[8])
    {
        return 2
    }
    return 0
}

function threeOfAKind(a, b, c) {
    return a === b && a === c
}