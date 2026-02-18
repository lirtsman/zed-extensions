; Structural blocks - curly braces
(specification_block "{" @open "}" @close)
(model_block "{" @open "}" @close)
(views_block "{" @open "}" @close)
(deployment_block "{" @open "}" @close)
(global_block "{" @open "}" @close)

; Element and view bodies
(element_body "{" @open "}" @close)
(view_body "{" @open "}" @close)
(relationship_body "{" @open "}" @close)
(deployment_node_body "{" @open "}" @close)
(instance_body "{" @open "}" @close)
(predicate_body "{" @open "}" @close)

; Style blocks
(style_block "{" @open "}" @close)
(style_group "{" @open "}" @close)
(group_block "{" @open "}" @close)

; Clauses
(with_clause "{" @open "}" @close)
(autoLayout_options "{" @open "}" @close)

; Include/exclude block syntax
(include_statement "{" @open "}" @close)
(exclude_statement "{" @open "}" @close)
