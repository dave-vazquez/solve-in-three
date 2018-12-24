/* *************************************************************************************************** */
/*                                   PROGRESS VIEW                                                     */
/* *************************************************************************************************** */

/* *************************************************************************************************** */
/*                                      IMPORTS                                                        */
/* *************************************************************************************************** */

import $ from 'jquery';
import {gameState} from '../index.js';
import {elements} from '../views/base.js';

/* *************************************************************************************************** */
/*                                  EVENT LISETNERS                                                    */
/* *************************************************************************************************** */

elements.progressContinueButton.addEventListener('click', () =>
{
    $(elements.progressMessageContainer).finish().fadeOut(10);
    elements.board.style.filter = 'blur(0px)';
    
    document.dispatchEvent(new Event('next-attempt-started'));
})

/* *************************************************************************************************** */
/*                                       FUNCTIONS                                                     */
/* *************************************************************************************************** */

export const displayProgress = () =>
{
    let numMoves = gameState.moves;
    let minutes = gameState.currentTime.minutes;
    let seconds = gameState.currentTime.seconds;
    let attempts = gameState.attempts;
    let hintsUsed = gameState.hintsUsed;

    elements.board.style.filter = 'blur(10px)';
    elements.board.style.transition = '1s filter linear';

    if(gameState.moves > 3)
    {
        elements.progressMessage1.innerText = `You solved the puzzle in ${numMoves} moves.`;
        elements.progressMessage2.innerText = 'But can you solve it in 3...';
    }
    else
    {
        elements.progressMessage1.innerText = 'Congratulations! You solved the puzzle in 3 moves!';
        elements.progressMessage2.innerText = 'Try again in a few days and see how quickly you can solve it again!';
    }

    elements.stat1.innerText = attempts;
    elements.stat2.innerText = `${minutes > 0 ? minutes + ' min,' : ''} ${seconds} sec`;
    elements.stat3.innerText = `${hintsUsed ? 'Yes' : 'No'}`;

    $(elements.progressMessageContainer).fadeIn(2000);
}
