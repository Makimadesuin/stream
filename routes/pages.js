const express = require('express');
const router = express.Router();
const pool = require('../db');
const { extractGDriveEmbedUrl, extractGDriveId } = require('../helpers/gdrive');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM videos ORDER BY created_at DESC');
    const videos = rows.map(v => {
      const id = extractGDriveId(v.video_url);
      return {
        ...v,
        gdrive_id: id,
        thumbnail_url: id ? `https://drive.google.com/thumbnail?id=${id}&sz=w600` : null
      };
    });
    res.render('index', { videos });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.get('/watch/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM videos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).send('Video not found');
    res.render('watch', { video: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.post('/admin/delete/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM videos WHERE id = ?', [req.params.id]);
    res.redirect('/?admin=true');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.get('/admin/edit/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM videos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).send('Video not found');
    res.render('edit', { video: rows[0], error: null, success: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.post('/admin/edit/:id', async (req, res) => {
  try {
    const { title, description, video_url } = req.body;
    if (!title || !video_url) {
      const [rows] = await pool.query('SELECT * FROM videos WHERE id = ?', [req.params.id]);
      return res.render('edit', { video: rows[0], error: 'Judul dan Link wajib diisi', success: null });
    }
    const embedUrl = extractGDriveEmbedUrl(video_url);
    await pool.query(
      'UPDATE videos SET title = ?, description = ?, video_url = ? WHERE id = ?',
      [title, description || '', embedUrl, req.params.id]
    );
    res.redirect('/?admin=true');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.get('/admin/upload', (req, res) => {
  res.render('upload', { error: null, success: null });
});

router.post('/admin/upload', async (req, res) => {
  try {
    const { title, description, video_url } = req.body;
    if (!title || !video_url) {
      return res.render('upload', { error: 'Judul dan Link video wajib diisi', success: null });
    }
    const embedUrl = extractGDriveEmbedUrl(video_url);
    await pool.query(
      'INSERT INTO videos (title, description, video_url) VALUES (?, ?, ?)',
      [title, description || '', embedUrl]
    );
    res.render('upload', { error: null, success: 'Video berhasil diupload!' });
  } catch (err) {
    console.error(err);
    res.render('upload', { error: 'Gagal menyimpan video', success: null });
  }
});

module.exports = router;
