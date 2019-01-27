console.log('positionView.js')

import $ from 'jquery';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-shadow-animation/jquery.animate-shadow';
import {elements} from './base.js';
import {game} from '../index.js';

/* *************************************************************************************************** */
/*                                        POSITION VIEW                                                */
/* *************************************************************************************************** */

export default class PositionView
{
    constructor()
    {
        $(elements.allPositions).droppable({
            disabled: true
        })

        this.bindPositionEvents(elements.allPositions);
    }

    bindPositionEvents(position)
    {
        $(position).on('dropover', function() {    
            game.moveCoinOver(this.id);
        });
        
        $(position).on('drop', function() {
            game.dropCoin(this.id);
        });
    }

    disableDrop(positionIDs)
    {        
        if(typeof positionIDs === 'number')
        {
            let position = elements.position(positionIDs);

            $(position).droppable('option', 'disabled', true);
        }    
        else
        {
            positionIDs.forEach(posID =>
            {
                let position = elements.position(posID);

                $(position).droppable('option', 'disabled', false);
            });
        }
    }

    enableDrop(positionIDs)
    {
        positionIDs.forEach(posID =>
        {
            let position = elements.position(posID);
    
            $(position).droppable('option', 'disabled', false);
        });
    }

    disableDrop(positionIDs)
    {
        if(typeof positionIDs === 'number')
        {
            let position = elements.position(positionIDs);
    
            $(position).droppable('option', 'disabled', true);
        }    
        else
        {
            positionIDs.forEach(posID =>
            {
                let position = elements.position(posID);
    
                $(position).droppable('option', 'disabled', true);
            });
        }
    }

    revealOpenPositions(positions)
    {
        positions.forEach(posID =>
        {
            let position = elements.position(posID);
    
            this.bevelPosition(position);
        });
    }

    concealOpenPositions(positions)
    {
        positions.forEach(posID =>
        {
            let position = elements.position(posID);
    
            this.unbevelPosition(position);
        });
    }

    bevelPosition(position)
    {
        $(position).finish().animate(
        {
            boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.33)', 
            backgroundColor: '#c2c2c2'
        }, 
        {
            duration: 100, 
            queue: false
        });
        
        $(position).css({border: '1px solid #666666'});
    }

    unbevelPosition(position)
    {
        $(position).finish().animate(
        {
            boxShadow: 'inset 0px 0px 0px rgba(0, 0, 0, 0.33)', 
            backgroundColor: '#d1d1d1'
        }, 
        {
            duration: 100, 
            queue: false
        });
    
        $(position).css({border: '1px solid #a7a6a6'});
    }

    removeCoinsFrom(occupiedPositions)
    {
        console.log('OCCUPIED POSITIONS: ', occupiedPositions);
        
        occupiedPositions.forEach(posID =>
        {
            $(elements.position(posID)).children().remove();
        });
    }
}

