; Indent inside top-level blocks
(specification_block "{" @indent "}" @outdent)
(model_block "{" @indent "}" @outdent)
(views_block "{" @indent "}" @outdent)
(deployment_block "{" @indent "}" @outdent)
(global_block "{" @indent "}" @outdent)

; Indent inside element kind definitions (in specification)
(element_kind_definition "{" @indent "}" @outdent)

; Indent inside relationship kind definitions (in specification)
(relationship_kind_definition "{" @indent "}" @outdent)

; Indent inside element declarations (in model)
(element_body "{" @indent "}" @outdent)

; Indent inside relationship bodies
(relationship_body "{" @indent "}" @outdent)

; Indent inside view definitions
(view_body "{" @indent "}" @outdent)

; Indent inside style blocks
(style_block "{" @indent "}" @outdent)

; Indent inside style groups
(style_group "{" @indent "}" @outdent)

; Indent inside group blocks
(group_block "{" @indent "}" @outdent)

; Indent inside predicate definitions
(predicate_body "{" @indent "}" @outdent)

; Indent inside predicate group definitions
(predicate_group_definition "{" @indent "}" @outdent)

; Indent inside deployment node definitions
(deployment_node_body "{" @indent "}" @outdent)

; Indent inside instance definitions
(instance_body "{" @indent "}" @outdent)

; Indent inside with clauses
(with_clause "{" @indent "}" @outdent)

; Indent inside include/exclude statement blocks
(include_statement "{" @indent "}" @outdent)
(exclude_statement "{" @indent "}" @outdent)

; Indent inside autoLayout options
(autoLayout_options "{" @indent "}" @outdent)
