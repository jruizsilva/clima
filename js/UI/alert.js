const d = document;

export const mostrarAlerta = (msj) => {
	const $result = d.getElementById("result");
	const $templateAlerta = d.getElementById("templateAlerta").content;
	$templateAlerta.querySelector(".alerta").textContent = msj;

	const clone = $templateAlerta.cloneNode(true);

	$result.appendChild(clone);
};
