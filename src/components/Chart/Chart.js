import "./Chart.css";

import ChartBar from "./ChartBar";

const Chart = (props) => {
  const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value)
  const totalYearExpense = dataPointValues.reduce((acc, curr) => acc + curr)

	return (
		<div className="chart">
			{props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
					value={dataPoint.value}
          total={totalYearExpense}
					label={dataPoint.label}
				/>
			))}
		</div>
	);
};

export default Chart;
