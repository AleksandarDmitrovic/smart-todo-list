const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //Queries UPDATE todo
  router.get("/:id", (req, res) => {
    const title = req.query.title;
    const description = req.query.description;
    const complete = req.query.complete;
    const categoryID = req.query.category_id;
    const id = req.query.id;
    const userID = req.session.user_id;


    if (categoryID === 'NA') {
      const queryParams = [title, description, complete, id, userID];
      const queryString = `
      UPDATE todos
      SET title = $1,
      description = $2,
      complete = $3,
      category_id = null
      WHERE todos.id = $4
      AND user_id = $5
      RETURNING *;`;

      db.query(queryString, queryParams)
        .then((data) => {
          const categoryID = data.rows[0].category_id;
          res.json(categoryID);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    } else if (categoryID === "") {
      const queryParams = [title, description, complete, id, userID];
      const queryString = `
      UPDATE todos
      SET title = $1,
      description = $2,
      complete = $3
      WHERE todos.id = $4
      AND user_id = $5
      RETURNING *;`;

      db.query(queryString, queryParams)
        .then((data) => {
          const categoryID = data.rows[0].category_id;
          res.json(categoryID);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    }  else {
      const queryParams = [title, description, complete, categoryID, id, userID];
      const queryString = `
      UPDATE todos
      SET title = $1,
      description = $2,
      complete = $3,
      category_id = $4
      WHERE todos.id = $5
      AND user_id = $6
      RETURNING *;`;

      db.query(queryString, queryParams)
        .then((data) => {
          const categoryID = data.rows[0].category_id;
          res.json(categoryID);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    }
  });

  return router;
};
