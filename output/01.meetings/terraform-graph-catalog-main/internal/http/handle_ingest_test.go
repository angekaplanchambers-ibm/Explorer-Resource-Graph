// Copyright IBM Corp. 2026

package http

import (
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestRedactSensitive(t *testing.T) {
	cases := []struct {
		name  string
		input string
		want  string
	}{
		{
			name:  "nil input",
			input: "",
			want:  "",
		},
		{
			name:  "non-sensitive scalar passes through",
			input: `{"constant_value":"us-east-1"}`,
			want:  `{"constant_value":"us-east-1"}`,
		},
		{
			name:  "top-level sensitive object replaced",
			input: `{"sensitive":true,"value":"secret"}`,
			want:  `"<sensitive>"`,
		},
		{
			name:  "nested sensitive object replaced",
			input: `{"region":{"constant_value":"us-east-1"},"secret_key":{"sensitive":true}}`,
			want:  `{"region":{"constant_value":"us-east-1"},"secret_key":"<sensitive>"}`,
		},
		{
			name:  "sensitive false is not redacted",
			input: `{"sensitive":false,"value":"ok"}`,
			want:  `{"sensitive":false,"value":"ok"}`,
		},
		{
			name:  "array of objects with a sensitive entry",
			input: `[{"k":"v"},{"sensitive":true}]`,
			want:  `[{"k":"v"},"<sensitive>"]`,
		},
		{
			name:  "invalid JSON returned unchanged",
			input: `not json`,
			want:  `not json`,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			var raw json.RawMessage
			if tc.input != "" {
				raw = json.RawMessage(tc.input)
			}
			got := redactSensitive(raw)
			if tc.input == "" {
				require.Nil(t, got)
				return
			}
			require.JSONEq(t, tc.want, string(got))
		})
	}
}
