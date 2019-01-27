console.log('messageView.js');

import $ from 'jquery';
import {elements} from './base.js';

/* *************************************************************************************************** */
/*                                        MESSAGE VIEW                                                 */
/* *************************************************************************************************** */

export default class MessageView
{
    showMessage(messageType)
    {
        var message = elements.message;

        switch(messageType)
        {
            case('coin-blocked'):
            {
                message.innerText = 'The coin is blocked by the surrounding coins.';

                $(message).finish().fadeIn(200).delay(2000).fadeOut(500);
            }
            break;

            case('invalid-move'):
            {

                message.innerText = 'A coin can only move where two or more coins will touch.';

                $(message).finish().fadeIn(200).delay(2000).fadeOut(500);
            }
            break;
        }
    }
}
