import express from 'express'

const items = [{
  id: 1,
  content: 'Item 1'
}]

export const app = express()

app.use(express.json())

// EJERCICO 6 aquí

app.get('/items', (req, res) => {
  return res.status(200).json(items)
})

app.get('/items/:id', (req, res) => {
  const { id } = req.params
  const itemFound = items.find((item) => item.id === Number(id))
  if (!itemFound) {
    return res.status(404).json()
  }
  return res.status(200).json(itemFound)
})

app.post('/items', (req, res) => {
  const { content } = req.body
  const newItem = {
    content,
    id: items.length + 1
  }
  items.push(newItem)
  return res.status(200).json(newItem)
})

app.put('/items/:id', (req, res) => {
  const { id } = req.params
  const { content } = req.body
  const itemFound = items.find((item) => item.id === Number(id))
  if (!itemFound) {
    return res.status(404).json()
  }
  itemFound.content = content
  return res.status(200).json(itemFound)
})

app.delete('/items/:id', (req, res) => {
  const { id } = req.params
  const itemIndex = items.findIndex((item) => item.id === Number(id))
  if (itemIndex === -1) {
    return res.status(404).json()
  }
  items.splice(itemIndex, 1)
  return res.status(200).json()
})

export const server = app.listen(3000)
