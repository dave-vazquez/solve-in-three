import $ from 'jquery';
import {elements} from './base.js';

const hintsClicked = new Event('hints-clicked');

$(elements.hintButton).on('click', () => document.dispatchEvent(hintsClicked));

export const resetHintButton = () =>
{
    elements.hintButton.innerText = 'Show Hints';
}