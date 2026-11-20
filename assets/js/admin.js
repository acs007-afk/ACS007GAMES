const $ = id => document.getElementById(id);
const STORAGE_KEY = 'acs007_games_admin_draft_v1';
let originalGames = [];
let games = [];
const fields = ['title','category','description','url','cover','status','controls'];
const esc = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function saveDraft() { localStorage.setItem(STORAGE_KEY, JSON.stringify(games)); render(); }
function render() {
  $('admin-count').textContent = `${games.length} JOGOS`;
  $('admin-list').innerHTML = games.length ? games.map(g => `<div class="admin-game"><div><strong>${esc(g.title)}</strong><small>${esc(g.category)} · ${esc(g.status)}</small></div><div class="admin-buttons"><button data-edit="${esc(g.id)}" class="mini-btn">EDITAR</button><button data-delete="${esc(g.id)}" class="mini-btn delete">EXCLUIR</button></div></div>`).join('') : '<p class="empty">DATABASE VAZIA.</p>';
}
function clearForm() { $('game-form').reset(); $('game-id').value = ''; $('form-title').textContent = 'NOVO JOGO'; $('form-message').textContent = ''; }
$('game-form').addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(fields.map(key => [key, $(key).value.trim()]));
  data.id = $('game-id').value || `${data.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}-${Date.now().toString().slice(-5)}`;
  if (!data.url.endsWith('.html')) { $('form-message').textContent = 'O caminho do jogo precisa apontar para um arquivo .html.'; return; }
  const index = games.findIndex(g => g.id === data.id);
  if (index >= 0) games[index] = data; else games.push(data);
  saveDraft(); clearForm(); $('form-message').textContent = 'JOGO SALVO NO RASCUNHO LOCAL. Exporte o JSON para publicar.';
});
$('admin-list').addEventListener('click', e => {
  const edit = e.target.dataset.edit; const del = e.target.dataset.delete;
  if (edit) { const game = games.find(g => g.id === edit); if (!game) return; fields.forEach(key => $(key).value = game[key] || ''); $('game-id').value = game.id; $('form-title').textContent = 'EDITAR JOGO'; window.scrollTo({top:0,behavior:'smooth'}); }
  if (del && confirm('Excluir este jogo do rascunho?')) { games = games.filter(g => g.id !== del); saveDraft(); }
});
$('clear-form').addEventListener('click', clearForm);
$('export').addEventListener('click', () => { const blob = new Blob([JSON.stringify(games, null, 2)], {type:'application/json'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'games.json'; a.click(); URL.revokeObjectURL(url); });
$('import').addEventListener('change', async e => { const file = e.target.files[0]; if (!file) return; try { const parsed = JSON.parse(await file.text()); if (!Array.isArray(parsed)) throw new Error(); games = parsed; saveDraft(); $('form-message').textContent = 'Catálogo importado para o rascunho local.'; } catch { alert('Arquivo JSON inválido.'); } e.target.value = ''; });
$('reset').addEventListener('click', () => { if (confirm('Descartar o rascunho local e recarregar o catálogo original?')) { localStorage.removeItem(STORAGE_KEY); games = [...originalGames]; render(); clearForm(); } });
fetch('games.json').then(r => r.json()).then(data => { originalGames = Array.isArray(data) ? data : []; const draft = localStorage.getItem(STORAGE_KEY); games = draft ? JSON.parse(draft) : [...originalGames]; render(); }).catch(() => { $('admin-list').innerHTML = '<p class="empty">Não foi possível carregar games.json.</p>'; });
