const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'Nenhum token foi fornecido' });

  const parts = authHeader.split(' ');

  if (parts.length !== 2) return res.status(401).json({ error: 'Formato do token incorreto' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Token mal formatado' });

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Token inválido' });

      req.userId = decoded.id;

      return next();
    });
  } catch (err) {
    return res.status(500).json({ error: 'Ocorreu um erro' });
  }
};
