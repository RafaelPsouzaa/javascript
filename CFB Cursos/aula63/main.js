const f_tipoMilitar = document.querySelector("#f_tipoMilitar");
const f_tiponormal = document.querySelector("#f_tipoNormal");
const f_blindagem = document.querySelector("#f_blindagem");
const f_municao = document.querySelector("#f_municao");
const f_nome = document.querySelector("#f_nome");
const f_portas = document.querySelector("#f_portas");
const carros = document.querySelector("#carros");
const btn_addCarro = document.querySelector("#btn_addCarro");
let a_carros = [];

  const removerCarros = (quem)=>{

       a_carros = a_carros.filter((el)=>{
        return el.nome !=quem
      })
  }

f_tipoMilitar.addEventListener("click", (evt) => {
  f_nome.value ="";
  f_portas.value =0;
  f_blindagem.value = 0;
  f_municao.value = 0;
  f_blindagem.removeAttribute("disabled");
  f_municao.removeAttribute("disabled");
});
f_tiponormal.addEventListener("click", (evt) => {
  f_nome.value = "";
  f_portas.value =0;
  f_blindagem.value = 0;
  f_municao.value = 0;
  f_blindagem.setAttribute("disabled","disabled");
  f_municao.setAttribute("disabled","disabled");
});

const gerenciarCarros = () => {
  carros.innerHTML = "";
  
    a_carros.forEach((c) => {
      
    const div = document.createElement("div");
    const btn =document.createElement("button");
    div.setAttribute("class", "carro");
    div.setAttribute("data-nome", c.nome);
    div.innerHTML = `Nome:${c.nome} <br/>`;
    div.innerHTML += `Portas:${c.portas} <br/>`;
    div.innerHTML += `Cor:${c.cor} <br/>`;
    btn.innerHTML = "remover";
    btn.addEventListener("click",(evt)=>{
      const elementoAserRemovido = evt.target.parentNode.dataset.nome;
      removerCarros(elementoAserRemovido);
      gerenciarCarros();
    })
    carros.appendChild(div);
    div.appendChild(btn);
  });

};

btn_addCarro.addEventListener("click", () => {
  if (f_tiponormal.checked) {
    const c = new Carro(f_nome.value, f_portas.value);
    a_carros.push(c);
  }else{
    const c = new Militar(f_nome.value, f_portas.value,f_blindagem.value,f_municao.value);
    a_carros.push(c)
  }
  
  gerenciarCarros();
});

class Carro {
  constructor(nome, portas) {
    this.nome = nome;
    this.portas = portas;
    this.ligado = false;
    this.vel = 0;
    this.cor = undefined;
  }
  ligar = function () {
    this.ligado = true;
  };
  desligar = function () {
    this.ligado = false;
  };
  setCor = function (cor) {
    this.cor = cor;
  };
}

class Militar extends Carro {
  constructor(nome, portas, blindagem, municao,cor) {
    super(nome, portas,cor);
    this.blindagem = blindagem;
    this.municao = municao;
   this.cor = "Verde";
  }
  
  atirar = function () {
    if (this.municao > 0) {
      this.municao--;
    }
  };
}
