const express = require('express');
const bodyParser = require('body-parser');
const Data = require('./data.json')

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get('/books',(req,res) => {
  res.json(Data);
})


app.post('/books',(req,res) => {
  const {book_id,title,author,genre,year,copies} = req.body
  const newBook = {
    "book_id": book_id,
    "title": title,
    "author": author,
    "genre": genre,
    "year": year,
    "copies": copies
}
Data.push(newBook);
res.json(newBook);
})


app.get('/books/:id', (req,res)=> {
  const id = req.params.id;
  const book = Data.find(books => books.book_id === id);
  if(book) {
    res.json(book);
    } else {
      res.status(404).json({message: 'Book not found'});
      }
})



app.delete('/books/:id',(req,res) => {
  const id = req.params.id;
  const index = Data.findIndex(book => book.book_id === id);
  if(index !== -1) {
    Data.splice(index,1);
    res.json({message: 'Book deleted'});
    } else {
      res.status(404).json({message: 'Book not found'});
      }



})



app.put('/books/:id',(req,res) => {
  // const id = req.params.id;
  const {book_id,title,author,genre,year,copies} = req.body;
  const index = Data.find(books => books.book_id === book_id);
  if(index !== -1) {
    index.title = title;
    index.author = author;
    index.genre = genre;
    index.year = year;
    index.copies = copies;
    res.json(index);
}else{
  res.status(404).json({message: 'Book not found'});
}

})