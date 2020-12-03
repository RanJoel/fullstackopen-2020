const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());

morgan.token("data", function getId(req) {
  return req.str;
});

app.use(express.json());

app.use(stringifyData);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

function stringifyData(req, res, next) {
  req.str = JSON.stringify(req.body);
  next();
}

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

const generateId = () => {
  return Math.floor(Math.random() * 1000 + 1);
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const found = persons.find((person) => {
    return person.id === id;
  });
  if (found) {
    response.json(found);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  let time = new Date();
  response.send(
    `<div><div>phonebook has info for ${persons.length} people</div><br/><div>${time}</div></div>`
  );
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!(body.name && body.number)) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const result = persons.some(({ name }) => name === body.name);
  if (result) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
