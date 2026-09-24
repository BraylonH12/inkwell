// Only the <main> element changes from Lecture 7 — full width on
// mobile, a constrained, centered column from md: upward (Section 5.2).
<main className="w-full px-4 py-6 md:max-w-2xl md:mx-auto md:px-6 md:py-8">
 <Routes>
  <Route path="/" element={<Feed />} />
  <Route path="/write" element={<PostEditor />} />
 </Routes>
</main>