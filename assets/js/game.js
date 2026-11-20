const params = new URLSearchParams(location.search);
const id = params.get('id');
const root = document.querySelector('#game-detail');
const esc = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
fetch('games.json').then(r => { if (!r.ok) throw new Error(); return r.json(); }).then(games => {
  const game = games.find(item => item.id === id);
  if (!game) { root.innerHTML = '<div class="empty">JOGO NÃO ENCONTRADO. <a href="index.html">VOLTAR À BIBLIOTECA</a></div>'; return; }
  document.title = `${game.title} // ACS007 GAMES`;
  root.innerHTML = `<div class="game-intro"><div><p class="eyebrow">/// GAME FILE // ${esc(game.category)}</p><h1>${esc(game.title)}</h1><p>${esc(game.description)}</p><p class="game-controls"><strong>CONTROLES:</strong> ${esc(game.controls || 'Consulte as instruções dentro do jogo.')}</p></div><span class="game-status">${esc(game.status || 'Disponível')}</span></div>${game.status === 'Disponível' ? `<div class="player-wrap"><div class="player-bar"><span>ACS007 // GAME PLAYER</span><a href="${esc(game.url)}" target="_blank" rel="noopener">ABRIR EM NOVA ABA ↗</a></div><iframe class="game-frame" src="${esc(game.url)}" title="${esc(game.title)}" allow="fullscreen; gamepad" loading="lazy"></iframe></div>` : '<div class="empty">ESTE JOGO AINDA ESTÁ EM DESENVOLVIMENTO.</div>'}`;
}).catch(() => { root.innerHTML = '<div class="empty">ERRO AO CARREGAR O JOGO. TENTE NOVAMENTE.</div>'; });
