// server/src/services/__tests__/post.service.test.js
import { jest } from "@jest/globals";
const mockPostRepository = {
 createWithTags: jest.fn(),
 searchPublished: jest.fn(),
};
const mockEventBus = { emit: jest.fn() };
jest.unstable_mockModule("../../repositories/post.repository.js", () => ({
 PostRepository: mockPostRepository,
}));
jest.unstable_mockModule("../../events/event-bus.js", () => ({
 EventBus: mockEventBus,
}));
const { PostService } = await import("../post.service.js");
test("publish() creates a PUBLISHED post and emits post.published", async () => {
 mockPostRepository.createWithTags.mockResolvedValue({ id: "p1", title: "Hello", status: "PUBLISHED" });
 const post = await PostService.publish({ authorId: "u1", title: "Hello", body: "World" });
 expect(post.status).toBe("PUBLISHED");
 expect(mockEventBus.emit).toHaveBeenCalledWith(
 "post.published",
 expect.objectContaining({ postId: "p1" })
 );
});
test("publish() rejects an empty title", async () => {
 await expect(
 PostService.publish({ authorId: "u1", title: "", body: "World" })
 ).rejects.toThrow();
});
describe("PostService.search", () => {
 test("returns matching posts and uses default pagination", async () => {
  const result = {
   posts: [{ id: "p1", title: "Inkwell search", body: "A post" }],
   hasMore: false,
  };
  mockPostRepository.searchPublished.mockResolvedValue(result);

  await expect(PostService.search({ query: "inkwell" })).resolves.toEqual(result);
  expect(mockPostRepository.searchPublished).toHaveBeenCalledWith({
   query: "inkwell",
   page: 1,
   pageSize: 10,
  });
 });

 test("passes custom pagination to the search repository", async () => {
  mockPostRepository.searchPublished.mockResolvedValue({ posts: [], hasMore: false });

  await PostService.search({ query: "inkwell", page: 3, pageSize: 5 });

  expect(mockPostRepository.searchPublished).toHaveBeenCalledWith({
   query: "inkwell",
   page: 3,
   pageSize: 5,
  });
 });

 test("returns an empty result when no posts match", async () => {
  const result = { posts: [], hasMore: false };
  mockPostRepository.searchPublished.mockResolvedValue(result);

  await expect(PostService.search({ query: "no-match" })).resolves.toEqual(result);
 });

 test("propagates repository failures", async () => {
  const error = new Error("search failed");
  mockPostRepository.searchPublished.mockRejectedValue(error);

  await expect(PostService.search({ query: "inkwell" })).rejects.toBe(error);
 });
});
