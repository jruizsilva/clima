const d = document;

import { mostrarAlerta } from "./UI/alert.js";

const $ciudad = d.getElementById("ciudad");
const $formulario = d.getElementById("formulario");
const $result = d.getElementById("result");

const regionNamesInSpanish = new Intl.DisplayNames(["es"], { type: "region" });

const obtenerClima = (ciudad) => {
	const myKey = "d89b7300a6fd78a5b698510fa89d9cc6";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${myKey}&lang=es`;

	fetch(url)
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				return Promise.reject(res);
			}
		})
		.then((datos) => mostrarClima(datos))
		.catch((err) => {
			limpiarHTML();
			const status = err.status || false;
			const statusText = err.text || false;
			if (!status && !statusText) {
				mostrarAlerta("La ciudad ingresada no es valida");
				return;
			}
			const messageError = `Error ${err.status}: ${err.statusText}`;
			mostrarAlerta(messageError);
		});
};
const mostrarClima = (datos) => {
	limpiarHTML();
	const { name: city } = datos;
	const { country: codeCountry } = datos.sys;
	const { temp, temp_max, temp_min } = datos.main;
	const { description, icon } = datos.weather[0];

	const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

	const $templateClima = d.getElementById("templateClima").content;
	const country = regionNamesInSpanish.of(codeCountry.toUpperCase());

	$templateClima.getElementById(
		"clima__city"
	).textContent = `${city} - ${country}`;
	$templateClima.getElementById("clima__img").setAttribute("src", iconURL);
	$templateClima.getElementById("clima__description").textContent =
		description;
	$templateClima.getElementById("clima__temp").textContent = `${Math.round(
		temp
	)}°C`;
	$templateClima.getElementById(
		"clima__temp-min"
	).textContent = `${Math.round(temp_min)}°C`;
	$templateClima.getElementById(
		"clima__temp-max"
	).textContent = `${Math.round(temp_max)}°C`;

	const clone = $templateClima.cloneNode(true);

	$result.appendChild(clone);
};
const limpiarHTML = () => {
	while ($result.firstChild) {
		$result.removeChild($result.firstChild);
	}
};

$formulario.addEventListener("submit", (e) => {
	e.preventDefault();
	const ciudad = $ciudad.value;
	obtenerClima(ciudad);
});
