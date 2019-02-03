import $ from 'jquery';
import {game} from '../index.js';
import {elements} from '../views/base.js';
import {animateTransition} from '../transitions/transitionNewAttempt';

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
        this.renderProgressMessage();
        
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
            elements.progressMessage2.innerText = 'But can you solve it in 3?';
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

    renderProgressMessage()
    {
        if(elements.progressMessageContainer.hasChildNodes() === false)
        {
            $(elements.progressMessageContainer).html(`
                <div id="progress-message-header">
                    <h2 id="progress-message-1"></h2>
                    <p  id="progress-message-2"></p>
                </div>
                <div class="stats-container">
                    <table id="stats-table">
                        <tr>
                            <td id="stat-label-1"><img id="attempt-icon-prog" src="./images/attempts-black.png" alt="Attempts">Attempts:</td>
                            <td id="stat-1"></td>
                        <tr>
                        <tr>
                            <td id="stat-label-2"><img id="timer-icon-prog" src="./images/timer-black.png" alt="Timer">Time Elapsed:</td>
                            <td id="stat-2"></td>
                        </tr>
                        <tr>
                            <td id="stat-label-3"><img id="hints-icon-prog" src="./images/hints-black.png" alt="Hints">Hints Used:</td>
                            <td id="stat-3"></td>
                        </tr>
                    </table>
                </div>
                <input id="continue-button" type="button" value="Continue"></input>
            `);

            elements.initializeSelectors('progress-message');

            this.bindContinueButtonEvent();
        }
    }

    bindContinueButtonEvent()
    {
        var continueButton = elements.progressContinueButton;
        
        $(continueButton).on('click', async () =>
        {        
            $(continueButton).off();
            
            if(game.solvedInThree)
            {
                $(elements.progressMessageContainer).fadeOut(500);
                $(elements.gameContainer).fadeOut(500);

                setTimeout(()=> document.location.reload(), 500);
            }
            else
            {
                game.resetBoard();
                
                await animateTransition();
                
                game.startTimer();

                this.removeProgressMessage();
            }
        });
    }

    removeProgressMessage()
    {
        var container = elements.progressMessageContainer;
        
        while(container.firstChild)
            container.removeChild(container.firstChild);
    }
}
