export default class {
    constructor(initialTimerValue, lastPageAction, otherPageAction) {
        this.initialTimerValue = initialTimerValue;
        this.lastPageAction = lastPageAction;
        this.otherPageAction = otherPageAction;

        this.timer = 0;
        this.windowCreatedAt = Date.now();
        this.setInitValue = true;

        localStorage.setItem("last_page_created_at", this.windowCreatedAt);
    }

    isLastPage(){
        return this.windowCreatedAt == localStorage.getItem("last_page_created_at");
    }

    timeOutAction(){
        this.isLastPage() ? this.lastPageAction() : this.otherPageAction();
    }

    countDown(timerAction){
        if (this.isLastPage() && this.setInitValue) {
            this.timer = this.initialTimerValue;
            this.setInitValue = false;
        }

        timerAction(this.timer, this.isLastPage());

        if (this.timer < 1) {
            this.timeOutAction();
            return false;
        }

        this.timer--;
    }

    countDownTimer(timerAction) {
        setInterval(() => this.countDown(timerAction), 1000);
    }
}