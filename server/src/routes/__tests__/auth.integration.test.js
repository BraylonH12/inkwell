import { randomUUID } from "node:crypto";
import request from "supertest";
import { app } from "../../app.js";
import { prisma } from "../../db/client.js";

const email = `auth-integration-${randomUUID()}@example.com`;
const password = "integration-password";
let registered = false;

afterAll(async () => {
  try {
    if (registered) {
      await prisma.user.deleteMany({ where: { email } });
    }
  } finally {
    await prisma.$disconnect();
  }
});

test("registration credentials can be used to log in", async () => {
  const registration = await request(app)
    .post("/api/auth/register")
    .send({ email, displayName: "Integration User", password });

  expect(registration.status).toBe(201);
  registered = true;
  expect(registration.body.user).toEqual(
    expect.objectContaining({ email, displayName: "Integration User" }),
  );
  expect(registration.body.accessToken).toEqual(expect.any(String));

  const login = await request(app)
    .post("/api/auth/login")
    .send({ email, password });

  expect(login.status).toBe(200);
  expect(login.body.user.id).toBe(registration.body.user.id);
  expect(login.body.accessToken).toEqual(expect.any(String));
});
