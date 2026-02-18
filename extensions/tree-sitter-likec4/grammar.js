/**
 * @file Tree-sitter grammar for LikeC4
 * @author LikeC4 Contributors
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "likec4",

  externals: ($) => [],

  extras: ($) => [/\s/, $.comment, $.block_comment],

  word: ($) => $.identifier,

  conflicts: ($) => [
    [$.element_body, $.style_block],
    [$.view_body, $.style_block],
    [$.element_selector, $.wildcard],
  ],

  rules: {
    source_file: ($) => repeat($._definition),

    _definition: ($) =>
      choice(
        $.specification_block,
        $.model_block,
        $.views_block,
        $.deployment_block,
        $.global_block,
        $.import_statement,
      ),

    // Comments
    comment: ($) => token(seq("//", /.*/)),

    block_comment: ($) => token(seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),

    // Import statement
    import_statement: ($) => seq("import", field("path", $.string)),

    // Top-level blocks
    specification_block: ($) =>
      seq("specification", "{", repeat($._specification_statement), "}"),

    model_block: ($) => seq("model", "{", repeat($._model_statement), "}"),

    views_block: ($) => seq("views", "{", repeat($._view_statement), "}"),

    deployment_block: ($) =>
      seq("deployment", "{", repeat($._deployment_statement), "}"),

    global_block: ($) => seq("global", "{", repeat($._global_statement), "}"),

    // Specification statements
    _specification_statement: ($) =>
      choice(
        $.element_kind_definition,
        $.relationship_kind_definition,
        $.tag_definition,
        $.color_definition,
      ),

    element_kind_definition: ($) =>
      seq(
        "element",
        field("name", $.identifier),
        optional(seq("{", repeat($._element_kind_property), "}")),
      ),

    _element_kind_property: ($) =>
      choice($.notation_property, $.style_block, $.technology_property),

    relationship_kind_definition: ($) =>
      seq(
        "relationship",
        field("name", $.identifier),
        optional(seq("{", repeat($._relationship_kind_property), "}")),
      ),

    _relationship_kind_property: ($) =>
      choice(
        $.notation_property,
        $.style_block,
        $.color_property,
        $.line_property,
        $.head_property,
        $.tail_property,
      ),

    tag_definition: ($) => seq("tag", field("name", $.identifier)),

    color_definition: ($) =>
      seq(
        "color",
        field("name", $.identifier),
        field("value", choice($.hex_color, $.color_function)),
      ),

    // Model statements
    _model_statement: ($) =>
      choice($.element_declaration, $.relationship_statement, $.extend_element),

    element_declaration: ($) =>
      seq(
        field("name", $.identifier),
        "=",
        field("kind", $.identifier),
        optional(field("title", $.string)),
        optional($.element_body),
      ),

    element_body: ($) => seq("{", repeat($._element_property), "}"),

    _element_property: ($) =>
      choice(
        $.element_declaration,
        $.relationship_statement,
        $.title_property,
        $.description_property,
        $.technology_property,
        $.icon_property,
        $.link_property,
        $.metadata_property,
        $.style_block,
        $.tag_annotation,
      ),

    extend_element: ($) =>
      seq(
        choice("extend", "extends"),
        field("element", $.qualified_name),
        optional($.element_body),
      ),

    // Relationship statements
    relationship_statement: ($) =>
      seq(
        field("source", $.qualified_name),
        $.relationship_operator,
        field("target", $.qualified_name),
        optional(field("title", $.string)),
        optional($.relationship_body),
      ),

    relationship_operator: ($) =>
      choice("->", "<-", "<->", $.labeled_relationship),

    labeled_relationship: ($) =>
      seq("-[", optional(field("label", $.identifier)), "]->"),

    relationship_body: ($) => seq("{", repeat($._relationship_property), "}"),

    _relationship_property: ($) =>
      choice(
        $.title_property,
        $.description_property,
        $.technology_property,
        $.style_block,
        $.navigateTo_property,
        $.tag_annotation,
      ),

    // View statements
    _view_statement: ($) =>
      choice($.view_definition, $.dynamic_view_definition, $.extend_view),

    view_definition: ($) =>
      seq(
        "view",
        field("name", $.identifier),
        optional(seq("of", field("element", $.qualified_name))),
        optional($.view_body),
      ),

    dynamic_view_definition: ($) =>
      seq(
        "dynamic",
        optional("view"),
        field("name", $.identifier),
        optional(seq("of", field("element", $.qualified_name))),
        optional($.view_body),
      ),

    extend_view: ($) =>
      seq(
        choice("extend", "extends"),
        field("view", $.qualified_name),
        optional($.view_body),
      ),

    view_body: ($) => seq("{", repeat($._view_property), "}"),

    _view_property: ($) =>
      choice(
        $.title_property,
        $.description_property,
        $.link_property,
        $.include_statement,
        $.exclude_statement,
        $.autoLayout_property,
        $.style_block,
        $.style_group,
        $.group_block,
        $.navigateTo_property,
      ),

    include_statement: ($) =>
      seq(
        "include",
        choice(
          $.wildcard,
          $.element_selector,
          seq("{", repeat(choice($.element_selector, $.wildcard)), "}"),
        ),
      ),

    exclude_statement: ($) =>
      seq(
        "exclude",
        choice(
          $.wildcard,
          $.element_selector,
          seq("{", repeat(choice($.element_selector, $.wildcard)), "}"),
        ),
      ),

    element_selector: ($) =>
      seq($.qualified_name, optional($.where_clause), optional($.with_clause)),

    where_clause: ($) => seq("where", $._where_expression),

    _where_expression: ($) =>
      choice(
        $.where_condition,
        $.where_and,
        $.where_or,
        $.where_not,
        seq("(", $._where_expression, ")"),
      ),

    where_condition: ($) =>
      choice(
        seq(
          choice("kind", "tag", "element"),
          "is",
          optional("not"),
          $.identifier,
        ),
        seq("tag", "=", $.tag_reference),
      ),

    where_and: ($) =>
      prec.left(1, seq($._where_expression, "and", $._where_expression)),
    where_or: ($) =>
      prec.left(0, seq($._where_expression, "or", $._where_expression)),
    where_not: ($) => prec(2, seq("not", $._where_expression)),

    with_clause: ($) => seq("with", "{", repeat($._with_property), "}"),

    _with_property: ($) =>
      choice(
        $.title_property,
        $.description_property,
        $.technology_property,
        $.icon_property,
        $.color_property,
        $.shape_property,
        $.navigateTo_property,
      ),

    // Deployment statements
    _deployment_statement: ($) =>
      choice($.deployment_node_definition, $.instance_definition),

    deployment_node_definition: ($) =>
      seq(
        choice("deploymentNode", "node"),
        field("name", $.identifier),
        optional(field("title", $.string)),
        optional($.deployment_node_body),
      ),

    deployment_node_body: ($) =>
      seq("{", repeat($._deployment_node_property), "}"),

    _deployment_node_property: ($) =>
      choice(
        $.deployment_node_definition,
        $.instance_definition,
        $.title_property,
        $.description_property,
        $.technology_property,
        $.icon_property,
        $.style_block,
        $.tag_annotation,
      ),

    instance_definition: ($) =>
      seq(
        choice("instance", "instanceOf"),
        field("name", $.identifier),
        field("of_element", $.qualified_name),
        optional($.instance_body),
      ),

    instance_body: ($) => seq("{", repeat($._instance_property), "}"),

    _instance_property: ($) =>
      choice(
        $.title_property,
        $.description_property,
        $.technology_property,
        $.icon_property,
        $.style_block,
        $.tag_annotation,
      ),

    // Global statements
    _global_statement: ($) =>
      choice(
        $.style_group,
        $.predicate_definition,
        $.predicate_group_definition,
      ),

    predicate_definition: ($) =>
      seq("predicate", field("name", $.identifier), optional($.predicate_body)),

    predicate_body: ($) => seq("{", repeat($._predicate_property), "}"),

    _predicate_property: ($) =>
      choice($.include_statement, $.exclude_statement),

    predicate_group_definition: ($) =>
      seq(
        "predicateGroup",
        field("name", $.identifier),
        optional(seq("{", repeat($.predicate_definition), "}")),
      ),

    // Style definitions
    style_block: ($) =>
      seq(
        "style",
        optional(field("target", $.element_selector)),
        "{",
        repeat($._style_property),
        "}",
      ),

    style_group: ($) =>
      seq(
        "styleGroup",
        field("name", $.identifier),
        "{",
        repeat($.style_block),
        "}",
      ),

    _style_property: ($) =>
      choice(
        $.color_property,
        $.shape_property,
        $.icon_property,
        $.opacity_property,
        $.border_property,
        $.line_property,
        $.head_property,
        $.tail_property,
        $.size_property,
        $.padding_property,
        $.textSize_property,
        $.iconColor_property,
        $.iconPosition_property,
        $.iconSize_property,
        $.multiple_property,
        $.notation_property,
      ),

    // Group block
    group_block: ($) =>
      seq(
        "group",
        field("name", choice($.identifier, $.string)),
        "{",
        repeat($._view_property),
        "}",
      ),

    // Properties
    title_property: ($) => seq("title", field("value", $.string)),
    description_property: ($) =>
      seq("description", field("value", choice($.string, $.markdown_string))),
    technology_property: ($) => seq("technology", field("value", $.string)),
    notation_property: ($) => seq("notation", field("value", $.string)),
    metadata_property: ($) => seq("metadata", field("value", $.string)),

    icon_property: ($) =>
      seq("icon", field("value", choice($.icon_reference, $.string, "none"))),

    link_property: ($) => seq("link", field("value", $.string)),

    navigateTo_property: ($) =>
      seq("navigateTo", field("value", $.qualified_name)),

    color_property: ($) =>
      seq(
        "color",
        field("value", choice($.color_value, $.hex_color, $.color_function)),
      ),

    shape_property: ($) => seq("shape", field("value", $.shape_value)),

    opacity_property: ($) => seq("opacity", field("value", $.number)),

    border_property: ($) => seq("border", field("value", $.border_value)),

    line_property: ($) => seq("line", field("value", $.line_value)),

    head_property: ($) => seq("head", field("value", $.arrow_value)),

    tail_property: ($) => seq("tail", field("value", $.arrow_value)),

    size_property: ($) => seq("size", field("value", $.size_value)),

    padding_property: ($) => seq("padding", field("value", $.size_value)),

    textSize_property: ($) => seq("textSize", field("value", $.size_value)),

    iconColor_property: ($) =>
      seq(
        "iconColor",
        field("value", choice($.color_value, $.hex_color, $.color_function)),
      ),

    iconPosition_property: ($) =>
      seq("iconPosition", field("value", $.identifier)),

    iconSize_property: ($) => seq("iconSize", field("value", $.size_value)),

    multiple_property: ($) =>
      seq("multiple", optional(field("value", $.boolean))),

    autoLayout_property: ($) =>
      seq(
        "autoLayout",
        field("direction", $.layout_direction),
        optional(field("options", $.autoLayout_options)),
      ),

    autoLayout_options: ($) => seq("{", repeat($._autoLayout_option), "}"),

    _autoLayout_option: ($) =>
      choice(seq("rank", choice("same", "source", "sink", "min", "max"))),

    // Enums and values
    color_value: ($) =>
      choice(
        "amber",
        "blue",
        "gray",
        "green",
        "indigo",
        "muted",
        "primary",
        "secondary",
        "red",
        "sky",
        "slate",
        "none",
      ),

    shape_value: ($) =>
      choice(
        "rectangle",
        "component",
        "person",
        "browser",
        "mobile",
        "cylinder",
        "storage",
        "queue",
        "bucket",
        "document",
      ),

    border_value: ($) => choice("solid", "dashed", "dotted", "none"),

    line_value: ($) => choice("solid", "dashed", "dotted"),

    arrow_value: ($) =>
      choice(
        "normal",
        "onormal",
        "crow",
        "diamond",
        "odiamond",
        "dot",
        "odot",
        "vee",
        "open",
        "none",
      ),

    size_value: ($) =>
      choice(
        "xsmall",
        "xs",
        "small",
        "sm",
        "medium",
        "md",
        "large",
        "lg",
        "xlarge",
        "xl",
      ),

    layout_direction: ($) =>
      choice("TopBottom", "LeftRight", "BottomTop", "RightLeft"),

    // Tags
    tag_annotation: ($) => $.tag_reference,
    tag_reference: ($) => seq("#", $.identifier),

    // Icon references
    icon_reference: ($) =>
      seq(
        field("library", choice("aws", "azure", "bootstrap", "gcp", "tech")),
        ":",
        field("name", $.identifier),
      ),

    // Color functions
    color_function: ($) =>
      choice(
        seq("rgb", "(", $.number, ",", $.number, ",", $.number, ")"),
        seq("rgb", "(", $.number, $.number, $.number, ")"),
        seq(
          "rgba",
          "(",
          $.number,
          ",",
          $.number,
          ",",
          $.number,
          ",",
          $.number,
          ")",
        ),
        seq("rgba", "(", $.number, $.number, $.number, $.number, ")"),
      ),

    // Hex color
    hex_color: ($) => /#[a-fA-F0-9]{3,8}/,

    // Wildcards
    wildcard: ($) =>
      choice(
        "*",
        ".*",
        "._",
        ".**",
        ".__",
        seq($.qualified_name, choice(".*", "._", ".**", ".__")),
      ),

    // Qualified name (dot-separated identifiers)
    qualified_name: ($) => seq($.identifier, repeat(seq(".", $.identifier))),

    // Primitives
    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_-]*/,

    string: ($) =>
      choice(
        seq('"', repeat(choice(/[^"\\]/, $.escape_sequence)), '"'),
        seq("'", repeat(choice(/[^'\\]/, $.escape_sequence)), "'"),
      ),

    markdown_string: ($) =>
      choice(seq('"""', /[^"]*/, '"""'), seq("'''", /[^']*/, "'''")),

    escape_sequence: ($) =>
      token(
        seq(
          "\\",
          choice(
            /[\\'"nrt0]/,
            /x[0-9a-fA-F]{2}/,
            /u[0-9a-fA-F]{4}/,
            /u\{[0-9a-fA-F]+\}/,
          ),
        ),
      ),

    number: ($) => choice(/\d+/, /\d+\.\d+/, /\d+%/),

    boolean: ($) => choice("true", "false"),
  },
});
