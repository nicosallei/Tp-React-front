import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import MenuOpciones from "./MenuOpciones";
import {
  getPedidosPorMesAnio,
  getPedidosPorInstrumento,
} from "../servicios/FuncionesApi";

const ChartsGoogle = () => {
  const [barChartData, setBarChartData] = useState<(string | number)[][]>([
    ["Mes", "Pedidos"],
  ]);
  const [pieChartData, setPieChartData] = useState<(string | number)[][]>([
    ["Instrumento", "Pedidos"],
  ]);

  useEffect(() => {
    // Obtén los datos para el gráfico de barras
    getPedidosPorMesAnio().then((data) => {
      let groupedData: { [key: string]: number } = {};

      Object.entries(data).forEach(([key, value]) => {
        if (groupedData[key]) {
          groupedData[key] += Number(value);
        } else {
          groupedData[key] = Number(value);
        }
      });

      // Ordena los datos por mes y año
      const sortedData = Object.entries(groupedData).sort();

      // Convierte los datos a formato de gráfico
      const chartData = sortedData.map(([key, value]) => [key, Number(value)]);

      // Reemplaza los datos existentes en lugar de agregar a ellos
      setBarChartData([["Mes", "Pedidos"], ...chartData]);
    });

    // Obtén los datos para el gráfico de pastel
    getPedidosPorInstrumento().then((data) => {
      const chartData = Object.entries(data).map(([key, value]) => [
        key,
        Number(value),
      ]);
      setPieChartData([["Instrumento", "Pedidos"], ...chartData]);
    });
  }, []);

  return (
    <div>
      <MenuOpciones></MenuOpciones>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={barChartData}
        options={{
          title: "Cantidad de pedidos por mes",
          chartArea: { width: "50%" },
          hAxis: {
            title: "Total de pedidos",
            minValue: 0,
          },
          vAxis: {
            title: "Mes",
          },
        }}
      />
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={pieChartData}
        options={{
          title: "Pedidos por instrumento",
        }}
      />
    </div>
  );
};

export default ChartsGoogle;
