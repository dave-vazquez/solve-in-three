
import {elements} from './base.js';

/* *************************************************************************************************** */
/*                                         ATTEMPTS VIEW                                               */
/* *************************************************************************************************** */

export default class AttemptsView
{
    incrementAttempts(attempts)
    {
        elements.attempts.innerText = attempts;
    }

    resetAttempts()
    {
        elements.attempts.innerText = '0;'
    }
}
