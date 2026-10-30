import { jest } from "@jest/globals";
import express from "express";
import request from "supertest";

const mockPostService = {
  listPublished: jest.fn(),
  search: jest.fn(),
};

jest.unstable_mockModule("../../services/post.service.js", () => ({
  PostService: mockPostService,
}));

const { default: postRoutes } = await import("../post.routes.js");

const app = express();
app.use("/api", postRoutes);

test("GET /api/posts clamps oversized pageSize to 100", async () => {
  mockPostService.listPublished.mockResolvedValue({
    posts: [],
    page: 1,
    hasMore: false,
  });

  const response = await request(app).get("/api/posts?page=1&pageSize=101");

  expect(response.status).toBe(200);
  expect(mockPostService.listPublished).toHaveBeenCalledWith({
    page: 1,
    pageSize: 100,
  });
});
