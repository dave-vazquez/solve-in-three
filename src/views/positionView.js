/* *************************************************************************************************** */
/*                                   POSITION VIEW                                                     */
/* *************************************************************************************************** */

/* *************************************************************************************************** */
/*                                      IMPORTS                                                        */
/* *************************************************************************************************** */

import $ from 'jquery';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-shadow-animation/jquery.animate-shadow';
import {elements} from './base.js';

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
/*                              FUNCTIONS                                                              */
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
        $(position).stop().animate({boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.33)', backgroundColor: '#c2c2c2'}, 100);
        position.style['border'] = '1px solid #666666';
    }
    else
    {
        $(position).stop().animate({boxShadow: 'inset 0px 0px 0px rgba(0, 0, 0, 0.33)', backgroundColor: '#d1d1d1'}, 100);
        position.style['border'] = '1px solid #919191';
    }
}

