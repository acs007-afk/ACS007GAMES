const grid = document.querySelector('#game-grid');
const search = document.querySelector('#search');
const filters = document.querySelector('#filters');
let games = [];
let activeFilter = 'Todos';

function safeText(value = '') { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function renderGames() {
  const term = search.value.trim().toLowerCase();
  const visible = games.filter(game => (activeFilter === 'Todos' || game.category === activeFilter) && `${game.title} ${game.description} ${game.category}`.toLowerCase().includes(term));
  document.querySelector('#game-count').textContent = `${visible.length.toString().padStart(2,'0')} RESULTADOS`;
  if (!visible.length) { grid.innerHTML = '<div class="empty">NENHUM JOGO ENCONTRADO // TENTE OUTRA BUSCA</div>'; return; }
  grid.innerHTML = visible.map(game => `<article class="game-card"><a class="cover ${game.cover ? 'has-cover' : ''}" href="game.html?id=${encodeURIComponent(game.id)}" ${game.cover ? `style="background-image:url('${safeText(game.cover)}')"` : ''}><span class="cover-code">ACS007<br>GAME FILE</span><span class="cover-symbol">${safeText(game.title.slice(0,2).toUpperCase())}</span><span class="cover-status">${safeText(game.status || 'Disponível')}</span></a><div class="card-body"><div class="card-meta"><span>${safeText(game.category)}</span><span>/// ACS007</span></div><h3>${safeText(game.title)}</h3><p>${safeText(game.description)}</p><a class="card-link" href="game.html?id=${encodeURIComponent(game.id)}">ABRIR JOGO <span>↗</span></a></div></article>`).join('');
}
filters.addEventListener('click', e => { const button = e.target.closest('button[data-filter]'); if (!button) return; activeFilter = button.dataset.filter; filters.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === button)); renderGames(); });
search.addEventListener('input', renderGames);
fetch('games.json').then(r => { if (!r.ok) throw new Error('Não foi possível carregar games.json'); return r.json(); }).then(data => { games = Array.isArray(data) ? data : []; renderGames(); }).catch(() => { grid.innerHTML = '<div class="empty">ERRO AO CARREGAR O CATÁLOGO. CONFIRA O ARQUIVO games.json.</div>'; document.querySelector('#game-count').textContent = 'OFFLINE'; });
