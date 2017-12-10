# Wire
Implementation of wire class with functionalities like 'on' & 'write'.

## Functionalities/Implementations
* `on` - add listener to the specific event.
* `write` - send signal through wire to trigger the listeners attached to specific event.
* A simple self test runner implemented to avoid using external libraries like `mocha`.

## Assumptions
* Wire communicate in syncronous mode.

## Run Application
run below command in project folder
`node app\main.js`

## Run Tests
run below command in project folder
`node app\wire\wire.tests.js`
