document.addEventListener('DOMContentLoaded', () => {
    const playerSelection = document.getElementById('player-selection');
    const gameBoard = document.getElementById('game-board');
    const startGameBtn = document.getElementById('start-game');
    const player1ImageInput = document.getElementById('player1-image');
    const player2ImageInput = document.getElementById('player2-image');
    const defaultAvatars = document.querySelectorAll('.default-avatar');
    const cells = document.querySelectorAll('.cell');
    const currentPlayerName = document.getElementById('current-player-name');
    const currentPlayerImage = document.getElementById('current-player-image');
    const gameResult = document.getElementById('game-result');
    const resultMessage = document.getElementById('result-message');
    const playAgainBtn = document.getElementById('play-again');

    let player1Image = null;
    let player2Image = null;
    let currentPlayer = 1;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;

    // Image Selection Logic
    function handleImageSelection(input, player) {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (player === 1) {
                    player1Image = e.target.result;
                } else {
                    player2Image = e.target.result;
                }
                validateStartGame();
            };
            reader.readAsDataURL(file);
        }
    }

    // Default Avatar Selection
    defaultAvatars.forEach(avatar => {
        avatar.addEventListener('click', function() {
            const player = this.dataset.player;
            const avatarGroup = document.querySelectorAll(`.default-avatar[data-player="${player}"]`);
            
            avatarGroup.forEach(a => a.classList.remove('selected'));
            this.classList.add('selected');

            if (player === '1') {
                player1Image = this.src;
            } else {
                player2Image = this.src;
            }
            validateStartGame();
        });
    });

    player1ImageInput.addEventListener('change', () => handleImageSelection(player1ImageInput, 1));
    player2ImageInput.addEventListener('change', () => handleImageSelection(player2ImageInput, 2));

    function validateStartGame() {
        startGameBtn.disabled = !(player1Image && player2Image);
    }

    // Start Game
    startGameBtn.addEventListener('click', () => {
        playerSelection.classList.remove('active');
        gameBoard.classList.add('active');
        gameActive = true;
        updateTurnIndicator();
    });

    // Game Board Logic
    function updateTurnIndicator() {
        currentPlayerName.textContent = `Player ${currentPlayer}'s Turn`;
        currentPlayerImage.src = currentPlayer === 1 ? player1Image : player2Image;
    }

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = cell.dataset.index;
            if (gameState[index] === '' && gameActive) {
                gameState[index] = currentPlayer === 1 ? 'Player1' : 'Player2';
                cell.innerHTML = `<img src="${currentPlayer === 1 ? player1Image : player2Image}" alt="Player ${currentPlayer}">`;
                
                if (checkWin(currentPlayer)) {
                    endGame(false);
                } else if (isDraw()) {
                    endGame(true);
                } else {
                    currentPlayer = currentPlayer === 1 ? 2 : 1;
                    updateTurnIndicator();
                }
            }
        });
    });

    function checkWin(player) {
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];

        return winCombos.some(combo => {
            return combo.every(index => 
                gameState[index] === (player === 1 ? 'Player1' : 'Player2')
            );
        });
    }

    function isDraw() {
        return gameState.every(cell => cell !== '');
    }

    function endGame(draw) {
        gameActive = false;
        gameResult.style.display = 'flex';
        
        if (draw) {
            resultMessage.textContent = "It's a Draw!";
        } else {
            resultMessage.textContent = `Player ${currentPlayer} Wins!`;
        }
    }

    playAgainBtn.addEventListener('click', () => {
        gameResult.style.display = 'none';
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.innerHTML = '');
        currentPlayer = 1;
        gameActive = true;
        updateTurnIndicator();document.addEventListener('DOMContentLoaded', () => {
            const playerSelection = document.getElementById('player-selection');
            const gameBoard = document.getElementById('game-board');
            const startGameBtn = document.getElementById('start-game');
            const player1ImageInput = document.getElementById('player1-image');
            const player2ImageInput = document.getElementById('player2-image');
            const defaultAvatars = document.querySelectorAll('.default-avatar');
            const cells = document.querySelectorAll('.cell');
            const currentPlayerName = document.getElementById('current-player-name');
            const currentPlayerImage = document.getElementById('current-player-image');
            const gameResult = document.getElementById('game-result');
            const resultMessage = document.getElementById('result-message');
            const playAgainBtn = document.getElementById('play-again');
            const timerDisplay = document.getElementById('timer-display');
            const player1MovesDisplay = document.getElementById('player1-moves');
            const player2MovesDisplay = document.getElementById('player2-moves');
            const gameTimeSelect = document.getElementById('game-time');
        
            let player1Image = null;
            let player2Image = null;
            let currentPlayer = 1;
            let gameState = ['', '', '', '', '', '', '', '', ''];
            let gameActive = false;
            let timer = null;
            let timeRemaining = 0;
            let player1Moves = 3;
            let player2Moves = 3;
        
            // Image Selection Logic
            function handleImageSelection(input, player) {
                const file = input.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (player === 1) {
                            player1Image = e.target.result;
                        } else {
                            player2Image = e.target.result;
                        }
                        validateStartGame();
                    };
                    reader.readAsDataURL(file);
                }
            }
        
            // Default Avatar Selection
            defaultAvatars.forEach(avatar => {
                avatar.addEventListener('click', function() {
                    const player = this.dataset.player;
                    const avatarGroup = document.querySelectorAll(`.default-avatar[data-player="${player}"]`);
                    
                    avatarGroup.forEach(a => a.classList.remove('selected'));
                    this.classList.add('selected');
        
                    if (player === '1') {
                        player1Image = this.src;
                    } else {
                        player2Image = this.src;
                    }
                    validateStartGame();
                });
            });
        
            player1ImageInput.addEventListener('change', () => handleImageSelection(player1ImageInput, 1));
            player2ImageInput.addEventListener('change', () => handleImageSelection(player2ImageInput, 2));
        
            function validateStartGame() {
                startGameBtn.disabled = !(player1Image && player2Image);
            }
        
            // Start Game
            startGameBtn.addEventListener('click', () => {
                playerSelection.classList.remove('active');
                gameBoard.classList.add('active');
                gameActive = true;
                
                // Set game time
                timeRemaining = parseInt(gameTimeSelect.value) * 60;
                startTimer();
                
                updateTurnIndicator();
            });
        
            function startTimer() {
                timerDisplay.textContent = formatTime(timeRemaining);
                timer = setInterval(() => {
                    timeRemaining--;
                    timerDisplay.textContent = formatTime(timeRemaining);
                    
                    if (timeRemaining <= 0) {
                        clearInterval(timer);
                        endGame(true);  // Time's up, it's a draw
                    }
                }, 1000);
            }
        
            function formatTime(seconds) {
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
            }
        
            // Game Board Logic
            function updateTurnIndicator() {
                currentPlayerName.textContent = `Player ${currentPlayer}'s Turn`;
                currentPlayerImage.src = currentPlayer === 1 ? player1Image : player2Image;
            }
        
            cells.forEach(cell => {
                cell.addEventListener('click', () => {
                    const index = cell.dataset.index;
                    if (gameState[index] === '' && gameActive) {
                        // Check moves left
                        if (currentPlayer === 1 && player1Moves > 0) {
                            gameState[index] = 'Player1';
                            cell.innerHTML = `<img src="${player1Image}" alt="Player 1">`;
                            player1Moves--;
                            player1MovesDisplay.textContent = player1Moves;
                        } else if (currentPlayer === 2 && player2Moves > 0) {
                            gameState[index] = 'Player2';
                            cell.innerHTML = `<img src="${player2Image}" alt="Player 2">`;
                            player2Moves--;
                            player2MovesDisplay.textContent = player2Moves;
                        } else {
                            return;  // No moves left
                        }
                        
                        if (checkWin(currentPlayer)) {
                            endGame(false);
                        } else if (isDraw()) {
                            endGame(true);
                        } else {
                            currentPlayer = currentPlayer === 1 ? 2 : 1;
                            updateTurnIndicator();
                        }
                    }
                });
            });
        
            function checkWin(player) {
                const winCombos = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
                    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
                    [0, 4, 8], [2, 4, 6]  // Diagonals
                ];
        
                return winCombos.some(combo => {
                    return combo.every(index => 
                        gameState[index] === (player === 1 ? 'Player1' : 'Player2')
                    );
                });
            }
        
            function isDraw() {
                return gameState.every(cell => cell !== '') || 
                       (player1Moves === 0 && player2Moves === 0);
            }
        
            function endGame(draw) {
                gameActive = false;
                clearInterval(timer);
                gameResult.style.display = 'flex';
                
                if (draw) {
                    resultMessage.textContent = "It's a Draw!";
                } else {
                    resultMessage.textContent = `Player ${currentPlayer} Wins!`;
                }
            }
        
            playAgainBtn.addEventListener('click', () => {
                gameResult.style.display = 'none';
                gameState = ['', '', '', '', '', '', '', '', ''];
                cells.forEach(cell => cell.innerHTML = '');
                currentPlayer = 1;
                gameActive = true;
                
                // Reset moves
                player1Moves = 3;
                player2Moves = 3;
                player1MovesDisplay.textContent = player1Moves;
                player2MovesDisplay.textContent = player2Moves;
                
                // Restart timer
                timeRemaining = parseInt(gameTimeSelect.value) * 60;
                startTimer();
                
                updateTurnIndicator();
            });
        });document.addEventListener('DOMContentLoaded', () => {
            const playerSelection = document.getElementById('player-selection');
            const gameBoard = document.getElementById('game-board');
            const startGameBtn = document.getElementById('start-game');
            const player1ImageInput = document.getElementById('player1-image');
            const player2ImageInput = document.getElementById('player2-image');
            const defaultAvatars = document.querySelectorAll('.default-avatar');
            const cells = document.querySelectorAll('.cell');
            const currentPlayerName = document.getElementById('current-player-name');
            const currentPlayerImage = document.getElementById('current-player-image');
            const gameResult = document.getElementById('game-result');
            const resultMessage = document.getElementById('result-message');
            const playAgainBtn = document.getElementById('play-again');
            const timerDisplay = document.getElementById('timer-display');
            const player1MovesDisplay = document.getElementById('player1-moves');
            const player2MovesDisplay = document.getElementById('player2-moves');
            const gameTimeSelect = document.getElementById('game-time');
        
            let player1Image = null;
            let player2Image = null;
            let currentPlayer = 1;
            let gameState = ['', '', '', '', '', '', '', '', ''];
            let gameActive = false;
            let timer = null;
            let timeRemaining = 0;
            let player1Moves = 3;
            let player2Moves = 3;
        
            // Image Selection Logic
            function handleImageSelection(input, player) {
                const file = input.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (player === 1) {
                            player1Image = e.target.result;
                        } else {
                            player2Image = e.target.result;
                        }
                        validateStartGame();
                    };
                    reader.readAsDataURL(file);
                }
            }
        
            // Default Avatar Selection
            defaultAvatars.forEach(avatar => {
                avatar.addEventListener('click', function() {
                    const player = this.dataset.player;
                    const avatarGroup = document.querySelectorAll(`.default-avatar[data-player="${player}"]`);
                    
                    avatarGroup.forEach(a => a.classList.remove('selected'));
                    this.classList.add('selected');
        
                    if (player === '1') {
                        player1Image = this.src;
                    } else {
                        player2Image = this.src;
                    }
                    validateStartGame();
                });
            });
        
            player1ImageInput.addEventListener('change', () => handleImageSelection(player1ImageInput, 1));
            player2ImageInput.addEventListener('change', () => handleImageSelection(player2ImageInput, 2));
        
            function validateStartGame() {
                startGameBtn.disabled = !(player1Image && player2Image);
            }
        
            // Start Game
            startGameBtn.addEventListener('click', () => {
                playerSelection.classList.remove('active');
                gameBoard.classList.add('active');
                gameActive = true;
                
                // Set game time
                timeRemaining = parseInt(gameTimeSelect.value) * 60;
                startTimer();
                
                updateTurnIndicator();
            });
        
            function startTimer() {
                timerDisplay.textContent = formatTime(timeRemaining);
                timer = setInterval(() => {
                    timeRemaining--;
                    timerDisplay.textContent = formatTime(timeRemaining);
                    
                    if (timeRemaining <= 0) {
                        clearInterval(timer);
                        endGame(true);  // Time's up, it's a draw
                    }
                }, 1000);
            }
        
            function formatTime(seconds) {
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
            }
        
            // Game Board Logic
            function updateTurnIndicator() {
                currentPlayerName.textContent = `Player ${currentPlayer}'s Turn`;
                currentPlayerImage.src = currentPlayer === 1 ? player1Image : player2Image;
            }
        
            cells.forEach(cell => {
                cell.addEventListener('click', () => {
                    const index = cell.dataset.index;
                    if (gameState[index] === '' && gameActive) {
                        // Check moves left
                        if (currentPlayer === 1 && player1Moves > 0) {
                            gameState[index] = 'Player1';
                            cell.innerHTML = `<img src="${player1Image}" alt="Player 1">`;
                            player1Moves--;
                            player1MovesDisplay.textContent = player1Moves;
                        } else if (currentPlayer === 2 && player2Moves > 0) {
                            gameState[index] = 'Player2';
                            cell.innerHTML = `<img src="${player2Image}" alt="Player 2">`;
                            player2Moves--;
                            player2MovesDisplay.textContent = player2Moves;
                        } else {
                            return;  // No moves left
                        }
                        
                        if (checkWin(currentPlayer)) {
                            endGame(false);
                        } else if (isDraw()) {
                            endGame(true);
                        } else {
                            currentPlayer = currentPlayer === 1 ? 2 : 1;
                            updateTurnIndicator();
                        }
                    }
                });
            });
        
            function checkWin(player) {
                const winCombos = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
                    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
                    [0, 4, 8], [2, 4, 6]  // Diagonals
                ];
        
                return winCombos.some(combo => {
                    return combo.every(index => 
                        gameState[index] === (player === 1 ? 'Player1' : 'Player2')
                    );
                });
            }
        
            function isDraw() {
                return gameState.every(cell => cell !== '') || 
                       (player1Moves === 0 && player2Moves === 0);
            }
        
            function endGame(draw) {
                gameActive = false;
                clearInterval(timer);
                gameResult.style.display = 'flex';
                
                if (draw) {
                    resultMessage.textContent = "It's a Draw!";
                } else {
                    resultMessage.textContent = `Player ${currentPlayer} Wins!`;
                }
            }
        
            playAgainBtn.addEventListener('click', () => {
                gameResult.style.display = 'none';
                gameState = ['', '', '', '', '', '', '', '', ''];
                cells.forEach(cell => cell.innerHTML = '');
                currentPlayer = 1;
                gameActive = true;
                
                // Reset moves
                player1Moves = 3;
                player2Moves = 3;
                player1MovesDisplay.textContent = player1Moves;
                player2MovesDisplay.textContent = player2Moves;
                
                // Restart timer
                timeRemaining = parseInt(gameTimeSelect.value) * 60;
                startTimer();
                
                updateTurnIndicator();
            });
        });
    });
});