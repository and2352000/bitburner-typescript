import { NS } from "@ns";

interface LogOptions {
    showInTerminal?: boolean
}

enum LogLevel {
    ERROR = 'ERROR',
    INFO = 'INFO',
    DEBUG = 'DEBUG',
    WARN = 'WARN',
}
type LogMessage = string | number | boolean | object;
class Logger {
    public error(ns: NS, message: LogMessage, options?: LogOptions) {
        const _opts = { showInTerminal: true, ...options }
        this._print(ns, message, LogLevel.ERROR, _opts);
    }

    public warn(ns: NS, message: LogMessage, options?: LogOptions) {
        this._print(ns, message, LogLevel.WARN, options);
    }

    public info(ns: NS, message: LogMessage, options?: LogOptions) {
        this._print(ns, message, LogLevel.INFO, options);
    }
    public debug(ns: NS, message: LogMessage, options?: LogOptions) {
        const _opts = { showInTerminal: true, ...options }
        this._print(ns, message, LogLevel.DEBUG, _opts);
    }
    private _print(ns: NS, message: LogMessage, level: LogLevel, options: LogOptions = {}) {
        const _opts = { showInTerminal: false, ...options }
        ns.print(`${level}: ${JSON.stringify(message)}`);
        if (_opts.showInTerminal) ns.tprint(`${level}: ${JSON.stringify(message)}`);
    } 
}

export const logger = new Logger(); 
