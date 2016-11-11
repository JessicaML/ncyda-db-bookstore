const express = require('express'),
      Sequelize = require('Sequelize'),
      router = express.Router();

const sequelize = new Sequelize('bulletinboard', 'Jessica', '', { dialect: 'postgres' });

var notice = sequelize.define('notice', {
  // id: Sequelize.INTEGER,
  title: Sequelize.STRING,
  body: Sequelize.TEXT
});

router.get('/', (request, response) => {
  notice.findAll({ order: 'id ASC' }).then((notices) => {
    response.render('notices/index', { notices: notices });
  });
});


router.get('/:id', (request, response) => {
  notice.findById(request.params.id).then((notice) => {
    response.render('notices/show', { notice: notice });
  });
});


router.delete('/:id', (request, response) => {
  notice.destroy({
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/notices');
  });
});

router.put('/:id', (request, response) => {
  notice.update(request.params, {
    where: {
      id: request.params.id
    }
  }).then(() => {
    respose.redirect('/notices/' + request.params.id);
  });
});

module.exports = router;
