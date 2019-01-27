console.log('GameController.js');

import Board from '../models/Board';

import CoinView from '../views/coinView.js';
import PositionView from '../views/positionView.js'
import AttemptsView from '../views/attemptsView.js';
import TimerView from '../views/timerView.js';
import MessageView from'../views/messageView.js';
import MovesView from '../views/movesView.js';
import HintButtonView from '../views/hintButtonView.js'
import '../views/helpView.js';
import ProgressView from '../views/progressView.js';

/* *************************************************************************************************** */
/*                                       GAME CONTROLLER                                               */
/* *************************************************************************************************** */

let positionView = new PositionView();
let coinView = new CoinView();
const attemptsView = new AttemptsView();
const timerView = new TimerView();
const messageView = new MessageView();
const movesView = new MovesView();
const progressView = new ProgressView();
const hintButtonView = new HintButtonView();

let board = new Board();

export default class GameController
{
    constructor()
    {
        this.moves = 0;
        this.attempts = 0;
        //this.attemptStarted = false;

        this.hintsEnabled = false;
        this.hintsUsed = false;

        this.solvedInThree = false;

        this.currentTime = {
            minutes: 0,
            seconds: 0,
            totalSeconds: 0
        }

        this.timerStarted = false;

        this.reset = () => {
            this.moves = 0;
            this.hintsEnabled = false;
            //this.attemptStarted = false;
        };

        this.activeCoin = new ActiveCoinState();
    }

    selectCoin(coinID, posID) {   
        
        this.initializeActiveCoinPorperties(coinID, posID);

        if(this.timerStarted === false)
            this.startTimer();

        if(board.coinIsBlocked(this.activeCoin.origin))
            this.preventFurtherAction();
        else
            this.startNewMove();
    }

    moveCoin() {
        
        this.activeCoin.moved = true;
    }

    moveCoinOver(posID){
        
        this.activeCoin.isOver(this.parseID(posID));
    }

    releaseCoin() {
        
        if(this.activeCoin.moved === false)
            this.returnCoinToOrigin();
    
        if(this.hintsEnabled) 
            positionView.concealOpenPositions(board.openPositions);

        coinView.lowerCoin(this.activeCoin.id);
    }

    dropCoin(position)
    {   
        let dropPosition = this.parseID(position);

        this.addCoinToNewPosition(dropPosition);

        this.disableOpenPosition(dropPosition);

        if(this.activeCoin.returnedToOrigin() === false)
            this.incrementMoves();

        if(board.solutionFound())
            this.endCurrentAttempt();
    }

    handleCoinRevert() {

        //console.log('COIN-REVERTED');
        // problem here, when a coin is isolated and moved slightly the coin-reverted error message will fire
        
        if(this.activeCoin.dropped === false) 
        {
            this.returnCoinToOrigin();

            if(this.activeCoin.moved)
                messageView.showMessage('invalid-move');
        }
    }

    addCoinToNewPosition(dropPosition)
    {
        board.addCoinTo(dropPosition, this.activeCoin.id);

        coinView.snapCoinTo(dropPosition, this.activeCoin.id);
        this.activeCoin.dropped = true;
        this.activeCoin.isActive = false;
    }

    disableOpenPosition(dropPosition)
    {
        positionView.disableDrop(dropPosition);
        positionView.disableDrop(board.openPositions);
    }

    incrementMoves()
    {
        this.moves++;
        movesView.incrementMoves(this.moves);
    }

    endCurrentAttempt()
    {
        if(this.moves === 3)
            this.solvedInThree = true;
            
        this.currentTime = timerView.stopTimer();
        
        this.incrementAttempts();

        progressView.displayProgressMessage();
    }

    initializeActiveCoinPorperties(coinID, posID)
    {
        this.activeCoin.initialize(this.parseID(coinID), this.parseID(posID));
    }

    startTimer()
    {
        console.log('STARTING TIMER');
        timerView.startTimer();
        this.timerStarted = true;
    }

    preventFurtherAction()
    {
        // forces a 'mouseup' event on the activeCoin
        coinView.forceRelease(this.activeCoin.id);
            
        coinView.highlightCoins(board.surroundingCoins);
        
        messageView.showMessage('coin-blocked');
    }

    startNewMove()
    {
        board.removeCoinFrom(this.activeCoin.origin);

        coinView.raiseCoin(this.activeCoin.id);

        positionView.enableDrop(board.openPositions);
        
        if(this.hintsEnabled) 
            positionView.revealOpenPositions(board.openPositions);
    }

    returnCoinToOrigin()
    {
        board.addCoinTo(this.activeCoin.origin, this.activeCoin.id);
        positionView.disableDrop(board.openPositions);
    }

    resetBoard()
    {
        this.resetCoinPositions();

        hintButtonView.resetHintButton(); 

        board = new Board();
        this.reset();
    }

    incrementAttempts()
    {
        this.attempts++;
        //this.attemptStarted = true;
        attemptsView.incrementAttempts(this.attempts);
    }

    resetCoinPositions()
    {
        positionView.removeCoinsFrom(board.occupiedPosIDs);
        coinView.resetCoinPositions();
    }

    forceCoinRelease()
    {
        coinView.forceRelease(this.activeCoin.id);
    }

    parseID(id)
    {
        return parseInt(id.match(/\d+/)[0]);
    }
}

/* *************************************************************************************************** */
/*                                         ACTIVE COIN STATE                                           */
/* *************************************************************************************************** */

class ActiveCoinState
{
    constructor()
    {        
        this.id = null;
        this.origin = null;
        this.lastPositionOver = null;

        this.moved = false;
        this.dropped = false;

        this.isActive = false;
    }

    initialize(id, origin)
    {
        this.id = id;
        this.origin = origin;
        this.lastPositionOver = this.origin;
        
        this.moved = false;
        this.dropped = false;

        this.isActive = true;
    }

    isOver(posID)
    {
        this.lastPositionOver = posID;
    }

    returnedToOrigin()
    {
        return this.lastPositionOver === this.origin;
    }

    isOut()
    {
        this.overDroppable = false;
    }

    reverted()
    {
        return this.overDroppable === false;
    }
}
