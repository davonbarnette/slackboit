class SlackboitUnchained {
    constructor(){
        this.index = 0;
        this.chained = false;
    }

    getCurrentCommand(text){
        return `${this.commands[this.index]} ${text}`;
    }
    initialize(commands){
        this.index = 0;
        this.commands = commands;
    }
    increment(){
        this.index++;
    }
    rechain(seconds){
        this.chained = new Date().getTime() + (1000 * seconds);
    }

    isRechained(){
        return (this.chained > new Date().getTime()) || !this.commands[this.index];
    }

}

module.exports = SlackboitUnchained;