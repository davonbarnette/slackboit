const moment = require('moment');
const chalk = require('chalk');
const SETTINGS = require('../settings');

class Logger {

    static multipleConsoleArgs(message, style, ...args){
        message = "%c" + message.toUpperCase();

        args.unshift(style);
        args.unshift(message);
        console.log.apply(this, args);
    }
    static getMoment(){
        return `[${moment().format('YYYY-MM-DD HH:mm:ssZZ')}]`
    }

    static info(message, ...args){
        if (args.length === 0) console.log(chalk.blue(Logger.getMoment() + "[        INFO]  " + message));
        else console.log(chalk.blue(Logger.getMoment() + "[        INFO]  " + message), ...args);
    }

    static db(message, ...args){
        if (!SETTINGS.DB.CUSTOM_DEBUG) return;
        if (args.length === 0) console.log(chalk.blue(Logger.getMoment() + "[          DB]  " + message));
        else console.log(chalk.blue(Logger.getMoment() + "[          DB]  " + message), ...args);
    }

    static success(message, ...args){
        if (args.length === 0) console.log(chalk.green(Logger.getMoment() + "[     SUCCESS]  " + message));
        else console.log(chalk.green(Logger.getMoment() + "[     SUCCESS]  " + message), ...args);
    }

    static error(message, ...args){
        if (args.length === 0) console.log(chalk.red(Logger.getMoment() + "[       ERROR]  " + message));
        else console.log(chalk.red(Logger.getMoment() + "[       ERROR]  " + message), ...args);
    }

    static debug(message, ...args){
        if (!SETTINGS.DEBUG) return;
        if (args.length === 0) console.log(chalk.yellow(Logger.getMoment() + "[       DEBUG]  " + message));
        else console.log(chalk.yellow(Logger.getMoment() + "[       DEBUG]  " + message), ...args);
    }
}

module.exports = Logger;