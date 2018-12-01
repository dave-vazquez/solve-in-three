import $ from 'jquery';
import {elements} from './base.js';

export const showMessage = messageType =>
{
    var messageBox = elements.messageBox;

    switch(messageType)
    {
        case('coin-blocked'):
        {
            messageBox.innerText = 'The coin is blocked by the surrounding coins.';
            $(messageBox).fadeIn(200).fadeOut(2000);
        }
        break;

        case('coin-reverted'):
        {
            messageBox.innerText = 'A coin can only move where two coins will touch.';
            $(messageBox).fadeIn(200).fadeOut(2000);
        }
        break;
    }
}