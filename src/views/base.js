/* *************************************************************************************************** */
/*                       BASE VIEW                                                                     */
/* *************************************************************************************************** */

export const elements = 
{
    gameContainer: document.getElementById('game-container'),
    
    board: document.getElementById('board'),
    
    position: id => document.getElementById(`pos${id}`),
    allPositions:   document.querySelectorAll('.position'),
    classPosition: '.position',
    
    coin: id => document.getElementById(`coin${id}`),
    allCoins:   document.querySelectorAll('.coin'),
    classCoin: '.coin',
    
    moveBlock: id => document.getElementById(`move${id}`),
    allMoveBlocks: document.querySelectorAll('.move-block'),
    moveCount: document.getElementById('move-count'),

    attempts: document.getElementById('attempts'),

    hintButton: document.getElementById('hint-button'),
    messageBox: document.getElementById('message-box'),

    timerMinutes: document.getElementById('minutes'),
    timerSeconds: document.getElementById('seconds'),

    progressMessageContainer: document.getElementById('progress-message-container'),
    progressMessage1: document.getElementById('progress-message-1'),
    progressMessage2: document.getElementById('progress-message-2'),

    redListItemGoals: document.querySelectorAll('#red-star-goals > li'),
    redStarImg: document.getElementById('red-star-img'),

    orangeListItemGoals: document.querySelectorAll('#orange-star-goals > li'),
    orangeStarImg: document.getElementById('orange-star-img'),

    yellowListItemGoals: document.querySelectorAll('#yellow-star-goals > li'),
    yellowStarImg: document.getElementById('yellow-star-img'),

    defaultStarGoals: document.querySelectorAll('#default-star-goals > li'),
    defaultStarImg: document.getElementById('default-star-img'),

    progressContinueButton: document.getElementById('continue-button'),

    refresh: function()
    {
        this.board = document.getElementById('board')
        this.allPositions = document.querySelectorAll('.position');
        this.allCoins = document.querySelectorAll('.coin');
    }
};



