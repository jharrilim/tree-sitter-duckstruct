module.exports = grammar({
  name: 'duckstruct',

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => repeat($.statement),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
    number: $ => /[0-9]+/,
    string: $ => /"[^"]*"/,
    boolean: $ => choice('true', 'false'),
    arrayLiteral: $ => seq('[', repeat($.expression), ']'),
    objectLiteral: $ => seq('{{', repeat(seq($.objectLiteralEntry, ',')), '}}'),
    objectLiteralEntry: $ => seq($.identifier, ':', $.expression),

    statement: $ => choice(
      $.functionDeclaration,
      $.assignment,
      $.expression,
    ),
    functionDeclaration: $ => seq(
      'f',
      $.identifier,
      $.parameterList,
      choice(
        $.block,
        seq(
          '=',
          $.expression,
        )
      )
    ),
    parameterList: $ => seq(
      '(',
      optional($.parameter),
      repeat(seq(',', $.parameter)),
      ')'
    ),
    parameter: $ => $.identifier,
    block: $ => seq(
      '{',
      repeat($.statement),
      '}'
    ),

    assignment: $ => seq(
      'let',
      $.identifier,
      '=',
      $.expression,
    ),

    expression: $ => choice(
      $.identifier,
      $.number,
      $.string,
      $.boolean,
      $.block,
      $.arrayLiteral,
      $.objectLiteral,
      $.functionCall,
      $.binaryExpression,
      $.unaryExpression,
    ),

    functionCall: $ => seq(
      $.expression,
      $.parameterList,
    ),

    binaryExpression: $ => prec.left(1, seq(
      $.expression,
      choice(
        '+',
        '-',
        '*',
        '/',
        '%',
        '==',
        '!=',
        '<',
        '>',
        '<=',
        '>=',
        '&&',
        '||',
      ),
      $.expression,
    )),

    unaryExpression: $ => prec.left(1, seq(
      choice(
        '!',
        '-',
      ),
      $.expression,
    )),
  }
});
