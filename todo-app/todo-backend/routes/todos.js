const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  try {
    const todo = await Todo.findById(id)
    if (!todo) return res.sendStatus(404)
    req.todo = todo
    next()
  } catch (e) {
    console.log(e)
    res.sendStatus(400)
  }
}

/* DELETE todo. */
router.delete('/:id', findByIdMiddleware, async (req, res) => {
  await Todo.findByIdAndDelete(req.todo._id)  
  res.sendStatus(204);
});

/* GET todo. */
router.get('/:id', findByIdMiddleware, async (req, res) => {
  const todo = await Todo.findById(req.todo._id)
  res.send(todo);
});

/* PUT todo. */
router.put('/:id', findByIdMiddleware, async (req, res) => {
  const {text, done} = req.body
  if (text !== undefined) req.todo.text = text
  if (done !== undefined) req.todo.done = done
  const todoModified = await Todo.findByIdAndUpdate(req.todo._id, req.todo)
  res.send(todoModified);
});


module.exports = router;
