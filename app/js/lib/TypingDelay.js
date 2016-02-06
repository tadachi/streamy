class TypingDelay {
    constructor(delay = 3000) {
        this.delay = delay;
        this.actionFunc = null;
        this.timeout = null;
    };

    setFunc(actionFunc) {
        this.actionFunc = actionFunc;
    }

    getFunc(actionFunc) {
        return actionFunc;
    }

    // Re-run this function to clear the timeout and start it again
    delayedRun(actionFunc = this.actionFunc) {
        // Clear timeoutHandle aka timeoutID.
        if (this.timeoutHandle != null) {
            clearTimeout(this.timeoutHandle);
        }

        this.timeoutHandle = setTimeout(function() {
            actionFunc();
        }, this.delay);
    };
};
