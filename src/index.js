console.log('index.js');

import $ from 'jquery';
import {elements} from './views/base.js';
import {animateIntro} from './transitions/intro-2.js';
import {startGame} from './transitions/startGame.js';
import {animateTransition} from './transitions/transitionNewAttempt.js';
import GameController from './controllers/GameController.js'

/* *************************************************************************************************** */
/*                                        INDEX.JS                                                     */
/* *************************************************************************************************** */

export const game = new GameController();

$('#intro-button').on('click', () =>
{
    $('#start-button-container').fadeOut(400);

    animateIntro();
});

$('#start-button').on('click', () =>
{
    $('#start-button-container').fadeOut(400);

    startGame();
});

document.addEventListener('next-attempt-started', async () =>
{
    if(game.solvedInThree)
    {
        $(elements.gameContainer).fadeOut(500);
        setTimeout(()=> document.location.reload(), 500);
    }
    else
    {
        game.resetBoard();
        
        await animateTransition();
        
        game.startTimer();
    }
});

$(document).mouseleave(() =>
{
    if(game.activeCoin.isActive)
        game.forceCoinRelease()
});


