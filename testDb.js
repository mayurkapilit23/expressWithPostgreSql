const pool = require('./db');

(async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('DB Time:', res.rows[0]);
    } catch (err) {
        console.error('❌ DB connection error:', err);
    } finally {
        pool.end();
    }
})();
