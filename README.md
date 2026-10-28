# 🥑 iFood GenAI Assistant | Portfólio de Candidatura (Estágio)

Aplicação web de demonstração que ajuda a decidir o que pedir: a pessoa descreve o que está com vontade de comer ou informa ingredientes, e a inteligência artificial sugere pratos em português. O projeto foi desenvolvido como uma experiência inspirada no ecossistema do iFood e utiliza a Vercel para hospedar a interface e a função de API.

## ✨ Funcionalidades

- Campo para informar desejos ou ingredientes.
- Geração de sugestões de pratos com o Google Gemini.
- Estado de carregamento e apresentação de mensagens de erro.
- Chave da API mantida no servidor, em uma variável de ambiente, em vez de exposta no navegador.
- Validação no servidor: texto obrigatório e limite de 300 caracteres.

## 🧰 Tecnologias e versões

| Tecnologia | Uso no projeto | Versão identificável |
|---|---|---|
| HTML | Estrutura da página | HTML5 (`<!DOCTYPE html>`); versão específica não fixada |
| CSS | Estilos e layout responsivo | CSS3; versão específica não fixada |
| JavaScript | Interação da interface, módulos e chamadas HTTP | ES modules, `async`/`await` e Fetch API; versão/target não configurado |
| Node.js | Runtime da função serverless da Vercel | Não especificada no repositório |
| Vercel | Hospedagem e execução da função `/api/suggestions` | Plataforma utilizada; versão/CLI não especificada |
| Google Gemini API | Geração das sugestões por REST | API `v1beta`; modelo informado no código: `gemini-3.8-flash` |

O projeto não inclui `package.json`, dependências npm ou configuração de versão do Node.js. Por isso, não há versões de pacotes ou do runtime que possam ser confirmadas pelo repositório. A chamada à Gemini usa `fetch` diretamente; o SDK Google GenAI não é utilizado.

## 🧠 Como funciona

1. A interface em `index.html` recebe o texto da pessoa.
2. `js/script.js` envia o conteúdo em uma requisição `POST` para `/api/suggestions`.
3. `api/suggestions.js` valida a entrada e chama a API Gemini usando a variável de ambiente `GEMINI_API_KEY`.
4. A função retorna as sugestões à interface, que as exibe sem interpretar a resposta como HTML.

## 📁 Estrutura do projeto

```text
.
├── api/
│   └── suggestions.js  # Função serverless que consulta o Gemini
├── css/
│   └── style.css       # Estilos da aplicação
├── js/
│   └── script.js       # Interação e consumo da API
└── index.html          # Página principal
```

## 🚀 Executar e publicar na Vercel

1. Importe este repositório como um projeto na Vercel.
2. Nas configurações do projeto, adicione a variável de ambiente `GEMINI_API_KEY` com uma chave válida do Google Gemini. Configure-a para os ambientes em que pretende executar a aplicação.
3. Publique o projeto. A Vercel serve a página estática e disponibiliza `api/suggestions.js` como a rota `/api/suggestions`.
4. Acesse o endereço publicado e informe o que deseja comer.

Não configure a chave no JavaScript do navegador nem a envie ao repositório. Sem `GEMINI_API_KEY` no ambiente da função, as sugestões não poderão ser geradas.

## 🗺️ Contexto do projeto

O projeto explora como IA generativa pode reduzir a indecisão na escolha de uma refeição. A interface recebe uma intenção simples — por exemplo, um prato desejado ou ingredientes disponíveis — e solicita à IA exatamente três sugestões curtas e apetitosas.

**Conceitos aplicados:** consumo de API REST, funções serverless, variáveis de ambiente, validação de entrada, comunicação assíncrona e estados de carregamento/erro na interface.

## 🔭 Sugestões de melhorias

- **Aprimorar acessibilidade e interação:** permitir enviar com Enter, desabilitar o botão durante a geração e anunciar carregamento e resultados para leitores de tela.
- **Personalizar as sugestões:** incluir filtros opcionais para preferências e restrições alimentares, como vegetariano, vegano ou sem lactose.
- **Preparar para evolução:** adicionar testes para validação da API e estados da interface, além de limitar requisições para evitar uso abusivo do endpoint.

## ✉️ Contato

- **LinkedIn:** [Izabella Pereira Sarmento](https://www.linkedin.com/in/izabellapsar/)
- **E-mail:** [izabellapsarmento@hotmail.com](mailto:izabellapsarmento@hotmail.com)
