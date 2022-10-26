; Function and method definitions
;--------------------------------

(
  functionDeclaration
  (identifier) @function.method
  (parameterList
    (
      parameter
      (identifier) @variable.parameter
    )
  )
  (expression)
) @function

(
  functionDeclaration
  (identifier) @function.method
  (parameterList
    (
      parameter
      (identifier) @variable.parameter
    )
  )
  (block)
) @function

(
  assignment
  (identifier) @local.definition
  "="
)


; Literals
;---------

[
  (boolean)
] @constant.builtin

(comment) @comment

[
  (string)
] @string

(number) @constant.numeric.integer



[
  ";"
  ","
] @punctuation.delimiter

[
  "-"
  "+"
  "*"
  "/"
  "<"
  "<="
  "="
  "=="
  "!"
  "!="
  ">"
  ">="
  "&&"
  "||"
] @operator

[
  "{{"
  "}}"
  "("
  ")"
  "["
  "]"
  "{"
  "}"
]  @punctuation.bracket

[
  "f"
  "let"
] @keyword

[
  "if"
  "else"
] @keyword.control
