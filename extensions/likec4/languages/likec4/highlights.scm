; Comments
(comment) @comment
(block_comment) @comment

; Strings
(string) @string
(markdown_string) @string
(escape_sequence) @string.escape

; Numbers
(number) @number

; Boolean values
(boolean) @boolean

; Keywords - top level blocks
[
  "specification"
  "model"
  "views"
  "deployment"
  "global"
] @keyword

; Keywords - definitions
[
  "element"
  "tag"
  "relationship"
  "view"
  "dynamic"
  "extend"
  "extends"
  "deploymentNode"
  "node"
  "instance"
  "instanceOf"
] @keyword

; Keywords - control flow / modifiers
[
  "include"
  "exclude"
  "where"
  "with"
  "style"
  "styleGroup"
  "group"
  "autoLayout"
  "navigateTo"
  "link"
  "import"
  "of"
  "predicate"
  "predicateGroup"
  "is"
  "rank"
] @keyword

; Keywords - logical operators
[
  "and"
  "or"
  "not"
] @keyword

; Element kind definitions
(element_kind_definition
  name: (identifier) @type.definition)

; Relationship kind definitions
(relationship_kind_definition
  name: (identifier) @type.definition)

; Tag definitions
(tag_definition
  name: (identifier) @type.definition)

; Color definitions
(color_definition
  name: (identifier) @type.definition)

; Element declarations in model
(element_declaration
  name: (identifier) @variable.definition
  kind: (identifier) @type)

; View definitions
(view_definition
  name: (identifier) @function.definition)

(dynamic_view_definition
  name: (identifier) @function.definition)

; Deployment node definitions
(deployment_node_definition
  name: (identifier) @type.definition)

; Instance definitions
(instance_definition
  name: (identifier) @variable.definition)

; Predicate definitions
(predicate_definition
  name: (identifier) @function.definition)

(predicate_group_definition
  name: (identifier) @function.definition)

; Style group definitions
(style_group
  name: (identifier) @type.definition)

; Group blocks
(group_block
  name: (identifier) @label)
(group_block
  name: (string) @label)

; Property names
[
  "title"
  "description"
  "technology"
  "notation"
  "metadata"
  "multiple"
  "icon"
  "iconColor"
  "iconPosition"
  "iconSize"
  "opacity"
  "color"
  "shape"
  "border"
  "head"
  "tail"
  "line"
  "size"
  "padding"
  "textSize"
] @property

; Shape values
(shape_value) @type.builtin

; Color values
(color_value) @constant

; Hex colors
(hex_color) @constant

; Border, line, arrow values
(border_value) @constant
(line_value) @constant
(arrow_value) @constant

; Size values
(size_value) @constant

; Layout directions
(layout_direction) @constant

; Tag references
(tag_reference) @tag
(tag_annotation) @tag

; Icon references
(icon_reference
  name: (identifier) @string.special)

; Icon library names
[
  "aws"
  "azure"
  "bootstrap"
  "gcp"
  "tech"
] @namespace

; Color functions
[
  "rgb"
  "rgba"
] @function.builtin

; Relationship operators
[
  "->"
  "<-"
  "<->"
] @operator

; Labeled relationship
(labeled_relationship
  label: (identifier) @function)

; Wildcards
(wildcard) @variable.special

; Qualified names
(qualified_name
  (identifier) @variable)

; Extend statements
(extend_element
  element: (qualified_name) @type)

(extend_view
  view: (qualified_name) @function)

; Element selector in include/exclude
(element_selector
  (qualified_name) @variable)

; None keyword (special value)
"none" @constant.builtin

; Identifiers (fallback - should be last)
(identifier) @variable
