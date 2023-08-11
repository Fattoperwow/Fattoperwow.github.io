import React from "react";

import { Text } from "../../primitives/text/text";
import { Flex } from "../../primitives/flex/flex";
import { CgMathPercent } from "react-icons/cg";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getMantraRoleColors,
  getPlayerFavourableRole,
} from "../../../utils/players";

interface Props {
  players?: any;
  settings?: any;
}

export const RoleCostDistributionStat = ({
  players,
  settings,
}: Props) => {

  const chartDataTemplate = {
    POR: { name: "POR", value: 0 },
    DC: { name: "DC", value: 0 },
    DD: { name: "DD", value: 0 },
    DS: { name: "DS", value: 0 },
    M: { name: "M", value: 0 },
    E: { name: "E", value: 0 },
    C: { name: "C", value: 0 },
    W: { name: "W", value: 0 },
    T: { name: "T", value: 0 },
    A: { name: "A", value: 0 },
    PC: { name: "PC", value: 0 },
  };

  const calcChartData = () => {
    let data = { ...chartDataTemplate };
    players.forEach((player) => {
      const role = getPlayerFavourableRole(player.role_mantra).toUpperCase();
      data[role].value = data[role].value + player.owned_amount;
    });

    // Now re-calculate the percentage
    return Object.values(data).map((role) => {
      return {
        ...role,
        value: parseFloat((role.value / settings.budget) * 100).toFixed(2),
      };
    });
  };

  const barColors = [
    getMantraRoleColors["por"],
    getMantraRoleColors["dc"],
    getMantraRoleColors["dd"],
    getMantraRoleColors["ds"],
    getMantraRoleColors["m"],
    getMantraRoleColors["e"],
    getMantraRoleColors["c"],
    getMantraRoleColors["w"],
    getMantraRoleColors["t"],
    getMantraRoleColors["a"],
    getMantraRoleColors["pc"],
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    const tooltipData = payload?.[0]?.payload;
    return (
      <Flex
        css={{
          padding: "$3",
          backgroundColor: "$white",
          borderRadius: "$3",
          border: "1px solid $grey2",
          width: "100px",
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        }}
      >
        <Flex css={{ width: "100%", justifyContent: "space-between" }}>
          <Text>{label}</Text>
          <Text isBold>
            <Flex>
              {tooltipData?.value}
              <CgMathPercent />
            </Flex>
          </Text>
        </Flex>
      </Flex>
    );
  };

  return (
    <ResponsiveContainer height="100%" width="100%">
      <BarChart data={calcChartData()} layout="vertical" barCategoryGap={3}>
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <XAxis
          type="number"
          style={{
            fontFamily:
              "Roboto Custom, -apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif",
          }}
          domain={[0, 100]}
        />
        <YAxis
          type="category"
          width={30}
          dataKey="name"
          tickLine={false}
          style={{
            fontSize: "14px",
            fontFamily:
              "Roboto Custom, -apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif",
          }}
        />
        <CartesianGrid stroke="#f5f5f5" />
        <Bar dataKey="value" fill="#323232" radius={6} height={10} barSize={30}>
          {calcChartData().map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

