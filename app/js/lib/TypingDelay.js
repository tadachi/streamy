class TypingDelay {
    constructor(delay = 200, captureLength = 1, actionFunc = null) {
        this.delay = delay;
        this.captureLength = captureLength;
        this.actionFunc = actionFunc;
        this.timeout = null;
    };

    setFunc(actionFunc) {
        this.actionFunc = actionFunc;
    }

    getFunc(actionFunc) {
        return actionFunc;
    }

    delayedRun(actionFunc = this.actionFunc) {
        if (this.timeout != null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        this.timeout = setTimeout(function(){
            console.log('Timeout created.');
            this.actionFunc;
        }, this.delay);

    };
};
