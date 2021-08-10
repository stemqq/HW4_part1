//File: table.js
//GUI Assignment: validation plugin
//Ssuna Mulindwa, UMass Lowell Computer Science, ssuna_mulindwa@student.uml.edu
//Copyright (c) 2021 by ssunaMulindwa. All rights reserved. May be freely copied or
//excerpted for educational purposes with credit to the author.
//updated by SM on  August 9, 2021 at 9:23 AM


// Function call from Submit button to create Dynamic Table
// it will get input from the html and passes the value
// to the function and then if the function return true, the dynamic table will be created
// else the error Message will be display to direct user what need to be fixed
// Using the jQuery Validation Plugin with Your Dynamic Table




// Check to make sure the page ready
$().ready(function () {

    //function to check the input is smaller or grader based on the source example
    $.validator.addMethod("greaterThan",
        function (value, element, param) {
            var $min = $(param);
            if (this.settings.onfocusout) {
                $min.off(".validate-greaterThan").on("blur.validate-greaterThan", function () {
                    $(element).valid();
                });
            }
            return parseInt(value) > parseInt($min.val());
    }, " Max must be greater than min");

    // Function to check smaller which is use in rules for validate
    $.validator.addMethod("lessThan",
        function (value, element, param) {
            var $max = $(param);
            if (this.settings.onfocusout) {
                $max.off(".validate-lessThan").on("blur.validate-lessThan", function () {
                    $(element).valid();
                });
            }
            return parseInt(value) < parseInt($max.val());
    }, " Min must be smaller than max");

    // jQuery Plugin
    $('#input-form').validate({
        //validating the input form
        rules: {
            fCol: {
                required: true,
                number: true,
                range: [-100, 100],
                lessThan: '#lCol'
            },
            lCol: {
                required: true,
                number: true,
                range: [-100, 100],
                greaterThan: '#fCol'
            },
            fRow: {
                required: true,
                number: true,
                range: [-100, 100],
                lessThan: '#lRow'
            },
            lRow: {
                required: true,
                number: true,
                range: [-100, 100],
                greaterThan: '#fRow'
            }
        },
        //Message for error, replace the default messages from validate function.
        messages: {
            fCol: {
                required: " Error: Please enter an integer",
                number: " Error: Please enter an integer",
                range: " Error: Please value between [-100, 100]"
            },
            lCol: {
                required: " Error: Please enter an integer",
                number: " Error: Please enter an integer",
                range: " Error: Please value between [-100, 100]"
            },
            fRow: {
                required: " Error: Please enter an integer",
                number: " Error: Please enter an integer",
                range: " Error: Please value between [-100, 100]"
            },
            lRow: {
                required: " Error: Please enter an integer",
                number: " Error: Please enter an integer",
                range: " Error: Please value between [-100, 100]"
            }
        },
        // submit button pressed.
        // it will create table after all the input value passed the rules
        submitHandler: function() {
            tableCreate();
            return false;
        },

        // incase resubmit with an invalid value, table will be empty
        invalidHandler: function() {
            $("#table").empty();
        }
    });

}); // end of input form


// function to create dynamic table based on input from the users after passes the valid check
function tableCreate() {
    // cast all variable to Number for calculation to print out the dynamic table
    var fCol, lCol, fRow, lRow;
    // use parseInt to get value as number from html input
    fCol = parseInt($('input[name=fCol]').val());  //First Column
    lCol = parseInt($('input[name=lCol]').val());  //Last Column
    fRow = parseInt($('input[name=fRow]').val());  //First Row
    lRow = parseInt($('input[name=lRow]').val());  //Last Row

    // define and declare variable for CreateTable tag and set it is empty
    var CreateTable = "";
    // check variable use for determine when is the cell have background corlor or not
    var check = 0;
    CreateTable += "<table id='style-table'>";
    // console.log('fRow: %O', fRow);        // For debug in Console
    // create table with rows based on input
    for (var row = 0; row <= (lRow - fRow + 1); row++){
        // open table tag
        CreateTable += "<tr>";
        // for create cell for each row (like column)
        for (var col = 0; col <= (lCol - fCol + 1); col++){
            // console.log('Column: %O', col);   // For debug in Console
            // console.log('Row: %O', row);      // For debug in Console
            // if the cell is on first row and first column, empty space, else css style will be first
            if (row == 0){
                CreateTable += "<td class='header'>" + ((col == 0) ? "" : (col + fCol - 1)) + "</td>";
            // if cell fall in first column, css style will be first
            } else if (col == 0){
                CreateTable += "<td class='header'>" + (row + fRow - 1) + "</td>";
            // the rest of cell in the table with rest style
            } else {
                // cell background based on check variable
                CreateTable += ((parseInt(check) % 2 == 0) ? "<td class='child-blank'>"  : "<td class='child-color'>") + ((row + fRow - 1) * (col + fCol - 1)) + "</td>";
                // increase check by 1
                check++;
            }
        }
        // reset check based on row to determind 0 or 1
        row % 2 == 0 ? check = 0 : check = 1;
        // closed row tag
        CreateTable += "</tr>";
    }
    // closed table tag
    CreateTable += "</table>";

    // Print out the Dynamic table
    // document.getElementById('table').innerHTML = CreateTable;
    $("#table").html(CreateTable);

    // Stop the form from refreshing.
    return false;

}
