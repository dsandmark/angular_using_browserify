# Ping pong

Author: Dennis Sandmark (d.sandmark@gmail.com)

## Intro
Ping pong league table made in Angular and Browserify.

Due to time constraints (tight deadline), the following apply:
* Only tested in Chrome version 44.0.2403.157 (64-bit)
* Unit tests are not exhaustive, see them more as a POC
* Error handling is logged in console
* There's likely a bug or two in the app but it works as a POC
* Ranking is only based on games won

There's some hacks here and there CSS wise but I went with KISS.

App follows John Papa's style guide: https://github.com/johnpapa/angular-styleguide

## How to Run
1. clone repo or download as zip file
2. cd into unpacked folder using terminal
3. run: `$ npm install`
4. run: `$ gulp`
5. Go to http://localhost:5000
6. Bask

Notes:

(3) You may need do run `$ sudo npm install` depending on your access rights.

(4) running `$ gulp` will create a dist folder that's being served by Express.

## Tests

### Running Unit Tests
Run the following in terminal: `$ gulp unit`

### Notes
Unit tests are on the form: Assign -> Act -> Assert

Jasmine Describe blocks are replaced by more detailed 'it' blocks.

Leaving client tests as an excercise to the reader
