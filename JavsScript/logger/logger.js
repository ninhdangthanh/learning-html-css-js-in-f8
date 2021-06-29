import { type_log } from '../constans.js';

function logger(log, type = type_log) {
    console[type](log)
}

function sum(a, b) {
    console.log(a+b)
}

export default logger ;

