package tree_sitter_likec4_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-likec4"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_likec4.Language())
	if language == nil {
		t.Errorf("Error loading Likec4 grammar")
	}
}
