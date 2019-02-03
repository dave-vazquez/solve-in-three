import $ from 'jquery';
import {elements} from './base.js';
import {game} from '../index.js';

/* *************************************************************************************************** */
/*                                        HINT BUTTON VIEW                                             */
/* *************************************************************************************************** */

export default class HintButtonView
{
    toggleHintButton()
    {
        if(game.hintsEnabled)
        {
            $(elements.hintButtonImg).attr('src', './images/no-hints-black.png')
            
            $(elements.hintButton).css({
                boxShadow: 'none',
                backgroundColor: '#d1d1d1'
            });
        }
        else
        {
            $(elements.hintButtonImg).attr('src', './images/hints-black.png')
            
            $(elements.hintButton).css({
                boxShadow: 'inset 2px 2px 2px rgba(0, 0, 0, 0.33)',
                backgroundColor: '#c2c2c2'
            });
        }                 $(elements.hintButton).val('Hide Hints');
    
        game.hintsEnabled = !game.hintsEnabled;

        game.hintsUsed = true;
    }
    
    resetHintButton()
    {
        $(elements.hintButtonImg).attr('src', './images/no-hints-black.png')
            
        $(elements.hintButton).css({
            boxShadow: 'none',
            backgroundColor: '#d1d1d1'
        });

        game.hintsEnabled = false;
    }
}

/* *************************************************************************************************** */
/*                                          EVENT LISTENER                                             */
/* *************************************************************************************************** */

$(elements.hintButton).on('click', () =>
{
    HintButtonView.prototype.toggleHintButton();
});

