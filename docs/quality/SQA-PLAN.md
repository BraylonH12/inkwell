# Inkwell SQA Plan — v1
## Standards
- All code changes follow the PR checklist (docs/reviews, .github/PULL_REQUEST_TEMPLATE.md)
- Architecture conformance per ADR-001 (docs/architecture/adr-001-modular.monolith.md)
- API contract conventions per docs/design/api-contract.md
## Reviews
- Every merged change is self-reviewed (author) then peer-reviewed before merge
- Review findings logged in docs/reviews/
## Testing (expanded in Lecture 12-14)
- Unit tests: Services and Repositories (Jest) — ACTIVE as of Lecture 12
- Integration tests: Routes (Supertest) — starting Lecture 13
- End-to-end tests: critical user flows (Playwright) — starting Lecture 14
## Defect Tracking
- All discovered defects (via review, testing, or manual use) recorded in docs/quality/DEFECT-LOG.md
- Each entry records: cause category, discovery stage, and remediation
## Metrics Tracked
- Defects per lecture/increment
- Defect cause category distribution
- Review turnaround (informal, tracked qualitatively at thisproject's scale)
## Ownership
- For this course project: the student/team implementing Inkwell owns SQA plan adherence.
## PostService.search() Test Cases (Lecture 9)

| Test Case | Scenario | Input | Expected Result |
|---|---|---|---|
| PS-SEARCH-01 | Search with default pagination | `query: "inkwell"` | Matching posts and `hasMore` are returned; the repository receives page 1 and page size 10. |
| PS-SEARCH-02 | Search with custom pagination | `query: "inkwell", page: 3, pageSize: 5` | The repository receives the query and requested pagination values. |
| PS-SEARCH-03 | Search with no matches | `query: "no-match"`; repository returns no posts | The result contains an empty `posts` array and `hasMore: false`. |
| PS-SEARCH-04 | Repository search fails | `query: "inkwell"`; repository rejects with an error | `PostService.search()` rejects with the same repository error. |

## Metrics Snapshot (as of 10/7/26)
- Commits --> _22_
- Logged Defects --> _1_
- Backlog marked "Requirements Defined" -->_9_