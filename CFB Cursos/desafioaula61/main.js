let pessoas = [];

const f_nome = document.querySelector("#f_nome");
const f_idade = document.querySelector("#f_idade");
const btn_add = document.querySelector("#btn_add");
const res = document.querySelector(".res");

const addDivPessoa = () => {
  res.innerHTML = "";
  pessoas.map((p) => {
    const div = document.createElement("div");
    div.setAttribute("class", "pessoa");
    div.innerHTML = `Nome: ${p.getNome()} <br/>Idade: ${p.getIdade()}`;
    res.appendChild(div);
  });
};

btn_add.addEventListener("click", () => {
  const Pessoa = {
    nome:"",
    idade:"",
    getNome: function () {
      return this.nome;
    },
    getIdade: function () {
      return this.idade;
    },
    setNome: function (nome) {
      this.nome = nome;
    },
    setIdade: function (idade) {
      this.idade = idade;
    },
  };
  
  Pessoa.setNome(f_nome.value);
  Pessoa.setIdade(f_idade.value);
  pessoas.push(Pessoa);
  f_nome.value=""
  f_idade.value=""
  f_nome.focus()
  console.log(pessoas)
  addDivPessoa()
});