/* *************************************************************************************************** */
/*                           MESSAGE BOX VIEW                                                          */
/* *************************************************************************************************** */

/* *************************************************************************************************** */
/*                                IMPORTS                                                              */
/* *************************************************************************************************** */

import $ from 'jquery';
import {elements} from './base.js';

var coinBlocked = false;

/* *************************************************************************************************** */
/*                               FUNCTIONS                                                             */
/* *************************************************************************************************** */

export const showMessage = messageType =>
{
    var messageBox = elements.messageBox;

    switch(messageType)
    {
        case('coin-blocked'):
        {
            messageBox.innerText = 'The coin is blocked by the surrounding coins.';

            $(messageBox).finish().fadeIn(200).delay(2000).fadeOut(500);

            coinBlocked = true;
        }
        break;

        case('coin-reverted'):
        {
            if(!coinBlocked)
            {
                messageBox.innerText = 'A coin can only move where two coins will touch.';

                $(messageBox).finish().fadeIn(200).delay(2000).fadeOut(500);
            }

            coinBlocked = false;
        }
        break;
    }
}
