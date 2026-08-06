// Copyright IBM Corp. 2026

package http

import (
	"testing"

	"terraform-graph-catalog/internal/database"

	"github.com/stretchr/testify/require"
)

func TestResourceCursorRoundTrip(t *testing.T) {
	// Encoding a cursor and decoding it back produces the original value.
	orig := &database.ResourceCursor{
		WorkspaceID: "ws-abc123",
		Address:     "aws_instance.web[0]",
		InstanceKey: "0",
		Set:         true,
	}
	encoded := encodeResourceCursor(orig)
	require.NotNil(t, encoded)

	decoded, err := decodeResourceCursor(*encoded)
	require.NoError(t, err)
	require.True(t, decoded.Set)
	require.Equal(t, orig.WorkspaceID, decoded.WorkspaceID)
	require.Equal(t, orig.Address, decoded.Address)
	require.Equal(t, orig.InstanceKey, decoded.InstanceKey)
}

func TestResourceCursorNilEncode(t *testing.T) {
	require.Nil(t, encodeResourceCursor(nil))
}

func TestResourceCursorEmptyDecode(t *testing.T) {
	c, err := decodeResourceCursor("")
	require.NoError(t, err)
	require.False(t, c.Set)
}

func TestResourceCursorMalformedDecode(t *testing.T) {
	_, err := decodeResourceCursor("not-base64!!!")
	require.Error(t, err)
	require.Contains(t, err.Error(), "invalid cursor")
}

func TestResourceCursorBadJSONDecode(t *testing.T) {
	// Valid base64url but not valid JSON inside.
	b64 := "bm90IGpzb24" // base64url("not json"), no padding
	_, err := decodeResourceCursor(b64)
	require.Error(t, err)
	require.Contains(t, err.Error(), "invalid cursor")
}

func TestProviderCursorRoundTrip(t *testing.T) {
	orig := &database.ProviderCursor{
		WorkspaceID:    "ws-abc123",
		ProviderSource: "registry.terraform.io/hashicorp/aws",
		Alias:          "us-west",
		Set:            true,
	}
	encoded := encodeProviderCursor(orig)
	require.NotNil(t, encoded)

	decoded, err := decodeProviderCursor(*encoded)
	require.NoError(t, err)
	require.True(t, decoded.Set)
	require.Equal(t, orig.WorkspaceID, decoded.WorkspaceID)
	require.Equal(t, orig.ProviderSource, decoded.ProviderSource)
	require.Equal(t, orig.Alias, decoded.Alias)
}

func TestProviderCursorNilEncode(t *testing.T) {
	require.Nil(t, encodeProviderCursor(nil))
}

func TestProviderCursorEmptyDecode(t *testing.T) {
	c, err := decodeProviderCursor("")
	require.NoError(t, err)
	require.False(t, c.Set)
}
