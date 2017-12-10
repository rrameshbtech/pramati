'use strict';
//Name: WireClass
//Description: Provides functionalities to communicate between components.
let wireClass = function () {

    let events = new Map();

    //Name: getListeners
    //Description: get the listeners list for the event.
    let getListeners = function (eventName) {
        if (!eventName) {
            return null;
        }

        return events.has(eventName) ? events.get(eventName) : null;
    };

    //Name: on
    //Description: add a listener to the wire
    let on = function (eventName, listener) {
        //validate input params
        if (!eventName) {
            throw new Error('eventName can not be empty.');
        }
        if (!listener) {
            throw new Error('listener function should be defined.');
        }
        if (typeof listener !== 'function') {
            throw new Error('listener should be a function.');
        }

        //add listener
        let listeners = getListeners(eventName);
        if (!listeners) {
            listeners = new Set();
        }
        listeners.add(listener);
        events.set(eventName, listeners);

        return this;
    };

    //Name: write (sync)
    //Description: write the given message to the communication channel.
    //ie. triggers the given event with the parameters
    let write = function (eventName, ...eventArgs) {
        if (!eventName) {
            throw new Error('eventName can not be empty.');
        }

        if (!events.has(eventName) || !events.get(eventName)) {
            return false;
        }

        //iterate through the listeners
        let listeners = events.get(eventName);
        listeners.forEach((listener) => {            
            if (listener) {
                listener(...eventArgs);
            }
        });
        return true;
    };

    //return the wire functionalities
    return {
        on,
        write
    };
};

module.exports = wireClass;