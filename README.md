# 🥑 iFood GenAI Assistant | Portfólio de Candidatura (Estágio)

Este repositório contém um **Assistente Inteligente de Cardápios** desenvolvido para o ecossistema do iFood. O projeto combina tecnologias web modernas de front-end com inteligência artificial generativa, conectando-se diretamente à API do Google Gemini para resolver a indecisão dos usuários na hora de escolher uma refeição.

---

## 🛠️ Tecnologias e Ferramentas
* **Front-end:** HTML5, CSS3 (iFood UI/UX Design System Semântico) e JavaScript Assíncrono (ES6+)
* **Inteligência Artificial:** Google GenAI SDK (`gemini-2.5-flash`)
* **Conceitos Aplicados:** Engenharia de Prompt, Consumo de APIs REST, Manipulação de DOM e UX focada em conversão

---

## 💡 O Projeto: Assistente de Cardápio Inteligente

### • O Problema
Um dos maiores desafios no ecossistema de delivery é o "paradoxo da escolha": usuários que passam longos minutos navegando pelo aplicativo do iFood sem saber o que pedir, gerando fadiga e abandono de carrinho.

### • A Solução
Uma aplicação web interativa que simula uma funcionalidade nativa do iFood. O usuário insere um desejo ou os ingredientes que possui em mente, e uma IA generativa atua como um *Sommelier de Delivery*, sugerindo 3 combinações de pratos altamente personalizadas e persuasivas em tempo real.

### • Engenharia de Prompt Aplicada
A lógica no JavaScript utiliza um prompt de sistema estruturado para garantir que a IA mantenha o tom de voz da marca iFood:
> *"Você é o assistente de Inteligência Artificial do iFood... Seja simpático, use emojis e escreva de forma curta e apetitosa."*

---

## 📂 Arquitetura do Projeto
* `index.html`: Estrutura semântica da aplicação.
* `css/style.css`: Estilização e identidade visual baseada no ecossistema iFood.
* `js/script.js`: Integração com o SDK do Gemini, controle de estados de Loading e requisições assíncronas.

---

## 📈 Próximos Passos de Evolução
* Migrar a lógica da API Key para uma Serverless Function (Node.js) para garantir a segurança das credenciais em produção.
* Adicionar suporte para filtros de restrições alimentares (Vegano, Sem Glúten, Zero Lactose).
* Integrar com APIs mockadas de restaurantes para exibir pratos reais com base na sugestão da IA.

---

## ✉️ Contato e Links
* **LinkedIn:** https://www.linkedin.com/in/izabellapsar/
* **E-mail:** izabellapsarmento@hotmail.com
