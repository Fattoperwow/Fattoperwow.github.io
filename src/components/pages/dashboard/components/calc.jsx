import { useState } from "react";
import { Flex } from "../../../primitives/flex/flex";
import { Input } from "../../../primitives/input/input";
import { Text } from "../../../primitives/text/text";
import { BiCoinStack } from "react-icons/bi";
import { TbPercentage } from "react-icons/tb";

export const PercentageCalculator = ({ budget }) => {
  const [mln, setMln] = useState(null);
  const [percentage, setPercentage] = useState(null);

  const fromMlnToPerc = (mln, budget) => {
    if (!mln) {
      return 0;
    }
    return ((parseFloat(mln) / (parseFloat(budget)) * 100).toFixed(2));
  };

  const fromPercToMln = (percentage, budget) => {
    if (!percentage) {
      return 0;
    }
    return ((parseFloat(percentage) / 100) * budget).toFixed(0);
  };

  return (
    <div>
      <Text size="xlarge" css={{ marginBottom: "20px" }}>
        Calcolo percentuale
      </Text>

      <Text size="large" css={{ marginBottom: "10px", marginTop: "30px" }}>
        Crediti in precentuale
      </Text>
      <Flex css={{'@bp2max': {display: 'block'}}}>
        <div>
          <Input
            placeholder="Crediti"
            value={mln}
            css={{ width: "100px" }}
            onChange={(e) => setMln(e.target.value)}
            type="number"
            max={budget}
            min={0}
            suffix={<BiCoinStack size={18} />}
          />
        </div>

        <Flex css={{marginLeft: '8px'}}>
          <Text>{`Su ${budget} `} </Text>
          <Text>
            <BiCoinStack />
          </Text>
          <Text css={{marginLeft: '8px'}}>{`sono il`}</Text>
        </Flex>

        <Flex css={{marginLeft: '8px'}}>
          <Text isBold>{fromMlnToPerc(mln, budget)}</Text>
          <Text isBold>
            <TbPercentage />
          </Text>
        </Flex>
      </Flex>

      <Text size="large" css={{ marginBottom: "10px", marginTop: "30px" }}>
        Precentuale in crediti
      </Text>
      <Flex css={{'@bp2max': {display: 'block'}}} >
        <div>
          <Input
            placeholder="Percentuale"
            value={percentage}
            css={{ width: "100px" }}
            onChange={(e) => setPercentage(e.target.value)}
            type="number"
            max={100}
            min={0}
            suffix={<TbPercentage size={18} />}
          />
        </div>
        <Flex css={{marginLeft: '8px'}}>
          <Text>{`Su ${budget}`}</Text>
          <Text>
            <BiCoinStack />
          </Text>
          <Text css={{marginLeft: '8px'}}>sono circa</Text>
        </Flex>
        <Flex css={{marginLeft: '8px'}}>
          <Text isBold>{`${fromPercToMln(percentage, budget)}`}</Text>
          <Text isBold>
            <BiCoinStack />
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};
