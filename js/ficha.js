const ATTR = { for: 1, des: 4, con: 1, int: 3, esp: 0 };
const PROF = 3;

// [nome, atributo, treinada]
const SKILLS = [
  ["Acrobacia","des",0],["Adestrar","esp",0],["Arcanismo","int",1],["Atletismo","for",0],
  ["Atuar","esp",0],["Conhecimento","int",1],["Diplomacia","esp",0],["Fortitude","con",0],
  ["Furtividade","des",1],["Iniciativa","des",0],["Intimidação","esp",0],["Intuição","int",0],
  ["Investigação","int",1],["Ladinagem","des",0],["Luta","for",0],["Medicina","int",1],
  ["Montaria","des",0],["Ofício (Alquimia)","int",1],["Percepção","esp",1],["Pontaria","des",1],
  ["Reflexo","des",0],["Religião","int",0],["Sobrevivência","int",1],["Vontade","esp",1]
];

// Magias do Alquimista. q = quantidade inicial
const SPELLS = [
  { id:"enraizar", n:"Enraizar", c:1, t:"Reflexo", q:0, d:"Cria uma área de 6x6 m. Quem falhar no teste fica enraizado e pode fazer testes de Força a cada turno para se soltar. Enquanto enraizado, o alvo tem movimento 0." },
  { id:"paralisar", n:"Paralisar", c:2, t:"Vontade", q:0, d:"O alvo atingido faz um teste de Vontade ou fica paralisado por 1 minuto. Ele não pode se mover nem realizar ações físicas, mas fica consciente." },
  { id:"mage-armor", n:"Mage Armor", c:2, t:"", q:0, d:"Uma camada protetora que lembra madeira aumenta sua Armadura em 3 pontos por 10 minutos. Não tem efeito em quem usa armadura média ou pesada." },
  { id:"granada-fogo", n:"Granada de Fogo", c:0, t:"", q:0, d:"1d10 de dano de fogo." },
  { id:"granada-fumaca", n:"Granada de Fumaça", c:1, t:"", q:0, d:"Névoa de 6 m ao redor. Todos os alvos têm desvantagem em testes que dependam de percepção." },
  { id:"pocao-cura", n:"Poção de Cura", c:0, t:"", q:0, d:"Recupera 1d6+1 PV." },
  { id:"bomba-acido", n:"Bomba de ácido", c:1, t:"", q:1, d:"O alvo sofre 2d4 de dano ácido e fica coberto de ácido, sofrendo 1d4 de dano ácido por rodada até usar uma ação para limpar ou remover o ácido." },
  { id:"elixir-sensorial", n:"Elixir sensorial", c:2, t:"", q:0, d:"Duração de uma cena. Quem ingerir tem vantagem em testes de percepção." },
  { id:"pocao-medo", n:"Poção do Medo", c:2, t:"Vontade", q:0, d:"Cria uma pequena nuvem em volta do alvo acertado. Se falhar no teste de Vontade, o alvo fica com medo de você até o fim do próximo turno." },
  { id:"oleo-fogo", n:"Óleo de fogo", c:0, t:"", q:0, d:"Imbui armas e materiais. O objeto fica coberto em chamas e causa 1d6 de dano de fogo." },
  { id:"elixir-fogo", n:"Elixir de resistência a fogo", c:2, t:"", q:0, d:"Duração de 5 minutos, deve ser ingerido. Qualquer dano de fogo contra você é reduzido à metade." },
  { id:"pocao-sono", n:"Poção do sono", c:1, t:"", q:0, d:"O alvo que ingerir cai em sono profundo por 1 minuto. Acorda ao fim do efeito, se alguém usar uma ação para acordá-lo ou se sofrer dano." }
];

const KEY = "ficha-cao-negro";
const defaults = { hp: 30, hpt: 0, pm: 19, ph: 1, q: Object.fromEntries(SPELLS.map(s => [s.id, s.q])) };
let state = defaults;
try { state = { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

let selected = SPELLS[0].id;
let message = "";
const $ = (id) => document.getElementById(id);

// recursos
for (const k of ["hp", "hpt", "pm", "ph"]) {
  $(k).value = state[k];
  $(k).addEventListener("input", () => { state[k] = Math.max(0, +$(k).value || 0); save(); renderSpells(); });
}

// perícias
$("skills-body").innerHTML = SKILLS.map(([n, a, t]) =>
  `<tr class="${t ? "trained" : ""}"><td>${n}</td><td>${a.toUpperCase()}</td><td>${t ? "✓" : ""}</td><td>${ATTR[a] + (t ? PROF : 0)}</td></tr>`
).join("");

// magias
function renderSpells() {
  $("spell-list").innerHTML = SPELLS.map(s =>
    `<li><button type="button" data-id="${s.id}" aria-pressed="${s.id === selected}"><span>${s.n}</span><span class="cost">${s.c} PM</span></button></li>`
  ).join("");
  const s = SPELLS.find(x => x.id === selected);
  $("spell-detail").innerHTML = `
    <h3>${s.n}</h3>
    <p>${s.d}</p>
    <p><b>Custo:</b> ${s.c} PM${s.t ? ` &nbsp; <b>Teste:</b> ${s.t}` : ""}</p>
    <div class="row">
      <label>Quantidade <input type="number" id="qty" min="0" value="${state.q[s.id]}"></label>
      <button type="button" class="use" id="use" ${state.pm < s.c ? "disabled" : ""}>Usar</button>
      <span>PM atual: ${state.pm}</span>
    </div>
    <p class="log">${message}</p>`;
}

$("spell-list").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-id]");
  if (!b) return;
  selected = b.dataset.id; message = ""; renderSpells();
  $("spell-list").querySelector(`[data-id="${selected}"]`).focus();
});

$("spell-detail").addEventListener("input", (e) => {
  if (e.target.id === "qty") { state.q[selected] = Math.max(0, +e.target.value || 0); save(); }
});

$("spell-detail").addEventListener("click", (e) => {
  if (e.target.id !== "use") return;
  const s = SPELLS.find(x => x.id === selected);
  if (state.pm < s.c) return;
  state.pm -= s.c;
  if (state.q[s.id] > 0) state.q[s.id]--;
  $("pm").value = state.pm;
  message = `Usou ${s.n}${s.c ? ` (-${s.c} PM)` : ""}.`;
  save(); renderSpells();
  $("use").focus();
});

renderSpells();
