console.log('base.js');
import $ from 'jquery';

/* *************************************************************************************************** */
/*                                              BASE                                                   */
/* *************************************************************************************************** */

export const elements = 
{
    /* ******************************************************************* */
    /*                            PRE-GAME                                 */
    /* ******************************************************************* */

    playIntroButton: document.getElementById('intro-button'),
    startPuzzleButton: document.getElementById('start-button'),
    introButtonContainer: document.getElementById('start-button-container'),
    
    /* ******************************************************************* */
    /*                             INTRO                                   */
    /* ******************************************************************* */
    
    title: id => document.getElementById(`title-${id}`),

    introMessageContainer: document.getElementById('intro-msg-container'),
    introMessages: document.querySelectorAll('.intro-msg'),
    welcomeMessage: document.getElementById('welcome-message'),
    rulesMessage: document.getElementById('rules-message'),

    timerContainer: document.getElementById('timer-container'),
    timerMessageContainer: document.getElementById('timer-message-container'),
    timerMessage: id => document.getElementById(`timer-msg-${id}`),
    timerArrow: document.getElementById('timer-arrow'),

    movesContainer: document.getElementById('moves-container'),
    movesMessageContainer: document.getElementById('moves-message-container'),
    movesMessage: id => document.getElementById(`moves-msg-${id}`),
    movesArrow: document.getElementById('moves-arrow'),

    attemptsContainer: document.getElementById('attempts-container'),
    attemptsMessageContainer: document.getElementById('attempts-message-container'),
    attemptsMessage: id => document.getElementById(`attempts-msg-${id}`),
    attemptsArrow: document.getElementById('attempts-arrow'),

    hintButtonContainer: document.getElementById('hint-button-container'),
    hintMessageContainer: document.getElementById('hint-message-container'),
    hintMessage: id => document.getElementById(`hint-msg-${id}`),
    hintArrow: document.getElementById('hint-arrow'),

    /* ******************************************************************* */
    /*                         GAME-CONTAINER                              */
    /* ******************************************************************* */

    gameContainer: document.getElementById('game-container'),
    
    board: document.getElementById('board'),

    /* ******************************************************************* */
    /*                            TOP-PANEL                                */
    /* ******************************************************************* */

    topPanel: document.getElementById('top-panel'),

    attempts: document.getElementById('attempts'),

    allMoveBlocks: document.querySelectorAll('.move-block'),
    moveCount: document.getElementById('move-count'),
    moveLabel: document.getElementById('move-label'),
    moveBlock: id => document.getElementById(`move${id}`),

    helpButton: document.getElementById('help-button'),

    /* ******************************************************************* */
    /*                            HELP-MENU                                */
    /* ******************************************************************* */
    
    helpMenu: document.getElementById('help-container'),

    helpTitleContainer: document.getElementById('help-title-container'),

    subTitle: id => document.getElementById(`help-sub-title-${id}`),

    pageContainer: document.getElementById('page-container'),
    pageLeft: document.getElementById('page-left'),
    pageRight: document.getElementById('page-right'),

    objectiveContainer: document.getElementById('objective-container'),
    objectiveSummary: document.getElementById('objective-summary'),
    objMessages: document.querySelectorAll('#objective-summary > p'),
    objMessage: id => document.getElementById(`objective-msg-${id}`),
    objImage: document.getElementById('objective-img'),
    
    rule1Container: document.getElementById('rule-1-container'),
    rule1Message: id => document.getElementById(`rule-1-msg-${id}`),
    rule1Img: document.getElementById('rule-1-img'),

    rule2Container: document.getElementById('rule-2-container'),
    rule2Message: id => document.getElementById(`rule-2-msg-${id}`),
    rule2Img: document.getElementById('rule-1-img'),

    numberphileContainer: document.getElementById('numberphile-container'),

    returnButton: document.getElementById('return-button'),
    leftButton: document.querySelector('.click-left'),
    rightButton: document.querySelector('.click-right'),

    /* ******************************************************************* */
    /*                           BOTTOM-PANEL                              */
    /* ******************************************************************* */
    
    bottomPanel: document.getElementById('bottom-panel'),

    timerMinutes: document.getElementById('minutes'),
    timerSeconds: document.getElementById('seconds'),

    message: document.getElementById('message'),

    hintButton: document.getElementById('hint-button'),
    hintButtonImg: document.getElementById('hint-icon'),

    /* ******************************************************************* */
    /*                         PROGRESS-MESSAGE                            */
    /* ******************************************************************* */

    progressMessageContainer: document.getElementById('progress-message-container'),

    helpSubTitle: document.getElementById('help-title-2'),
    progressMessage1: document.getElementById('progress-message-1'),
    progressMessage2: document.getElementById('progress-message-2'),
    stat1: document.getElementById('stat-1'),
    stat2: document.getElementById('stat-2'),
    stat3: document.getElementById('stat-3'),

    progressContinueButton: document.getElementById('continue-button'),

    /* ******************************************************************* */
    /*                               COINS                                 */
    /* ******************************************************************* */

    coin: id => document.getElementById(`coin${id}`),
    allCoins:   document.querySelectorAll('.coin'),
    classCoin: '.coin',

    /* ******************************************************************* */
    /*                             POSITIONS                               */
    /* ******************************************************************* */

    position: id => document.getElementById(`pos${id}`),
    allPositions:   document.querySelectorAll('.position'),
    classPosition: '.position',

    /* ******************************************************************* */
    /*                             FUNCTIONS                               */
    /* ******************************************************************* */

    refresh: function() {

        this.allPositions = document.querySelectorAll('.position');
        this.allCoins = document.querySelectorAll('.coin');
    },

    enableAll: function() {

        $('#game-container *').prop('disabled', false);
        $('.coin').css({pointerEvents: 'all'});
    },

    disableAll: function() {

        $('#game-container *').prop('disabled', true);
        $('.coin').css({pointerEvents: 'none'});
    },

    blurBackground: function()
    {
        $(this.board).css({
            "-webkit-filter": "blur(10px)",
            "filter": "blur(10px)",
            "transition": "0.25s filter linear"
        });
    }, 

    unBlurBackground: function()
    {
        $(this.board).css({
            "-webkit-filter": "none",
            "filter": "none"
        });
    }
};
