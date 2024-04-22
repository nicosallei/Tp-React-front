
import  Instrumento from "../entidades/Instrumento";

export async function getInstrumentoJSONFetch(){
	const urlServer = 'http://localhost:8080/Instrumento/traer-lista';
	
	const response = await fetch(urlServer, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors'
	});
	console.log(response);
	return await response.json();
}

export async function getInstrumentoXIdFetch(id:number){
	const urlServer = 'http://localhost:8080/Instrumento/traer/'+id;
	console.log(urlServer);
	const response = await fetch(urlServer, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors'
	});
	return await response.json() as Instrumento;
}


