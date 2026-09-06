const https = require('https');

https.get('https://www.ayana.com/_astro/Layout.astro_astro_type_script_index_0_lang.HwOGnScL.js', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Search around 'js_fv_slider'
    const idx = data.indexOf('js_fv_slider');
    console.log('Index of js_fv_slider:', idx);
    if (idx !== -1) {
      console.log('--- SURROUNDING CODE ---');
      console.log(data.substring(idx - 1000, idx + 2000));
    }
  });
});
