import { useState } from 'react';
import { scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { HeatmapRect } from '@visx/heatmap';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

// todo: make this responsive, remove all the hardcoded numbers
const HeatMap = ({ data, stats }) => {
  const [year, setYear] = useState(new Date().getFullYear());

  // todo: get 53 and 7 from data
  const gap = 4;
  const sideLength = 18;
  const width = 53 * sideLength;
  const height = 7 * sideLength;

  const xScale = scaleLinear({
    domain: [0, 53],
    range: [0, width],
  });

  const yScale = scaleLinear({
    domain: [0, 7],
    range: [0, height],
  });

  const colorScale = scaleLinear({
    domain: [0, 200], // ! fix this
    range: ['#11162D', '#00AAFF'],
  });

  const days = ['M', null, 'W', null, 'F', null, 'S'];
  // prettier-ignore
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // * make this work for all years
  const xTickValues = [0, 6, 10, 14, 18, 23, 27, 32, 36, 40, 45, 49];
  const xTickFormat = (_, i) => months[i];

  const yTickValues = [1, 2, 3, 4, 5, 6, 7];
  const yTickFormat = (_, i) => days[i];

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center text-gray-1 pl-8">
        <div className="flex items-center space-x-4">
          {Object.entries(stats).map(([key, value]) => (
            <span key={key}>
              {key}: {value}
            </span>
          ))}
        </div>
        <div className="ml-auto flex space-x-2 items-center">
          <button
            disabled={!Object.keys(data).includes((year - 1).toString())}
            onClick={() => setYear((p) => p - 1)}
            className="disabled:text-gray-700"
          >
            <MdChevronLeft size={28} />
          </button>
          <span className="text-xl font-bold">{year}</span>
          <button
            disabled={!Object.keys(data).includes((year + 1).toString())}
            onClick={() => setYear((p) => p + 1)}
            className="disabled:text-gray-700"
          >
            <MdChevronRight size={28} />
          </button>
        </div>
      </div>
      <svg width={width + 30} height={height + 20}>
        <Group left={30}>
          <HeatmapRect
            data={data[year]}
            bins={(d) => d}
            count={(d) => d}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            binWidth={sideLength}
            binHeight={sideLength}
            gap={gap}
          >
            {(heatmap) =>
              heatmap.map((heatmapBins) =>
                heatmapBins.map((bin) => (
                  <rect
                    key={`rect-${bin.row}-${bin.column}`}
                    width={bin.width}
                    height={bin.height}
                    x={bin.x}
                    y={bin.y}
                    rx={2}
                    ry={2}
                    fill={bin.color || '#050B20'}
                    fillOpacity={bin.opacity}
                  />
                ))
              )
            }
          </HeatmapRect>
          <AxisLeft
            scale={yScale}
            top={-5}
            left={5}
            tickValues={yTickValues}
            tickFormat={yTickFormat}
            hideTicks
            hideAxisLine
            numTicks={7}
            tickLabelProps={() => ({
              dx: '-0.25em',
              dy: '0.25em',
              fill: 'white',
              fontSize: 10,
              textAnchor: 'end',
            })}
          />
          <AxisBottom
            scale={xScale}
            top={height - 10}
            left={8}
            tickValues={xTickValues}
            tickFormat={xTickFormat}
            hideTicks
            hideAxisLine
            numTicks={53}
            tickLabelProps={() => ({
              dy: '0.5em',
              fill: 'white',
              fontFamily: 'Arial',
              fontSize: 10,
              textAnchor: 'middle',
            })}
          />
        </Group>
      </svg>
    </div>
  );
};

export default HeatMap;
