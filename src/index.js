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

$(elements.playIntroButton).on('click', () =>
{
    $(elements.introButtonContainer).fadeOut(400);
    $(elements.playIntroButton).off();
    $(elements.startPuzzleButton).off();

    animateIntro();
});

$(elements.startPuzzleButton).on('click', () =>
{
    $(elements.introButtonContainer).fadeOut(400);
    $(elements.playIntroButton).off();
    $(elements.startPuzzleButton).off();

    startGame();
});


