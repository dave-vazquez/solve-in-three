/* *************************************************************************************************** */
/*                       EVENT LISTENERS                                                               */
/* *************************************************************************************************** */

export const bindDroppable = position =>
{
    $(position).droppable(
    {
        over: function()
        {
            document.dispatchEvent(new CustomEvent('coin-over',
            {   
                detail: {posID: this.id}
            }));
        },

        drop: function()
        {
            document.dispatchEvent(new CustomEvent('coin-dropped',
            {   
                detail: {posID: this.id}
            }));
        }
    });
}
bindDroppable(elements.classPosition);

/* *************************************************************************************************** */
/*                       POSITION VIEW FUNCTIONS                                                       */
/* *************************************************************************************************** */

export const dropEnabled = (toggle, posID) =>
{
    var position = elements.position(posID);

    $(position).droppable('option', 'disabled', !toggle);
}

export const positionDroppable = (toggle, posID) =>
{
    var position = elements.position(posID);

    $(position).droppable('option', 'disabled', !toggle);
}

export const positionBeveled = (toggle, posID) =>          
{
    var position = elements.position(posID);

    if(toggle)
    {
        $(position).stop().animate({boxShadow: 'inset 5px 5px 10px #818181'}, 100);
        position.style['border'] = '1px solid #666666';
        position.style['background-color'] = '#c2c2c2';
    }
    else
    {
        $(position).stop().animate({boxShadow: 'inset 0px 0px 0px #818181'}, 100);
        position.style['border'] = '1px solid #919191';
        position.style['background-color'] = '#d1d1d1';
    }
}

/* *************************************************************************************************** */
/*                       IMPORTS                                                                       */
/* *************************************************************************************************** */

import $ from 'jquery';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-shadow-animation/jquery.animate-shadow';
import {elements} from './base.js';

