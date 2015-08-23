Ping pong

Author: Dennis Sandmark (d.sandmark@gmail.com)

# Intro
Due to time constraints (tight deadline), the following apply:
* Only tested in Chrome version 44.0.2403.157 (64-bit)
* Unit tests are not exhaustive, see them more as a POC
* Only one set can be played per game

# How to Run
1. clone repo or download as zip file
2. cd into unpacked folder using terminal
3. run: `$ npm install`
4. run: `$ gulp`
5. Go to http://localhost:5000
6. Bask

Notes:

(3) You may need do run `$ sudo npm install` depending on your access rights.

(4) running `$ gulp` will create a dist folder that's being served by Express.

# Tests

## Running Unit Tests
Run the following in terminal: `$ gulp unit`

## Notes
Unit tests are on the form: Assign -> Act -> Assert

Jasmine Describe blocks are replaced by more detailed 'it' blocks.

Leaving client tests as an excercise to the reader
