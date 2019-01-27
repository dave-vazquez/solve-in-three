console.log('progressView.js');

import $ from 'jquery';
import {game} from '../index.js';
import {elements} from '../views/base.js';

/* *************************************************************************************************** */
/*                                        PROGRESS VIEW                                                */
/* *************************************************************************************************** */

export default class ProgressMessageView
{
    constructor()
    {
        this.numMoves = null;
        this.minutes = null;
        this.seconds = null;
        this.attempts = null;
        this.hintsUsed = null;
    }
    
    displayProgressMessage()
    {   
        this.initializeGameStats();
    
        this.numMoves === 3 ? this.initializeProgressMessage(true) :
                                 this.initializeProgressMessage(false);

        this.updateContinueButton();
    
        this.blurGameBoard();
        this.fadeInProgressMessage();
    }

    blurGameBoard()
    {
        elements.board.style.filter = 'blur(10px)';
        elements.board.style.transition = '2s filter linear';
    }

    initializeGameStats()
    {
        this.numMoves = game.moves;
        this.minutes = game.currentTime.minutes;
        this.seconds = game.currentTime.seconds;
        this.attempts = game.attempts;
        this.hintsUsed = game.hintsUsed;

        elements.stat1.innerText = this.attempts;
        elements.stat2.innerText = `${this.minutes > 0 ? this.minutes + ' min,' : ''} ${this.seconds} sec`;
        elements.stat3.innerText = `${this.hintsUsed ? 'Yes' : 'No'}`;
    }

    initializeProgressMessage(solvedInThree)
    {
        if(solvedInThree) {
            elements.progressMessage1.innerText = 'Congratulations! You solved the puzzle in 3 moves!';
            elements.progressMessage2.innerText = 'Try again in a few days and see how quickly you can solve it again!';
        }
        else {
            elements.progressMessage1.innerText = `You solved the puzzle in ${this.numMoves} moves.`;
            elements.progressMessage2.innerText = 'But can you solve it in 3...';
        }
    }

    updateContinueButton()
    {
        if(game.solvedInThree)
            $(elements.progressContinueButton).val('Restart Puzzle');
    }

    fadeInProgressMessage()
    {
        $(elements.progressMessageContainer).fadeIn(2000);
        $('#game-container *').prop('disabled', true);
        $('.coin').css({pointerEvents: 'none'});
    }
}

/* *************************************************************************************************** */
/*                                        EVENT LISTENER                                               */
/* *************************************************************************************************** */

elements.progressContinueButton.addEventListener('click', () =>
{        
    if(game.solvedInThree)
        $(elements.progressMessageContainer).fadeOut(500);

    document.dispatchEvent(new Event('next-attempt-started'));
});


