-- Index to make periodic expired-grant cleanup efficient.
CREATE INDEX access_grants_expires_at_idx ON access_grants (expires_at);
