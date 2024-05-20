import Categoria from "../entidades/Categoria";
import Instrumento from "../entidades/Instrumento";
import PreferenceMP from "../entidades/mercadoPago/PreferenceMP";
import Pedido from "../entidades/Pedido";

export async function getInstrumentoJSONFetch() {
  const urlServer = "http://localhost:8080/Instrumento/traer-lista";

  const response = await fetch(urlServer, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  console.log(response);
  return await response.json();
}

export async function getInstrumentoXIdFetch(id: number) {
  const urlServer = "http://localhost:8080/Instrumento/traer/" + id;
  console.log(urlServer);
  const response = await fetch(urlServer, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  return (await response.json()) as Instrumento;
}

export async function deleteInstrumentoXId(id: number) {
  const urlServer = "http://localhost:8080/Instrumento/borrar/" + id;
  await fetch(urlServer, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
}

export async function getInstrumentoXBusqueda(termino: String) {
  let urlServer = "http://localhost:8080/Instrumento/buscar/" + termino;
  let response = await fetch(urlServer, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  console.log(response);
  return await response.json();
}

export async function getCategoriaxIdFetch(id: number) {
  const urlServer = "http://localhost:8080/Categoria/traer/" + id;
  const response = await fetch(urlServer, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  return (await response.json()) as Categoria;
}

export async function getCategoriaDataBaseJson() {
  const urlServer = "http://localhost:8080/Categoria/traer-lista";
  const response = await fetch(urlServer, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  console.log(response);
  return await response.json();
}

export async function saveInstrumento(instrumento?: Instrumento) {
  let urlServer = "http://localhost:8080/Instrumento/guardar";
  let method: string = "POST";
  if (instrumento && instrumento.id > 0) {
    urlServer = "http://localhost:8080/Instrumento/actualizar";
    method = "PUT";
  }
  await fetch(urlServer, {
    method: method,
    body: JSON.stringify(instrumento),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getCategoriaXCodigo(codigo: number) {
  const urlServer = "http://localhost:8080/Categoria/traerxcodigo/" + codigo;
  const response = await fetch(urlServer, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  return (await response.json()) as Categoria;
}

export async function realizarPedido(pedido: Pedido) {
  try {
    const response = await fetch("http://localhost:8080/Pedido/cargar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    });

    if (!response.ok) {
      throw new Error("Error al realizar el pedido");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createPreferenceMP(pedido?: Pedido) {
  let urlServer = "http://localhost:8080/MercadoPago/crear_preference_mp";
  let method: string = "POST";
  const response = await fetch(urlServer, {
    method: method,
    body: JSON.stringify(pedido),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await response.json()) as PreferenceMP;
}

export async function traerPedido(codigo: number) {
  const urlServer = "http://localhost:8080/Pedido/traer/" + codigo;
  const response = await fetch(urlServer, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  });
  return (await response.json()) as Pedido;
}
