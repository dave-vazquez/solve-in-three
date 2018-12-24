/* *************************************************************************************************** */
/*                       IMPORTS                                                                       */
/* *************************************************************************************************** */

import GameController from './controllers/GameController.js';
import PositionController from './controllers/PositionController.js';
import ActiveCoinController from './controllers/ActiveCoinController.js';

import GameState from './states/GameState.js';

import * as messageBoxView from './views/messageBoxView.js';
import * as movesView from './views/movesView.js';
import * as attemptsView from './views/attemptsView.js';
import * as hintButtonView from './views/hintButtonView.js';
import * as progressView from './views/progressView.js'
import * as timerView from './views/timerView.js';

import $ from 'jquery';

/* *************************************************************************************************** */
/*                       INDEX.JS                                                                      */
/* *************************************************************************************************** */

const gameCtrl = new GameController();
const posCtrl  = new PositionController();
const activeCoin = new ActiveCoinController();

export const gameState = new GameState();

/* *************************************************************************************************** */
/*                       EVENT LISTENERS                                                               */
/* *************************************************************************************************** */


document.addEventListener('coin-selected', event =>
{               
    if(!gameState.roundStarted)
    {
        gameState.attempts++;
        attemptsView.incrementAttempts(gameState.attempts);

        gameState.roundStarted = true;

        if(!gameState.timerStarted)
            timerView.startTimer();
    }

    activeCoin.initialize(parseCoinData(event));

    if(activeCoin.isBlocked)
    {   
        activeCoin.release();

        activeCoin.highlightSurroundingCoins();
        
        messageBoxView.showMessage('coin-blocked');
    }
    else
    {
        posCtrl.detatchCoinFrom(activeCoin.origin);
        posCtrl.enableOpenPositions();
        
        if(gameState.hintsEnabled) 
            posCtrl.revealOpenPositions();
    }

});

document.addEventListener('coin-moved', () => activeCoin.moved = true);

document.addEventListener('coin-over', event =>
{
    var position = parseID(event.detail.posID);

    activeCoin.isOver(position);
});

document.addEventListener('coin-released', () =>
{
    activeCoin.dropCoin();

    if(!activeCoin.moved)
    {
        posCtrl.addCoinTo(activeCoin.origin, activeCoin.id);
        posCtrl.disableOpenPositions();
    }

    if(gameState.hintsEnabled) 
        posCtrl.concealOpenPositions();
});

document.addEventListener('coin-reverted', () =>
{
    if(!activeCoin.dropped) 
    {
        posCtrl.addCoinTo(activeCoin.origin, activeCoin.id);
        posCtrl.disableOpenPositions();

        messageBoxView.showMessage('coin-reverted');
    }
});

document.addEventListener('coin-dropped', event =>
{    
    var dropPosition = parseID(event.detail.posID);
    
    activeCoin.snapCoinTo(dropPosition);
    activeCoin.dropped = true;

    posCtrl.addCoinTo(dropPosition, activeCoin.id);
    posCtrl.disablePosition(dropPosition);
    posCtrl.disableOpenPositions();

    if(!activeCoin.returnedToOrigin())
    {
        gameState.moves++;
        movesView.incrementMoves(gameState.moves);
    }

    if(gameCtrl.solutionFound())
    {
        if(gameState.moves === 3)
            gameState.solvedInThree = true;
        
        gameState.currentTime = timerView.stopTimer();

        progressView.displayProgress();
    }

});

document.addEventListener('next-attempt-started', () =>
{
    if(gameState.solvedInThree)
        gameCtrl.resetGame();
    else
    {
        gameCtrl.resetBoard();
        timerView.startTimer();
        gameState.timerStarted = true;
    }
});

document.addEventListener('hints-clicked', () =>
{
    gameState.hintsEnabled = !gameState.hintsEnabled;

    hintButtonView.toggleHintButtonValue(gameState.hintsEnabled);

    gameState.hintsUsed = true;
});

$(document).mouseleave(() =>
{
    if(activeCoin.isActive)
        activeCoin.release();

    // DOES NOT WORK AT BOTTOM BORDER
})

/* *************************************************************************************************** */
/*                                          FUNCTIONS                                                  */
/* *************************************************************************************************** */

function parseCoinData(event)
{    
    var id = parseID(event.detail.coinID);
    var origin = parseID(event.detail.posID)

    return {id, origin};
}

function parseID(id)
{
    return parseInt(id.match(/\d+/)[0]);
}

