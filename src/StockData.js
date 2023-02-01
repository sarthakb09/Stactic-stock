import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

const API_KEY = "UK9DPDXDOG4PF4C4";

const StockData = () => {
  const [searchTerm, setSearchTerm] = useState("MSFT");
  const [interval, setInterval] = useState("5min");
  const [data, setData] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const svgRef = useRef();
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("height", window.innerHeight * 0.7)
      .attr("width", 800);

    // const svgRef = useRef(null);

    const zoom = d3.zoom().on("zoom", () => {
      d3.select(svgRef.current)
        .node()
        .setAttribute("transform", d3.event.transform);
    });

    svg.call(zoom);

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d, i) => i * 10)
      .attr("y", (d) => d.close)
      .attr("height", (d) => d.open - d.close)
      .attr("width", 8)
      .attr("fill", (d) => (d.open > d.close ? "red" : "green"));
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${searchTerm}&interval=${interval}&apikey=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(
          Object.entries(data[`Time Series (${interval})`]).map(
            ([time, values]) => ({
              time,
              open: +values["1. open"],
              high: +values["2. high"],
              low: +values["3. low"],
              close: +values["4. close"]
            })
          )
        );
        console.log(data);
      });
  };

  const handleAddToPortfolio = () => {
    setPortfolio([...portfolio, searchTerm]);
  };

  const zoom = d3.zoomIdentity;

  const handleZoomIn = () => {
    // d3.select(svgRef.current).transition().call(d3.zoom().scaleBy, 2);
    d3.select(svgRef.current).transition().call(zoom.scaleBy, 2);
  };

  const handleZoomOut = () => {
    // d3.select(svgRef.current).transition().call(d3.zoom().scaleBy, 0.5);
    d3.select(svgRef.current).transition().call(zoom.scaleBy, 0.5);
  };

  const handleSelectStock = (event) => {
    setSelectedStock(event.target.value);
    setSearchTerm(event.target.value);
  };

  return (
    // <div
    //   style={{
    //     background: "black",
    //     height: "100vh",
    //     border: "solid 1px orange(158, 151, 151)"
    //   }}
    //   className="StockData bg-gray-100 p-4 flex flex-col justify-center"
    // >
    //   <form className="mb-4" onSubmit={handleSubmit}>
    //     <select
    //       style={{ background: "black", color: "orange" }}
    //       className="border rounded p-2 mx-2"
    //       value={interval}
    //       onChange={(e) => setInterval(e.target.value)}
    //     >
    //       <option value="1min">1min</option>
    //       <option value="5min">5min</option>
    //       <option value="15min">15min</option>
    //       <option value="30min">30min</option>
    //       <option value="60min">60min</option>
    //     </select>
    //     <input
    //       style={{ background: "black", color: "orange" }}
    //       className="border rounded p-2"
    //       type="text"
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //     />

    //     <button
    //       style={{ background: "orange" }}
    //       className="bg-blue-500 text-white rounded p-2"
    //     >
    //       Search
    //     </button>

    //     <button
    //       type="button"
    //       onClick={handleAddToPortfolio}
    //       style={{ background: "orange", marginLeft: "5%" }}
    //       className="bg-green-500 text-white rounded p-2 ml-2"
    //     >
    //       Add to Portfolio
    //     </button>
    //     <select
    //       className="border rounded p-2 mb-4"
    //       value={selectedStock}
    //       onChange={handleSelectStock}
    //       style={{ background: "black", color: "orange" }}
    //     >
    //       {portfolio.map((p) => (
    //         <option value={p}>{p}</option>
    //       ))}
    //     </select>
    //   </form>
    //   <div style={{ display: "flex", justifyContent: "space-around" }}>
    //     <div style={{ color: "orange" }} className="mb-4">
    //       High: {data.length > 0 ? data[0].high : 0}
    //     </div>
    //     <div style={{ color: "orange" }} className="mb-4">
    //       Low: {data.length > 0 ? data[0].low : 0}
    //     </div>
    //   </div>
    //   {/* <select
    //     className="border rounded p-2 mb-4"
    //     value={selectedStock}
    //     onChange={handleSelectStock}
    //     style={{ background: "black", color: "orange" }}
    //   >
    //     {portfolio.map((p) => (
    //       <option value={p}>{p}</option>
    //     ))}
    //   </select> */}
    //   <div className="zoom-buttons">
    //     <button
    //       onClick={handleZoomIn}
    //       style={{ background: "orange" }}
    //       className="bg-blue-500 text-white rounded p-2 mr-2"
    //     >
    //       +
    //     </button>
    //     <button
    //       onClick={handleZoomOut}
    //       style={{ background: "orange" }}
    //       className="bg-blue-500 text-white rounded p-2"
    //     >
    //       -
    //     </button>
    //   </div>
    //   <svg ref={svgRef} />
    // </div>
    <div
      style={{
        background: "black",
        height: "100vh",
        border: "solid 1px orange(158, 151, 151)"
      }}
      className="StockData bg-gray-100 p-4 flex flex-col justify-center"
    >
      <form className="mb-4" onSubmit={handleSubmit}>
        <select
          style={{ background: "black", color: "orange" }}
          className="border rounded p-2 mx-2"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        >
          <option value="1min">1min</option>
          <option value="5min">5min</option>
          <option value="15min">15min</option>
          <option value="30min">30min</option>
          <option value="60min">60min</option>
        </select>
        <input
          style={{ background: "black", color: "orange" }}
          className="border rounded p-2"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          style={{ background: "orange" }}
          className="bg-blue-500 text-white rounded p-2"
          type="submit"
        >
          Search
        </button>
        <button
          style={{ background: "orange" }}
          className="bg-blue-500 text-white rounded p-2 ml-2"
          onClick={handleAddToPortfolio}
        >
          Add to Portfolio
        </button>
      </form>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ color: "orange" }} className="mb-4">
          High: {data.length > 0 ? data[0].high : 0}
        </div>
        <div style={{ color: "orange" }} className="mb-4">
          Low: {data.length > 0 ? data[0].low : 0}
        </div>
      </div>

      <div className="mb-4">
        <select
          style={{ background: "black", color: "orange" }}
          className="border rounded p-2"
          value={selectedStock}
          onChange={handleSelectStock}
        >
          <option value="">Select Stock</option>
          {portfolio.map((stock) => (
            <option key={stock} value={stock}>
              {stock}
            </option>
          ))}
        </select>
      </div>

      <svg ref={svgRef} />

      <div className="flex justify-between">
        <button
          style={{ background: "orange" }}
          className="bg-blue-500 text-white rounded p-2"
          onClick={handleZoomIn}
        >
          Zoom In
        </button>
        <button
          style={{ background: "orange" }}
          className="bg-blue-500 text-white rounded p-2"
          onClick={handleZoomOut}
        >
          Zoom Out
        </button>
      </div>
    </div>
  );
};
export default StockData;