<h1 align="center">
<a href="http://www.amitmerchant.com/electron-markdownify"><img src="https://raw.githubusercontent.com/mcosta21/ecoleta-nlw/master/ecoleta-banner.png" alt="Ecoleta"/></a>
</h1>

<h4 align="center">Projeto Next Level Week da  <a href="https://rocketseat.com.br/" target="_blank">Rocketseat</a>.</h4>

<p align="center">
  <a href="#projeto">Projeto</a> •
  <a href="#layout">Layout</a> •
  <a href="#tech">Tecnologias</a> •
  <a href="#como_usar">Como usar</a> •
  <a href="#backend">Back End</a> •
  <a href="#frontend">Fron End</a> •
  <a href="#mobile">Mobile</a> •
  <a href="#contribuir">Contribuir</a> •
  <a href="#licenca">Licença</a> 
</p>

<br/>

<h2 id="projeto">
:recycle: Projeto
</h2>

O escopo do projeto foi constituido na separação de responsabilidades, resultado em três partes:

:one: `Back End (Denominado como server)`
    
:two: `Front End (Denominado como web)`
    
:three: `Mobile (Denominado como mobile)`

<br/>

<h2 id="layout">
:flower_playing_cards: Layout
</h2>

Confira o layout do projeto no [Figma](https://www.figma.com/file/1SxgOMojOB2zYT0Mdk28lB/Ecoleta).

<br/>

<h2 id="tech">
:rocket: Tecnologias
</h2>

Basicamente, este projeto foi desenvolvimento com as seguintes tencologias:
<br/>

<strong>

* [Node.js](https://nodejs.org/)

* [TypeScript](https://www.typescriptlang.org/)

* [React JS](https://reactjs.org/)

* [React Native](https://reactnative.dev/)

* [Expo](https://expo.io/)
</strong>

<br/>

<h2 id="como_usar">
:arrow_forward: Como usar
</h2>

Para clonar e rodar a aplicação, você vai precisar ter instalado em seu computador as seguintes ferramentas: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (Que dispõe do [npm](http://npmjs.com)). Além disso, recomendo a utilização do [VSCode](https://code.visualstudio.com/) como editor de código.

<h3 id="backend">
:bookmark_tabs: Iniciar o Back End 
</h3>

```bash
# Clonar o repositório
$ git clone https://github.com/mcosta21/ecoleta-nlw.git

# Acessa a pasta do backend
$ cd ecoleta-nlw/server

# Instalar as dependências
$ npm install

# Instalar Migrates
$ npm knex:migrate

# Instalar Seeds
$ npm knex:seed

# Iniciar a aplicação
$ npm run dev
```

<h3 id="frontend">
:computer: Iniciar o Front End 
</h3>

```bash
# Clonar o repositório
$ git clone https://github.com/mcosta21/ecoleta-nlw.git

# Acessa a pasta do fronend
$ cd ecoleta-nlw/web

# Instalar as dependências
$ npm install

# Iniciar a aplicação
$ npm start

# Aplicação rodando na porta 3000
```

<h3 id="mobile">
:iphone: Iniciar o Mobile 
</h3>

```bash
# Clonar o repositório
$ git clone https://github.com/mcosta21/ecoleta-nlw.git

# Acessa a pasta do mobile
$ cd ecoleta-nlw/mobile

# Instalar as dependências
$ npm install

# Iniciar a aplicação
$ npm start

```

<h4 id="obs">
Observações 
</h4>
   
1. O expo irá iniciar automaticamente no browser em localhost:19002, então basta escanear o qrcode disponibilizado.
    
2. Seu computador e smartphone devem estar na mesma rede, ou seja devem estar no mesmo range de IP.
    
3. Caso o expo não esteja conectando com a aplicação, tente criar excessões no firewall informado a porta (19000, 19002), ou desabilite o antivírus da máquina temporariamente. Se persistir após a inativação do antivírus, verifique se Windows Defender Firewall está ativado.
   
<br/>

<h2 id="contribuir">
:thumbsup: Como contribuir
</h2>

1. Faça um fork do projeto.
2. Crie uma nova branch com as suas alterações: git checkout -b my-feature
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: git commit -m "feature: My new feature"
4. Envie as suas alterações: git push origin my-feature

> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://github.com/firstcontributions/first-contributions)
<br/>

<h2 id="licenca">
:pencil: Licença
</h2>

Este projeto está sob a licença MIT.

> Desenvolvido por [Marcio Costa](https://www.linkedin.com/in/marcio-costa-03131a149/).
<br/>
