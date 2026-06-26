# ComputSpace

Landing page desenvolvida para apresentar o ComputSpace, uma proposta de site
voltada para ajudar usuarios a montar ou melhorar computadores de forma mais
simples, organizada e segura.

O projeto foi criado com React, TypeScript e Vite, publicado na Netlify e conta
com formulario de contato protegido por Google reCAPTCHA.

## Funcionalidades

- Pagina inicial com apresentacao do projeto
- Secao de solucoes para montagem de computadores
- Cards explicando compatibilidade, consumo de energia e sugestao por perfil
- Carrossel de depoimentos ficticios com imagens, comentarios e estrelas
- Secao de planos
- Formulario de contato com validacao de e-mail e mensagem
- Protecao contra bots usando Google reCAPTCHA
- Envio de e-mail por uma funcao serverless da Netlify
- Layout responsivo para diferentes tamanhos de tela

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- CSS
- Netlify
- Netlify Functions
- Nodemailer
- Google reCAPTCHA

## Estrutura Principal

```txt
src/
  components/
    Header.tsx
    Solutions.tsx
    Testimonials.tsx
    Pricing.tsx
    ContactForm.tsx
    Footer.tsx
  pages/
    Home.tsx
  styles/
    *.css

netlify/
  functions/
    send-email.ts
```

## Como Rodar Localmente

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Build

Para gerar a versao final do projeto:

```bash
npm run build
```

## Lint

Para verificar problemas no codigo:

```bash
npm run lint
```

## Formulario de Contato

O formulario valida os dados no front-end antes do envio:

- e-mail obrigatorio
- formato valido de e-mail
- mensagem obrigatoria
- mensagem com pelo menos 10 caracteres
- reCAPTCHA marcado

Depois disso, os dados sao enviados para a funcao:

```txt
/.netlify/functions/send-email
```

A funcao serverless valida o token do reCAPTCHA no servidor e, se estiver tudo
correto, envia o e-mail usando Nodemailer.

## Variaveis de Ambiente

Para o formulario funcionar no deploy, e necessario configurar as variaveis de
ambiente na Netlify:

```env
VITE_RECAPTCHA_SITE_KEY=chave_publica_do_recaptcha
RECAPTCHA_SECRET_KEY=chave_secreta_do_recaptcha
GMAIL_USER=email_do_gmail
GMAIL_PASS=senha_de_app_do_gmail
```

A chave `VITE_RECAPTCHA_SITE_KEY` pode ser usada no navegador, pois e uma chave
publica. As variaveis `RECAPTCHA_SECRET_KEY`, `GMAIL_USER` e `GMAIL_PASS` devem
ficar apenas no ambiente da Netlify.

## Deploy

O deploy foi feito na Netlify. O arquivo `netlify.toml` define:

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"
```

## Observacao

Os depoimentos do carrossel sao ficticios e foram criados apenas para simular
avaliacoes dentro da landing page.
