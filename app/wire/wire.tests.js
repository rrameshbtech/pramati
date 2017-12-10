'use strict';
var Wire = require('./wire');
var assertLib = require('assert');

//Name: wireTestCases
//Description: Contains the list of test cases for wire.
(function wireTestCases(assert, Wire) {

    //test list to manage all the test cases
    let tests = new Map();
    var it = function (testName, testFunction) {
        tests.set(testName, testFunction);
    };

    it('should throw error when no event name found for on.', function shouldThrowErrorWhenNoEventNameFound() {
        let testWire = new Wire();
        try {
            testWire.on();
            assert.fail('should throw error when no event name found for on');
        } catch (err) {
            assert.ok(true);
        }
    });

    it('should throw error when no listener found for on.', function shouldThrowErrorWhenNoListenerFound() {
        let testWire = new Wire();
        try {
            testWire.on('test-event');
            assert.fail('should throw error when no listener found for on');
        } catch (err) {
            assert.ok(true);
        }
    });
    
    it('should throw error when listener is not function.', function shouldThrowErrorWhenNoListenerFound() {
        let testWire = new Wire();
        try {
            testWire.on('test-event', 'non-function-listener');
            assert.fail('should throw error when listener is not function.');
        } catch (err) {
            assert.ok(true);
        }
    });

    it('should return wire for chaining.', function shouldReturnWire() {
        let testWire = new Wire();

        let actual = testWire.on('test-event', () => {});
        assert.equal(actual, testWire);
    });

    //Write function test cases
    it('should throw error when no event name found for write.', function shouldThrowErrorWhenNoEventNameFound() {
        let testWire = new Wire();
        try {
            testWire.write();
            assert.fail('should throw error when no event name found for write');
        } catch (err) {
            assert.ok(true);
        }
    });

    it('should call listener when signal written into wire.', function shouldCallListener() {
        let testWire = new Wire(),
            listenerCalled = false;

        testWire.on('test-event', () => {
            listenerCalled = true;
        });

        testWire.write('test-event');
        assert.ok(listenerCalled);
    });

    it('should call listener with argument when signal written into wire.', function shouldCallListenerWithArgument() {
        let testWire = new Wire();

        testWire.on('test-event', (arg1) => {
            assert.equal(arg1, 'test-argument-1');
        });

        testWire.write('test-event', 'test-argument-1');
    });

    it('should call listener with multi arguments when signal written into wire.', function shouldCallListenerWithMultiArguments() {
        let testWire = new Wire();

        testWire.on('test-event', (arg1, arg2) => {
            assert.equal(arg1, 'test-argument-1');
            assert.equal(arg2, 'test-argument-2');
        });

        testWire.write('test-event', 'test-argument-1', 'test-argument-2');
    });

    it('should call all listeners when signal written into wire.', function shouldCallListeners() {
        let testWire = new Wire(),
            listenerOneCalled = false,
            listenerTwoCalled = false;

        testWire.on('test-event', () => {
            listenerOneCalled = true;
        });

        testWire.on('test-event', () => {
            listenerTwoCalled = true;
        });

        testWire.write('test-event');
        assert.ok(listenerOneCalled);
        assert.ok(listenerTwoCalled);
    });

    it('should call all listeners squentially, when signal written into wire.', function shouldCallListenersSequentially() {
        let testWire = new Wire(),
            listenerOneCalled = false,
            listenerTwoCalled = false;

        testWire.on('test-event', () => {
            listenerOneCalled = true;
        });

        testWire.on('test-event', () => {
            //check whether first function called
            if (listenerOneCalled) {
                listenerTwoCalled = true;
            }
        });

        testWire.write('test-event');
        assert.ok(listenerOneCalled);
        assert.ok(listenerTwoCalled);
    });


    //execute all the test cases
    (function executeTests() {
        let anyTestFailed = false;
        tests.forEach((testFunction, testDescription) => {
            try {
                console.log(`Executing - ${testDescription}`);
                testFunction.call();
                console.log(`Finished - ${testDescription}`);
            } catch (err) {
                anyTestFailed = true;
                console.error(err);
                console.log(`Failed - ${testDescription}`);
            }
        });

        console.log(`All test cases finished running with ${anyTestFailed ? 'some failed' : 'success' }.`);
    })();

})(assertLib, Wire);