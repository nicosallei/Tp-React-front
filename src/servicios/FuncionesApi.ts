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
  return await response.json();
}

export async function getInstrumentoXIdFetch(id: number) {
  const urlServer = "http://localhost:8080/Instrumento/traer/" + id;
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
  return await response.json();
}

export async function saveInstrumento(
  instrumento?: Instrumento,
  imagen?: File
) {
  let urlServer = "http://localhost:8080/Instrumento/guardar";
  let method: string = "POST";
  if (instrumento && instrumento.id > 0) {
    urlServer =
      "http://localhost:8080/Instrumento/actualizar/" + instrumento.id;
    method = "PUT";
  }

  const formData = new FormData();
  // Solo agregamos las propiedades necesarias del instrumento al FormData
  formData.append(
    "instrumento",
    JSON.stringify({
      id: instrumento?.id,
      instrumento: instrumento?.instrumento,
      marca: instrumento?.marca,
      modelo: instrumento?.modelo,
      descripcion: instrumento?.descripcion,
      precio: instrumento?.precio,
      costoEnvio: instrumento?.costoEnvio,
      cantidadVendida: instrumento?.cantidadVendida,
      categoria: instrumento?.categoria,
    })
  );

  if (imagen) {
    formData.append("imagen", imagen);
  }

  const response = await fetch(urlServer, {
    method: method,
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
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

export async function getPedidosPorMesAnio() {
  const response = await fetch("http://localhost:8080/Pedido/filtro-mes-anio");
  return await response.json();
}

export async function getPedidosPorInstrumento() {
  const response = await fetch(
    "http://localhost:8080/Pedido/filtro-instrumento"
  );
  return await response.json();
}

export async function descargarPdf(id: number, nombreInstrumento: string) {
  const randomQueryParameter = new Date().getTime();
  const urlServer = `http://localhost:8080/PDF/descarga/${id}?rand=${randomQueryParameter}`;
  const response = await fetch(urlServer, {
    method: "GET",
    headers: {
      "Content-Type": "application/pdf",
    },
  });

  if (!response.ok) {
    throw new Error("Error al descargar el PDF");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const fecha = new Date();
  const fechaFormateada = `${fecha.getDate()}-${
    fecha.getMonth() + 1
  }-${fecha.getFullYear()}`;
  link.setAttribute("download", `${nombreInstrumento}(${fechaFormateada}).pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export async function descargarExcel(fechaDesde: string, fechaHasta: string) {
  const urlServer = `http://localhost:8080/Excel/download/excel?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`;

  const response = await fetch(urlServer, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al descargar el archivo Excel");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;

  // Formatear las fechas en el formato dd-mm-yyyy
  const fechaDesdeFormateada = new Date(fechaDesde).toLocaleDateString("es-ES");
  const fechaHastaFormateada = new Date(fechaHasta).toLocaleDateString("es-ES");

  // Incluir las fechas en el nombre del archivo
  a.download = `pedidos(${fechaDesdeFormateada}-${fechaHastaFormateada}).xlsx`;

  document.body.appendChild(a); // Necesario para Firefox
  a.click();
  a.remove(); // Necesario para Firefox
}
