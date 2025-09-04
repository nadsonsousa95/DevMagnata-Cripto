# 📊 DevMagnata Cripto

Aplicação em **React + Vite + TypeScript** para visualizar em tempo real preços, volume e market cap de criptomoedas.  
Fornece listagem, detalhes das moedas e gráfico de evolução de preços.

---

## 🚀 Tecnologias utilizadas
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [Recharts](https://recharts.org/) (gráficos de preço)
- [CoinCap API](https://docs.coincap.io/) (dados de criptomoedas)

---

## 📦 Instalação e execução

```bash
# Clonar repositório
git clone https://github.com/nadsonsousa95/DevMagnata-Cripto.git

# Entrar na pasta
cd DevMagnata-Cripto

# Instalar dependências
npm install

# Rodar aplicação
npm run dev
```

---

### 🔑 Configuração da API Key

- Este projeto consome a CoinCap API que requer uma chave de autenticação.
- Crie um arquivo .env na raiz do projeto
- Adicione a sua chave no formato:

```bash
VITE_COINCAP_API_KEY=sua_chave_aqui
```

### ⚠️ Atenção:

- O prefixo VITE_ é obrigatório em projetos com Vite para expor a variável no código.
- O arquivo .env não deve ser commitado no GitHub (já está listado no .gitignore).
- Cada pessoa que for rodar o projeto deve criar o próprio .env.
- No código, você acessa a chave assim:

```bash
const apiKey = import.meta.env.VITE_COINCAP_API_KEY;
```

- Exemplo de uso na requisição:

```bash
const url = `https://rest.coincap.io/v3/assets?limit=10&apiKey=${apiKey}`;
```

### 📊 Funcionalidades

+ ✅ Listagem das principais criptomoedas
+ ✅ Detalhes de cada moeda
+ ✅ Atualização periódica dos dados
+ ✅ Gráficos de preço (24h)
+ ✅ Responsividade

