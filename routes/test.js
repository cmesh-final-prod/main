module.exports = app => {
  app.get('/api/test', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      res.send({ env: 'production' });
    } else {
      res.send({ env: 'development' });
    }
  });
};
