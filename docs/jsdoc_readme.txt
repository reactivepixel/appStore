Basic JSDoc Documentation

/**
 * This is a doclet/annotation for jsdocs.
 * When gulp gets ran it looks for comments
 * in this format.
*/

------------------------------------------------

/**
 * @var {dataType} variableName
 * Description of the variable goes here.
*/

The above is is how to document variables.
@var tells the JSDoc parser to output the variable
and format it properly.

The {dataType} will output the data type of the variable
to let anyone looking at the documentation know what
the variable is.

variableName is the variable name you are documenting.

------------------------------------------------

/**
 * @function functionName
 * Function description goes here.
*/

The above is how to document functions without parameters.
@function tells the JSDoc parser how to output functions
and format it properly

functionName is the name of your function.

The line directly under @function functionName
describes your function.

------------------------------------------------

/**
 * @function functionName
 * @param parameterName
 * This line describes your parameter
*/

So far the only difference I've been able to find
is that with the addition of @param a table gets
added to the output file and you can describe the
parameters as well.

------------------------------------------------

/**
 * @var {number} x
 * This is the variable x
 * @example
 * var x = 5;
*/

@example allows the JSDoc parser to show the
snippet of code under the @example.

------------------------------------------------

/**
 * @function functionName
 * @param paramName
 * This describes the param.
 * @desc This describes the function
*/

@desc allows the user to describe the function.
It will display properly in the out files.
