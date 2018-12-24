/* *************************************************************************************************** */
/*                       ATTEMPTS VIEW                                                                 */
/* *************************************************************************************************** */

import {elements} from './base.js';

export const incrementAttempts = (attempts) =>
{
    elements.attempts.innerText = attempts;
}

export const resetAttempts = () =>
{
    elements.attempts.innerText = '0';
}