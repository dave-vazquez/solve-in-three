import $ from 'jquery';
import {elements} from '../views/base.js';

/* *************************************************************************************************** */
/*                                         HELP VIEW                                                   */
/* *************************************************************************************************** */

export default class HelpView
{
    constructor()
    {
        this.helpMenuPages = null;
        this.numPages = 4;
        this.pageNum = 0;
    }

    openHelpMenu()
    {
        this.renderHelpMenu();

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

        setTimeout(()=> this.removeHelpMenu(), 250);

        elements.enableAll();
        elements.unBlurBackground();

        $(document).off('click');
    }

    pageRight()
    {
        console.log('PAGE RIGHT');
        $(this.currentPage()).fadeOut(250);

        if(this.atlastPage())
            this.pageNum = 0;
        else
            this.pageNum++;

        $(this.currentPage()).delay(250).fadeIn(250);

    }

    pageLeft()
    {
        console.log('PAGE LEFT');
        $(this.currentPage()).fadeOut(250);

        if(this.atfirstPage())
            this.pageNum = 3;
        else
            this.pageNum--;

        $(this.currentPage()).delay(250).fadeIn(250);

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

    renderHelpMenu()
    {
        if(elements.helpMenu.hasChildNodes() === false)
        {
            $(elements.helpMenu).html(`
                <div id="help-title-container">
                    <h2 id="help-title">Solve In Three</h2>
                    <p  id="help-sub-title-0" class="help-sub-title">Help Menu</p>
                    <p  id="help-sub-title-1" class="help-sub-title">Rule 1</p>
                    <p  id="help-sub-title-2" class="help-sub-title">Rule 2</p>
                </div>

                <div id="page-container">

                    <div id="page-left"></div>
                    <div id="page-right"></div>

                    <div id="objective-container">
                        <div id="objective-summary">
                            <p id="objective-msg-0">The goal of this puzzle is to arrange the <strong>six coins</strong></p>
                            <p id="objective-msg-0">into the <strong>shape of a ring</strong>.</p></br>
                            <p id="objective-msg-2">There are <strong>many ways</strong> to solve this puzzle,</p>
                            <p id="objective-msg-3">but only one way to solve it in <strong>three moves</strong>.</p></br>
                            <p><strong>Solve in three</strong> with the <strong>fewest number of attempts</strong>,</p>
                            <p>and the <strong>shortest amount of time</strong>.</p>
                        </div>
                        <div id="objective-img-container">
                            <img id="objective-img" src="images/objective.gif">
                        </div>
                    </div>

                    <div id="rule-1-container">
                        <div id="rule-1-summary">
                            <p id="rule-1-msg-0">A coin can only move to a position</p>
                            <p id="rule-1-msg-1">where it will touch <strong>two or more coins</strong></p></br> 
                            <div class="rule-1-img-container">
                                <img id="rule-1-img" src="images/rule-1a-320.gif">
                            </div>   
                        </div>
                    </div>

                    <div id="rule-2-container">
                        <div id="rule-2-summary">
                            <p id="rule-2-msg-0">A coin cannot move</p> 
                            <p id="rule-2-msg-1">if it is <strong>blocked</strong> by its <strong>surrounding coins</strong>.</p></br>
                            <div class="rule-2-img-container">
                                <img id="rule-2-img" src="images/rule-2-320.gif">
                            </div>   
                        </div>
                    </div>

                    <div id="numberphile-container">
                        <div id="numberphile-summary">
                            <p id="numberphile-msg-0">This project was inspired by the same puzzle</p>
                            <p id="numberphile-msg-1">featured in the <img id="numberphile-img" src="images/numberphile.png"> video:</p></br>
                            <p id="numberphile-msg-3"><strong>"The Coin Hexagon"</strong></p></br> 
                            <iframe id="numberphile-video" width="350" height="198" src="https://www.youtube.com/embed/_pP_C7HEy3g" frameborder="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe></br>
                            <p id="warning-msg"><strong>Warning</strong>: The solution to this puzzle can be found in this video</p>
                        </div>
                    </div>

                </div>

                <div class="page-selector">
                    <input id="page-1" class="page-button" type="button" value="">
                    <input id="page-2" class="page-button" type="button" value="">
                    <input id="page-3" class="page-button" type="button" value="">
                </div>
            `);

            elements.initializeSelectors('help-menu');

            this.helpMenuPages = [elements.objectiveContainer, elements.rule1Container, elements.rule2Container, elements.numberphileContainer];

            this.bindPageEvents();
        }
    }

    bindPageEvents()
    {
        $(elements.pageRight).on('click', ()=> this.pageRight());

        $(elements.pageLeft).on('click', () => this.pageLeft());
    }

    removeHelpMenu()
    {
        var container = elements.helpMenu;
        
        while(container.firstChild)
            container.removeChild(container.firstChild);
    }
    
}

const helpView = new HelpView();

/* *************************************************************************************************** */
/*                                        EVENT LISTENERS                                              */
/* *************************************************************************************************** */

$(elements.helpButton).on('click', () => helpView.openHelpMenu());

/* *************************************************************************************************** */
/*                                            FUNCTIONS                                                */
/* *************************************************************************************************** */

function closeHelpMenu(evt)
{
    var helpMenu = $(elements.helpMenu);
    var helpButton = $(elements.helpButton);

    if(!helpMenu.is(evt.target) && !helpButton.is(evt.target) && helpMenu.has(evt.target).length === 0)
    {
        helpView.closeHelpMenu();
        console.log('CLOSED MENU');
    }
}
