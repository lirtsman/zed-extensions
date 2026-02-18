; Inject markdown into markdown strings (triple-quoted strings)
; These are used for description properties with multi-line markdown content

(markdown_string) @injection.content
(#set! injection.language "markdown")
(#set! injection.include-children)

; Inject markdown into description property values when using markdown strings
(description_property
  value: (markdown_string) @injection.content
  (#set! injection.language "markdown")
  (#set! injection.include-children))
