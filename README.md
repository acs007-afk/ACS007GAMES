# ACS007 GAMES
Portal estático de jogos HTML5, feito com HTML, CSS e JavaScript puro para GitHub Pages.

## Testar localmente
Abra a pasta no VS Code. Recomendado: extensão Live Server e clique em **Go Live** no `index.html`. Também pode usar Python: `python -m http.server 8000` e acessar `http://localhost:8000`.

> Não abra diretamente por `file://`: `fetch('games.json')` pode ser bloqueado pelo navegador.

## Publicar no GitHub Pages
1. Crie um repositório público chamado `acs007-games`.
2. Envie todos os arquivos e pastas desta pasta para a raiz do repositório.
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Selecione **main** e **/(root)** e salve.
6. Aguarde a publicação. O endereço será `https://SEU-USUARIO.github.io/acs007-games/`.

## Adicionar um jogo
1. Coloque os arquivos do jogo em uma pasta dentro de `games/`, por exemplo `games/meu-jogo/index.html`.
2. Abra `admin.html` no site ou localmente pelo Live Server.
3. Preencha o formulário. O caminho deve ser relativo à raiz do site, por exemplo `games/meu-jogo/index.html`.
4. Clique em **Salvar jogo** e depois em **Exportar games.json**.
5. Substitua o `games.json` do projeto pelo arquivo baixado.
6. Envie a alteração ao GitHub. O jogo aparecerá na biblioteca após a atualização do Pages.

## Limitações e segurança
- GitHub Pages é hospedagem estática: não há banco de dados, autenticação ou upload de jogos no servidor.
- O painel é um editor local de catálogo. O rascunho fica no armazenamento local do navegador e só vira público após exportar e enviar o JSON ao GitHub.
- Não use senhas, tokens de acesso do GitHub ou chaves de API no HTML/JavaScript.
- O campo de jogo espera um arquivo HTML que funcione no navegador. Jogos com arquivos adicionais devem manter seus caminhos relativos corretos.
- Para jogos maiores, hospede arquivos em outro serviço estático e use um link HTTPS no catálogo; respeite licenças e direitos autorais.

## Estrutura
- `index.html`: portal e biblioteca
- `game.html`: página individual com player
- `admin.html`: painel local para gerenciar o catálogo
- `games.json`: catálogo público
- `assets/`: CSS e JavaScript
- `games/`: jogos HTML5
