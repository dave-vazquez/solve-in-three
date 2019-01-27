console.log('helpView.js');

import $ from 'jquery';
import {elements} from '../views/base.js';

/* *************************************************************************************************** */
/*                                         HELP VIEW                                                   */
/* *************************************************************************************************** */

export default class HelpView
{
    constructor()
    {
        this.helpMenuPages = [elements.objectiveContainer, elements.rule1Container, elements.rule2Container, elements.numberphileContainer];
        this.numPages = this.helpMenuPages.length;
        this.pageNum = 0;
    }

    openHelpMenu()
    {
        console.log('HELPT MENU CLICKED');
        
        elements.disableAll();
        elements.blurBackground();

        this.pageNum = 0;

        $(elements.helpMenu).fadeIn(250);
        $(this.currentPage()).fadeIn(250);

        $(document).on('click', (evt) => closeHelpMenu(evt));
    }

    closeHelpMenu()
    {
        $(elements.helpMenu).finish().fadeOut(250);
        $(this.currentPage()).finish().fadeOut(250);

        elements.enableAll();
        elements.unBlurBackground();

        $(document).off('click');
    }

    pageRight()
    {
        $(this.currentPage()).fadeOut(250);

        if(this.atlastPage())
            this.pageNum = 0;
        else
            this.pageNum++;

        $(this.currentPage()).delay(250).fadeIn(250);

        console.log('Current Page: ', this.pageNum);

    }

    pageLeft()
    {
        $(this.currentPage()).fadeOut(250);

        if(this.atfirstPage())
            this.pageNum = 3;
        else
            this.pageNum--;

        $(this.currentPage()).delay(250).fadeIn(250);

        console.log('Current Page: ', this.pageNum);

    }

    currentPage()
    {
        
        return this.helpMenuPages[this.pageNum];
    }

    atfirstPage()
    {
        return this.pageNum - 1 < 0; 
    }

    atlastPage()
    {
        return this.pageNum + 1 === this.numPages;
    }


}

const helpView = new HelpView();

/* *************************************************************************************************** */
/*                                        EVENT LISTENERS                                              */
/* *************************************************************************************************** */

$(elements.helpButton).on('click', () => helpView.openHelpMenu());

$(elements.pageRight).on('click', () => helpView.pageRight());

$(elements.pageLeft).on('click', () => helpView.pageLeft());

/* *************************************************************************************************** */
/*                                            FUNCTIONS                                                */
/* *************************************************************************************************** */

function closeHelpMenu(evt)
{
    console.log('CLOSE MENU CLICK EVENT');

    var helpMenu = $(elements.helpMenu);
    var helpButton = $(elements.helpButton);
    
    if(!helpMenu.is(evt.target) && !helpButton.is(evt.target) && helpMenu.has(evt.target).length === 0)
    {
        helpView.closeHelpMenu();
        console.log('CLOSED MENU');
    }
}
