CREATE DATABASE IF NOT EXISTS video_streaming;
USE video_streaming;

CREATE TABLE IF NOT EXISTS videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO videos (title, description, video_url) VALUES
('Tutorial Node.js Dasar', 'Belajar Node.js dari awal untuk pemula. Cocok bagi yang baru memulai programming backend.', 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/preview'),
('Belajar Express.js', 'Panduan lengkap framework Express.js untuk membuat REST API dan web server.', 'https://drive.google.com/file/d/9z8y7x6w5v4u3t2s1r0q/preview'),
('MySQL untuk Pemula', 'Pengenalan database MySQL, query dasar, join, dan best practices.', 'https://drive.google.com/file/d/0o9i8u7y6t5r4e3w2q1p/preview');
