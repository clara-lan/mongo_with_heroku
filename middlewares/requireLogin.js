//export as a func
// a generic middleware to call, checking user status
// next is a func wiil be called after func(req and res) completed
module.exports = (req, res, next) =>{
  if(!req.user){
    return res.status(401).send({ error:"You must log in first."});
  }
  // if loged in, call next
  next();
}