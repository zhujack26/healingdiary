import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const ArcProgressBar = ({ progress }) => {
  const barWidth = 200;
  const barHeight = 20;
  const progressWidth = progress * barWidth;

  return (
    <Svg width={barWidth} height={barHeight}>
      <Path
        d={`M0,0 L${barWidth},0 L${barWidth},${barHeight} L0,${barHeight} L0,${
          barHeight / 2
        } Q${progressWidth},${barHeight / 2} ${progressWidth},0 L0,0`}
        fill="#007AFF"
      />
    </Svg>
  );
};

export default ArcProgressBar;
