/* *************************************************************************************************** */
/*                       INDEX.JS                                                                      */
/* *************************************************************************************************** */

const gameCtrl = new GameController();
const posCtrl  = new PositionController();
const activeCoin = new ActiveCoinController();

export const gameState = new GameState();

board.logBoardState();

/* *************************************************************************************************** */
/*                       EVENT LISTENERS                                                               */
/* *************************************************************************************************** */


document.addEventListener('coin-selected', event =>
{               
    console.log('COIN-SELECTED');

    if(gameState.timerStarted === false)
    {
        timerView.startTimer();
        gameState.timerStarted = true;
    }

    activeCoin.initialize(parseCoinData(event));

    if(activeCoin.isBlocked)
    {   
        activeCoin.disableDrag();
        //activeCoin.enableDrag();
        activeCoin.highlightBlockingCoins();
        
        messageBoxView.showMessage('coin-blocked');
    }
    else
    {
        posCtrl.detatchCoinFrom(activeCoin.origin);
        posCtrl.enableOpenPositions();
        
        if(gameState.hintsEnabled) 
            posCtrl.revealOpenPositions();
    }

    board.logBoardState();

});

document.addEventListener('coin-moved', () =>
{
    console.log('COIN-MOVED');
    activeCoin.moved = true;
});

document.addEventListener('coin-over', event =>
{
    console.log('COIN-OVER', event.detail.posID);
    
    var openPosition = parseID(event.detail.posID);

    activeCoin.isOver(openPosition);
});

document.addEventListener('coin-released', () =>
{
    console.log('COIN-RELEASE');

    if(activeCoin.isBlocked)
    {
        console.log('   BLOCKED');
        activeCoin.enableDrag();
        posCtrl.disableOpenPositions();
    }

    else if(activeCoin.moved === false)
    {
        posCtrl.addCoinTo(activeCoin.origin, activeCoin.id);
        posCtrl.disableOpenPositions();
    }

    board.logBoardState();

    if(gameState.hintsEnabled) 
        posCtrl.concealOpenPositions();
});

document.addEventListener('coin-reverted', () =>
{
    console.log('COIN-REVERTED');
    if(activeCoin.dropped === false) 
    {
        console.log('REVERTED ADD');
        posCtrl.addCoinTo(activeCoin.origin, activeCoin.id);
        posCtrl.disableOpenPositions();

        messageBoxView.showMessage('coin-reverted');

        board.logBoardState();
    }
});

document.addEventListener('coin-dropped', event =>
{
    console.log('   COIN-DROP ADD');

    var dropPosition = parseID(event.detail.posID);
    
    activeCoin.snapCoinTo(dropPosition);

    posCtrl.addCoinTo(dropPosition, activeCoin.id);
    posCtrl.disablePosition(dropPosition);

    if(!activeCoin.overOrigin())
    {
        gameState.moves++;
        gameState.totalMoves++;
        movesView.incrementMoves(gameState.moves);
    }

    board.logBoardState();

    if(gameCtrl.solutionFound())
    {
        gameState.attempts += 1;

        // disable everything in game-container
        
        // This will disable everything contained in the div
        // $("game-container").children().prop('disabled',true);
        
        gameState.currentTime = timerView.stopTimer();

        progressView.displayProgress();
    }

    if(gameState.solvedInThree)
    {
        //alert('GAME OVER');
        gameState.currentTime = timerView.stopTimer();
    }
    else
    {
        activeCoin.dropped = true;
        posCtrl.disableOpenPositions();
    }

});

document.addEventListener('next-attempt-started', () =>
{

    gameCtrl.resetBoard();
    
    timerView.startTimer();
    gameState.timerStarted = true;

});

document.addEventListener('hints-clicked', () =>
{
    console.log('HINTS-CLICKED', gameState.hintsEnabled);

    gameState.hintsEnabled = !gameState.hintsEnabled;

    gameState.hintsEnabled ? elements.hintButton.value = 'Hide Hints' :
                             elements.hintButton.value = 'Show Hints';

    gameState.hintsUsed = true;

});

/* *************************************************************************************************** */
/*                       UTILITY FUNCTIONS                                                             */
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

/* *************************************************************************************************** */
/*                       IMPORTS                                                                       */
/* *************************************************************************************************** */

import GameController from './controllers/GameController.js';
import PositionController from './controllers/PositionController-test.js';
import ActiveCoinController from './controllers/ActiveCoinController.js';

import GameState from './states/GameState.js';

import {elements} from './views/base.js';
import * as messageBoxView from './views/messageBoxView.js';
import * as movesView from './views/movesView.js';
import * as hintButtonView from './views/hintButtonView.js';
import * as progressView from './views/progressView.js'
import * as timerView from './views/timerView.js';

import {board} from './controllers/GameController.js';