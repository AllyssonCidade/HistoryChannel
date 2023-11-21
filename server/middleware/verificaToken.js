const verificarToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ mensagem: 'Token não fornecido' });
    }
  
    jwt.verify(token, 'esudebastanteparaficarbom', (err, decoded) => {
      if (err) {
        return res.status(403).json({ mensagem: 'Falha na autenticação do token' });
      }
      req.usuario = decoded;
      next();
    });
  };
  
  app.post("/rotaProtegida", verificarToken, (req, res) => {
    res.json({ mensagem: 'Esta rota é protegida por JWT', usuario: req.usuario });
  });
  