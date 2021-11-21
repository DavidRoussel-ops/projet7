//Constante qui appel la base de donnée
const db = require('../dbconfig');
//Contante qui appel mysql
const mysql = require('mysql');

class postModels {
    constructor() {
    }

    //Model voir tous les posts
    allPost(sqlInserts) {
        let allPost = `SELECT posts.id,
                              posts.userId,
                              posts.com,
                              posts.img,
                              posts.date,
                              utilisateurs.lname,
                              utilisateurs.fname
                       FROM posts
                                JOIN utilisateurs ON posts.userId = utilisateurs.id
                       ORDER BY posts.date DESC`;
        allPost = mysql.format(allPost, sqlInserts)
        return new Promise((resolve) => {
            db.query(allPost, function (err, result) {
                if (err) throw err;
                resolve(result)
            })
        })
    }

    //Model création post
    createPost(sqlInserts) {
        let insertPost = 'INSERT INTO posts VALUES (NULL, ?, ?, ?, NOW())';
        insertPost = mysql.format(insertPost, sqlInserts);
        return new Promise((resolve) => {
            db.query(insertPost, function (err, result) {
                if (err) throw err;
                resolve({message: 'Post crée avec succès'});
            })
        })
    }

    //Model suppression post
    delPost(sqlInserts1, sqlInserts2) {
        let delPost1 = `SELECT *
                        FROM posts
                        WHERE id = ?`;
        delPost1 = mysql.format(delPost1, sqlInserts1);
        return new Promise((resolve, reject) => {
            db.query(delPost1, function (err, result) {
                if (err) throw err;
                if (sqlInserts2[1] === result[0].userId) {
                    let delPost2 = `DELETE
                                    FROM posts
                                    WHERE id = ?
                                      AND userId = ?`;
                    delPost2 = mysql.format(delPost2, sqlInserts2);
                    db.query(delPost2, function (err, result) {
                        if (err) throw err;
                        resolve({message: 'Post supprimer avec succès'});
                    })
                } else {
                    reject({error: 'Post non supprimé'})
                }
            })
        })
    }

    //Model suppression post administrateur
    delPostAdmin(sqlInserts) {
        let delPostAdmin = `DELETE
                            FROM posts
                            WHERE id = ?`;
        delPostAdmin = mysql.format(delPostAdmin, sqlInserts);
        return new Promise((resolve) => {
            db.query(delPostAdmin, function (err, result) {
                if (err) throw err;
                resolve({message: 'Post supprimer avec succès'});
            })
        })
    }

    //Model voir tous les commentaires
    comment(sqlInserts) {
        let comment = `SELECT comments.content,
                              comments.date,
                              comments.id,
                              comments.userId,
                              utilisateurs.fname,
                              utilisateurs.lname
                       FROM comments
                                JOIN utilisateurs ON comments.userId = utilisateurs.id
                       WHERE postId = ?
                       ORDER BY comments.date`;
        comment = mysql.format(comment, sqlInserts);
        return new Promise((resolve) => {
            db.query(comment, function (err, result) {
                if (err) throw err;
                resolve(result);
            })
        })
    }

    //Model création commentaire
    createCom(sqlInserts) {
        let insertCom = `INSERT INTO comments
                         VALUES (NULL, ?, ?, NOW(), ?)`;
        insertCom = mysql.format(insertCom, sqlInserts);
        return new Promise((resolve) => {
            db.query(insertCom, function (err, result) {
                if (err) throw err;
                resolve({message: 'Commentaire crée avec succès'})
            })
        })
    }

    //Model modification commentaire
    modifyCom(sqlInserts1, sqlInserts2) {
        let upCom1 = `SELECT *
                      FROM comments
                      WHERE id = ?`;
        upCom1 = mysql.format(upCom1, sqlInserts1);
        return new Promise((resolve, reject) => {
            db.query(upCom1, function (err, result) {
                if (err) throw err;
                if (sqlInserts2[2] === result[0].userId) {
                    let upCom2 = `UPDATE comments
                                  SET content = ?
                                  WHERE id = ?
                                    AND userId = ?`;
                    upCom2 = mysql.format(upCom2, sqlInserts2);
                    db.query(upCom2, function (err, result) {
                        if (err) throw err;
                        resolve({message: 'Commentaire modifié avec succès'})
                    })
                } else {
                    reject({error: 'Modification impossible'});
                }
            })
        });
    }

    //Model suppression commentaire
    delCom(sqlInserts1, sqlInserts2) {
        let delCom1 = `SELECT *
                       FROM comments
                       WHERE id = ?`;
        delCom1 = mysql.format(delCom1, sqlInserts1);
        return new Promise((resolve, reject) => {
            db.query(delCom1, function (err, result) {
                if (err) throw err;
                if (sqlInserts2[1] === result[0].userId) {
                    let delCom2 = `DELETE
                                   FROM comments
                                   WHERE id = ?
                                     AND userId = ?`;
                    delCom2 = mysql.format(delCom2, sqlInserts2);
                    db.query(delCom2, function (err, result) {
                        if (err) throw err;
                        resolve({message: 'Commentaire supprimé !'});
                    })
                } else {
                    reject({error: 'Suppression impossible'});
                }
            });
        })
    }

    //Model suppression commentaire administrateur
    delComAdmin(sqlInserts) {
        let delComAdmin = `DELETE
                           FROM comments
                           WHERE id = ?`;
        delComAdmin = mysql.format(delComAdmin, sqlInserts);
        return new Promise((resolve) => {
            db.query(delComAdmin, function (err, result) {
                if (err) throw err;
                resolve({message: 'Commentaire supprimer avec succès'});
            })
        })
    }
}

module.exports = postModels;
