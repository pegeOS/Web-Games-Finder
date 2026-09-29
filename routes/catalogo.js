var express = require('express')
var router = express.Router()

// Top 10 mais acessados. Filtro opcional: /catalogo?categoria=palavras
router.get('/', async (req, res, next) => {
  try {
    const db = req.app.locals.db
    const consulta = { ranking: { $ne: null } }
    if (req.query.categoria) consulta.categoria = String(req.query.categoria)

    const top = await db.collection('jogos').find(consulta).sort({ ranking: 1 }).limit(10).toArray()
    res.render('catalogo', { top })
  } catch (err) {
    next(err)
  }
})

module.exports = router