/* *************************************************************************************************** */
/*                       IMPORTS                                                                       */
/* *************************************************************************************************** */

import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';

import Board from '../models/Board';
import Position from '../models/Position.js';
import Coin from '../models/Coin.js';

import * as positionView from '../views/positionView.js';
import * as coinView from '../views/coinView.js';
import * as timerView from '../views/timerView.js';
import * as movesView from '../views/movesView.js';
import * as attemptsView from '../views/attemptsView.js'
import * as hintButtonView from '../views/hintButtonView';

import {elements} from '../views/base.js';

import {gameState} from '../index.js';

import * as cookie from './cookieController.js'

/* *************************************************************************************************** */
/*                       GAME CONTROLLER                                                               */
/* *************************************************************************************************** */

export let board = new Board();

const INITIAL_BOARD_STATE = $(elements.board).clone();

export default class GameController
{
    constructor()
    {   
        this.initializePositions();
        this.initializeCoins();
        this.initializeTimer();
    }

    initializePositions()
    {
        elements.allPositions.forEach(position => 
        {            
            var posID = parseID(position.id);
            
            board.add(new Position(posID));

            $(position).droppable();
            $(position).droppable('disable');
        });
    }

    initializeCoins()
    {
        elements.allCoins.forEach(coin =>
        {
            var coinID = parseID(coin.id)
            var posID = parseID(coin.parentNode.id);
            
            board.addCoinTo(posID, new Coin(coinID));

            $(coin).draggable(
            {   
                revertDuration: 100,
                containment: 'document'
            });
        });
    }

    initializeTimer()
    {   
        cookie.destroy();

        //console.log('COOKIE:', cookie);
        
        let minutes = cookie.get('minutes').length === 0 ? 0 : parseInt(cookie.get('minutes'));
        let seconds = cookie.get('seconds').length === 0 ? 0 : parseInt(cookie.get('seconds'));
        let totalSeconds = cookie.get('totalSeconds').length === 0 ? 0 : parseInt(cookie.get('totalSeconds'));

        //console.log('Minutes:', minutes, 'Seconds:', seconds);
        
        cookie.set('totalSeconds', (minutes * 60) + seconds);

        timerView.setTime(minutes,seconds,totalSeconds);
        timerView.updateTimer();

        if(cookie.get('timerStarted') === 'true')
        {
             timerView.startTimer();
             gameState.timerStarted = true;
        }
    }

    solutionFound()
    {
        return board.solutionFound();
    }

    resetBoard()
    {   
        board = new Board();
        
        movesView.resetMoves();
        attemptsView.incrementAttempts(gameState.attempts);
        
        hintButtonView.resetHintButton();
        
        $(elements.board).replaceWith(INITIAL_BOARD_STATE.clone());

        elements.refresh();

        positionView.bindDroppable(elements.allPositions);
        coinView.bindDraggable(elements.allCoins);

        this.initializePositions();
        this.initializeCoins();

        gameState.reset();
    }

    resetGame()
    {
        board = new Board();

        attemptsView.resetAttempts();
        movesView.resetMoves();

        timerView.resetTime();
        timerView.stopTimer();

        hintButtonView.resetHintButton();

        gameState.resetAll();

        $(elements.board).replaceWith(INITIAL_BOARD_STATE.clone());

        elements.refresh();

        positionView.bindDroppable(elements.allPositions);
        coinView.bindDraggable(elements.allCoins);

        this.initializePositions();
        this.initializeCoins();
    }
}

function parseID(id)
{
    return parseInt(id.match(/\d+/)[0]);
}
