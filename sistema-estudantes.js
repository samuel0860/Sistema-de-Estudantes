const estudantes = [];

function calcularMedia(notas) {
  return notas.reduce((acc, n) => acc + n, 0) / notas.length;
}

function statusAluno(media) {
  if (media >= 7) return "✅ Aprovado";
  if (media >= 5) return "⚠️ Recuperação";
  return "❌ Reprovado";
}

document
  .getElementById("formEstudante")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const idade = parseInt(document.getElementById("idade").value);
    const notasInput = document
      .getElementById("notas")
      .value.split(",")
      .map((n) => parseFloat(n.trim()));

    if (
      !nome ||
      isNaN(idade) ||
      notasInput.some((n) => isNaN(n) || n < 0 || n > 10)
    ) {
      document.getElementById("resultado").innerHTML =
        "❌ Dados inválidos. Verifique os campos.";
      return;
    }

    const media = calcularMedia(notasInput);
    const estudante = { nome, idade, notas: notasInput, media };

    estudantes.push(estudante);
    atualizarTabela();

    document.getElementById(
      "resultado"
    ).innerHTML = `✅ Estudante ${nome} cadastrado com sucesso!`;
    document.getElementById("formEstudante").reset();
  });

function atualizarTabela() {
  const tbody = document.querySelector("#tabela tbody");
  tbody.innerHTML = "";

  estudantes.forEach((est) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${est.nome}</td>
      <td>${est.idade}</td>
      <td>${est.notas.join(", ")}</td>
      <td>${est.media.toFixed(2)}</td>
      <td>${statusAluno(est.media)}</td>
    `;
    tbody.appendChild(row);
  });
}
