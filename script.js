window.addEventListener("DOMContentLoaded", ()=> {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    announcer.className = 'result';

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYER0_WON = 'PLAYER0_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const isValidAction = (tile) => {
        if(tile.innerText === 'X' || tile.innerText === '0') {
            return false;
        }
        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? '0' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const announce = (type) => {
        switch(type) {
            case PLAYER0_WON:
                announcer.innerHTML = 'Player <span class="player0">0</span> Won';
                break;
            
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;

            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    function handleResultValidation() {
        let roundWon = false;

        for(let i=0; i<=7; i++) {
            const winCondtion = winningConditions[i];
            const a = board[winCondtion[0]];
            const b = board[winCondtion[1]];
            const c = board[winCondtion[2]];

            if(a === '' || b === '' || c === '') {
                continue;
            }

            if(a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        if(roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYER0_WON)
            isGameActive = false;
            return;
        }

        if(!board.includes('')) announce(TIE);
    }

    const userAction = (tile,index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    };

    tiles.forEach((tile, index) => {
        tile.addEventListener('click',() => userAction(tile,index));
    });

    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
      isGameActive = true;
      announcer.classList.add("hide");

      if (currentPlayer === "0") {
        changePlayer();
      }

      tiles.forEach((tile) => {
        tile.innerText = "";
        tile.classList.remove("playerX"); 
        tile.classList.remove("player0");
      });
      announcer.innerHTML = "";
    };

    resetButton.addEventListener('click', resetBoard);
});