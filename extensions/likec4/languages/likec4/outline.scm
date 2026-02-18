; Top-level specification block
(specification_block) @item

; Top-level model block
(model_block) @item

; Top-level views block
(views_block) @item

; Top-level deployment block
(deployment_block) @item

; Top-level global block
(global_block) @item

; Element kind definitions (in specification)
(element_kind_definition
  "element" @context
  name: (identifier) @name) @item

; Relationship kind definitions (in specification)
(relationship_kind_definition
  "relationship" @context
  name: (identifier) @name) @item

; Tag definitions
(tag_definition
  "tag" @context
  name: (identifier) @name) @item

; Color definitions
(color_definition
  "color" @context
  name: (identifier) @name) @item

; Element declarations (in model)
(element_declaration
  name: (identifier) @name
  kind: (identifier) @context) @item

; Extend element statements
(extend_element
  "extend" @context
  element: (qualified_name) @name) @item

; View definitions
(view_definition
  "view" @context
  name: (identifier) @name) @item

; Dynamic view definitions
(dynamic_view_definition
  "dynamic" @context
  name: (identifier) @name) @item

; Extend view statements
(extend_view
  "extend" @context
  view: (qualified_name) @name) @item

; Style blocks with targets
(style_block
  "style" @context
  target: (element_selector)? @name) @item

; Style group definitions
(style_group
  "styleGroup" @context
  name: (identifier) @name) @item

; Group blocks
(group_block
  "group" @context
  name: [(identifier) (string)] @name) @item

; Deployment node definitions
(deployment_node_definition
  name: (identifier) @name) @item

; Instance definitions
(instance_definition
  name: (identifier) @name) @item

; Predicate definitions
(predicate_definition
  "predicate" @context
  name: (identifier) @name) @item

; Predicate group definitions
(predicate_group_definition
  "predicateGroup" @context
  name: (identifier) @name) @item
