xToMove = true

let board = [
    [document.getElementById('1,1'), document.getElementById('1,2'), document.getElementById('1,3')],
    [document.getElementById('2,1'), document.getElementById('2,2'), document.getElementById('2,3')],
    [document.getElementById('3,1'), document.getElementById('3,2'), document.getElementById('3,3')]
]

board.forEach((element) => {
    element.forEach((element) => {
        //if(element.textContent === '     ') {
            element.addEventListener('click', function() {
                if(xToMove === true){
                    element.textContent = '  X  '
                    document.getElementById('title').textContent = 'O to move'
                } else {
                    element.textContent = '  O  '
                    document.getElementById('title').textContent = 'X to move'
                }
                xToMove = !xToMove
                checkForWin(board);
            })
        //}
    })
})
