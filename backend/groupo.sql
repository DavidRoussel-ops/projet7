DROP TABLE IF EXISTS utilisateurs;
CREATE TABLE `utilisateurs` (
                               id int unsigned NOT NULL AUTO_INCREMENT,
                               mail varchar(255) NOT NULL,
                               pass varchar(255) NOT NULL,
                               lname varchar(255) NOT NULL,
                               fname varchar(255) NOT NULL,
                               admin tinyint NOT NULL DEFAULT '0',
                               PRIMARY KEY (id),
                               UNIQUE KEY mail (mail)
)
    ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
                      id int unsigned NOT NULL AUTO_INCREMENT,
                      userId INT unsigned NOT NULL,
                      com text,
                      img blob,
                      date datetime NOT NULL,
                      PRIMARY KEY (`id`),
                      CONSTRAINT fk_posts_user_id FOREIGN KEY (userId) REFERENCES utilisateurs (id) ON DELETE CASCADE ON UPDATE CASCADE
)
    ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
                     id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                     userId INT UNSIGNED NOT NULL,
                     postId INT UNSIGNED NOT NULL,
                     date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                     content TEXT NOT NULL,
                     PRIMARY KEY(id),
                     KEY fk_comment_postId (postId),
                     KEY fk_comment_userId (userId),
                     CONSTRAINT fk_comment_postId FOREIGN KEY (postId) REFERENCES posts (id) ON DELETE CASCADE ON UPDATE CASCADE,
                     CONSTRAINT fk_comment_userId FOREIGN KEY (userId) REFERENCES utilisateurs (id) ON DELETE CASCADE ON UPDATE CASCADE
)
    ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO utilisateurs VALUES (NULL, 'admin@gmail.com', 'adminGroupo', 'admin', 'admin', 1);