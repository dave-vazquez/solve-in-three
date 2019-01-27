console.log('index.js');

import $ from 'jquery';
import {elements} from './views/base.js';
import {animateIntro} from './transitions/intro-2.js';
import {animateTransition} from './transitions/transitionNewAttempt.js';
import GameController from './controllers/GameController.js'

/* *************************************************************************************************** */
/*                                        INDEX.JS                                                     */
/* *************************************************************************************************** */

export const game = new GameController();

animateIntro();

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


