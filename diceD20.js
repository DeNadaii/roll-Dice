
const d20 = document.getElementById("d20");
const rollBtn = document.getElementById("rollBtn");
const result = document.getElementById("result");

const DURACAO_ANIMACAO = 1800;

let rolando = false;

rollBtn.addEventListener("click", () => {
    // Evita iniciar outra rolagem antes de a atual terminar.
    if (rolando) return;

    rolando = true;
    rollBtn.disabled = true;
    result.textContent = "Rolando...";

    // Sorteia um resultado entre 1 e 20.
    const numero = Math.floor(Math.random() * 20) + 1;

    // Mantém várias voltas completas e adiciona uma
    // orientação aleatória ao final da animação.
    const rotacaoX =
        (4 + Math.floor(Math.random() * 3)) * 360 +
        Math.floor(Math.random() * 360);

    const rotacaoY =
        (4 + Math.floor(Math.random() * 3)) * 360 +
        Math.floor(Math.random() * 360);

    const rotacaoZ =
        (1 + Math.floor(Math.random() * 3)) * 360 +
        Math.floor(Math.random() * 360);

    // Reinicia a transição caso uma rolagem anterior
    // tenha deixado o dado em uma orientação diferente.
    d20.style.transition = "none";

    // Lê o estilo para aplicar a reinicialização.
    void d20.offsetWidth;

    d20.style.transition =
        `transform ${DURACAO_ANIMACAO}ms cubic-bezier(0.25, 1, 0.5, 1)`;

    d20.style.transform =
        `rotateX(${rotacaoX}deg) ` +
        `rotateY(${rotacaoY}deg) ` +
        `rotateZ(${rotacaoZ}deg)`;

    // Exibe o resultado ao terminar a animação.
    window.setTimeout(() => {
        result.textContent = `Resultado: ${numero}`;
        rollBtn.disabled = false;
        rolando = false;
    }, DURACAO_ANIMACAO);
});
