/*
File: scrabbleJsCode.js
GUI Assignment: Create a scrabble game with the use of your own algorithma and jQuert drag and drop
Daury Argueta, UMass Lowell Computer Science, daury_argueta@student.uml.edu 

Purpose:
The purposes of this assignment are to give me additional experience
 working with the jQuery UI and to pull together much of what we have learn and
 done this semester. I had to implement a bit of the game of Scrabble using
 drag-and-drop. This drag-and-drop method allows the elements to be dropped with 
 the help of mouse. Using jQuery UI, we can make the DOM(Document Object Model) 
 elements to drop anywhere within the view port on the specified target. The idea 
 is to display one line of a scrabble board to the user along with seven letter tiles on
 a tile rack.

 contination of purpose of assignment: I had to figure out a algorithm to 
 indentiy which letter tile was dragged to which block and had to 
 implement the algorithm to tall the score of the users word after indicates that all the tiles
 in the word have been completely played.

Copyright (c) 2021 by Daury. All rights reserved. May be freely copied or excerpted for educational 
purposes with credit to the author.

Updated by Daury on June 29, 2022 at 11:00 PM
  src: Sources linked are commented in the code showing where I used what.
*/
var tileCount= 0;
var tilesLeft= 100;
var current_wordScore = 0; // current word score
var totalScore = 0; // total score across words in a single game
// scores for each spot, held here so that it that i Can access it accrose functions easily
var letterPlace1Val=0;
var letterPlace2Val=0;
var letterPlace3Val=0;
var letterPlace4Val=0;
var letterPlace5Val=0;
var letterPlace6Val=0;
var letterPlace7Val=0;
var letterPlace8Val=0;
var letterPlace9Val=0;

var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_A.jpg",} ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_B.jpg"} ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_C.jpg"} ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_D.jpg"} ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_E.jpg"} ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_F.jpg"} ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_G.jpg"} ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_H.jpg"} ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9 , "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_I.jpg"} ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_J.jpg"} ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_K.jpg"} ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_L.jpg"} ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_M.jpg"} ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_N.jpg"} ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_O.jpg"} ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_P.jpg"} ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_Q.jpg"} ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_R.jpg"} ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_S.jpg"} ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_T.jpg"} ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_U.jpg"} ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_V.jpg"} ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_W.jpg"} ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_X.jpg"} ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_Y.jpg"} ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_Z.jpg"} ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg"};



$( function() {
    //https://jsfiddle.net/4xgfqj8h/1/
    //https://www.geeksforgeeks.org/jquery-ui-draggable-and-droppable-methods/
    //https://stackoverflow.com/questions/45289128/jquery-draggable-attach-to-new-container
    $( ".letterTile" ).draggable({
        /*
        The jQuery UI Draggable revert Option is used to set the revert property 
        of an element. If this option is set to true the helper element to be used 
        for dragging display.
        */
        revert: 'invalid',//https://www.geeksforgeeks.org/jquery-ui-draggable-revert-option/
        /*
        Initialize the draggable with the start callback specified:
        */
        start: function(){
            currentParent = $(this).parent().attr('id');
        }
    });
    /*
    This method allows the elements to be dropped with the help of mouse.
    Using jQuery UI, we can make the DOM(Document Object Model) elements to 
    drop anywhere within the view port on the specified target.
    https://www.geeksforgeeks.org/jquery-ui-draggable-and-droppable-methods/#:~:text=Droppable()%20Method%3A,it%20on%20the%20specified%20target.
    */
    $(".letterPlace").droppable({
        //https://www.geeksforgeeks.org/jquery-ui-droppable-accept-option/
        /*
        The jQuery UI Droppable accept option is used to control the draggable elements that are accepted 
        by the droppable. It accepts a value as either Selector or Function()
        */
        accept: ".letterTile", 
        drop: function (event, ui) {
            var dropped = ui.draggable;
            var droppedOn = $(this);
            $(dropped).detach().css({ top: 0, left: 0 }).appendTo(droppedOn);
        }
    });
});

/*
I was starting to implement a function inorder to randomize the order the tile letter would appear.
The TA recommended this.
*/
function getRandTileNumber (){
    //Math.floor(Math.random() * 26) returns a random integer between 0 and 9 (both included):
    //https://www.w3schools.com/js/tryit.asp?filename=tryjs_random_0_9
    return Math.floor(Math.random() *(26));
  } 