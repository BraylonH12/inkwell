# README Verification — Lecture 14

Performed on this checkout, following README.md exactly, step by step, with no undocumented prior knowledge assumed:
- [x] `git clone` + steps in "Getting Started" produce a running server
- [x] `git clone` + steps in "Getting Started" produce a running client
- [x] Every environment variable the app actually requires is documented
- [x] Every command shown in the README actually runs without modification

Result: 1 gap found — larger than this section's own example above.

README.md had no "Getting Started" section at all: no clone instructions, no npm install, no Docker/Postgres setup, no DATABASE_URL format, no run commands, and no test commands. A genuine newcomer could not have gotten the app running from README.md alone at any point through Lecture 13.

The README was updated to include a full "Getting Started" section with prerequisites, database setup, server setup, client setup, and test commands.
