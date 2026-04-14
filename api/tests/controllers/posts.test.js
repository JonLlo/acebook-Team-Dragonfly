const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const { Post } = require("../../models/post");
const User = require("../../models/user");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

function createToken(userId) {
  return JWT.sign(
    {
      sub: userId,
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret,
  );
}

describe("/posts", () => {
  let token;
  let user;

  beforeEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});

    user = new User({
      firstName: "Post",
      surname: "Tester",
      email: "post-test@test.com",
      password: "12345678",
    });

    await user.save();
    token = createToken(user.id);
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  describe("POST, when a valid token is present", () => {
    test("responds with a 201", async () => {
      const response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ postContent: "Hello World!" });

      expect(response.status).toEqual(201);
    });

    test("creates a new post", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ postContent: "Hello World!!" });

      const posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].postContent).toEqual("Hello World!!");
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ postContent: "hello again world" });

      expect(response.status).toEqual(401);
    });

    test("a post is not created", async () => {
      await request(app)
        .post("/posts")
        .send({ postContent: "hello again world" });

      const posts = await Post.find();
      expect(posts.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ postContent: "hello again world" });

      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    test("the response code is 200", async () => {
      await new Post({
        postContent: "I love all my children equally",
        authorId: user._id,
      }).save();
      await new Post({
        postContent: "I've never cared for GOB",
        authorId: user._id,
      }).save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

    test("returns every post in the collection", async () => {
      await new Post({ postContent: "howdy!", authorId: user._id }).save();
      await new Post({ postContent: "hola!", authorId: user._id }).save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      const contents = response.body.posts.map((p) => p.postContent);

      expect(contents).toContain("howdy!");
      expect(contents).toContain("hola!");
      expect(contents.length).toEqual(2);
    });
  });

  describe("GET, when token is missing", () => {
    test("the response code is 401", async () => {
      await new Post({ postContent: "howdy!" }).save();
      await new Post({ postContent: "hola!" }).save();

      const response = await request(app).get("/posts");

      expect(response.status).toEqual(401);
    });

    test("returns no posts", async () => {
      await new Post({ postContent: "howdy!" }).save();
      await new Post({ postContent: "hola!" }).save();

      const response = await request(app).get("/posts");

      expect(response.body.posts).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      await new Post({ postContent: "howdy!" }).save();
      await new Post({ postContent: "hola!" }).save();

      const response = await request(app).get("/posts");

      expect(response.body.token).toEqual(undefined);
    });
  });
});
