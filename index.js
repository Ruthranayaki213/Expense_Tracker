const express = require('express')
const mongoose = require('mongoose');
const app = express()
const Expense = require('./expense');
mongoose.connect('mongodb+srv://ruthranayakij21aid:ptC5XZ13VJS0UkYJ@cluster0.3ehzez5.mongodb.net/newDb?retryWrites=true&w=majority',  //0.0.0.0:
  {
    useUnifiedTopology: true
  })
app.use(express.json());

app.get('/expense',async(req,res)=>{
  const expenses = await Expense.find();
  res.send(expenses)
})

app.get('/expense/:id',async(req,res)=>{
  console.log(req.params);
  // const expenses = await Expense.find();
  // res.send(expenses)
  res.send(req.params);
})

app.delete('/expense/:id',async(req,res)=>{
  try
  {
    const id = req.params.id;
    const result = await Expense.findByIdAndDelete(id);
    if(result)
      res.send(result);
    else
     res.send("No expense with that id");
  }catch(err)
  {
    res.end(err)
  }
});

app.post('/expense',async(req, res) => {
  console.log(req.body);
  const newExpense = req.body;
  await Expense.create(newExpense);
  res.send('created');
  // res.send(`<p>Hello World!</p>`)
 
})

app.put('/expense/:id',async(req,res)=>{
  const id = req.params.id;
  const updateObject = req.body;
  const updatedObject = await Expense.findByIdAndUpdate(id,{$set:updateObject},{
    new:true
  })
  res.send(updatedObject);
})




const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


