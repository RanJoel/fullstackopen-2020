const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

let token = "";

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();

  const response = await await api.post("/api/login/").send({
    username: "tanapol",
    password: "12345678",
  });

  token = response.body.token;
});

test("all notes are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("blogs contain id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("blog can be added", async () => {
  const newBlog = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length + 1);

  const titles = response.body.map((blog) => blog.title);
  expect(titles).toContain("Canonical string reduction");
});

test("if there is no token, proper status code is shown", async () => {
  const newBlog = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);

  const titles = response.body.map((blog) => blog.title);
  expect(titles).not.toContain("Canonical string reduction");
});

test("if likes value is missing a default value is set", async () => {
  const newBlog = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    __v: 0,
  };

  await Blog.deleteMany({});

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(1);

  const likes = response.body.map((blog) => blog.likes);
  expect(likes[0]).toBe(0);
});

test("if title or url are missing 400 status is returned", async () => {
  const blogWithoutTitle = {
    _id: "5a422b3a1b54a676234d17f9",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 2,
    __v: 0,
  };

  const blogWithoutUrl = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 2,
    __v: 0,
  };

  await api
    .post("/api/blogs")
    .send(blogWithoutTitle)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  await api
    .post("/api/blogs")
    .send(blogWithoutUrl)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
