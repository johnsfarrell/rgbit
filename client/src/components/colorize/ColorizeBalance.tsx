import { Button, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getBalance } from "../../utils/api";
import { millisecondsToMMSS } from "../../utils/time";
import { BALANCE_DESCRIPTION } from "../../utils/desc";
import { Props } from "../../utils/constants";

const ColorizeBalance = ({ props }: Props) => {
  const [countdown, setCoundown] = useState<number>(0);

  useEffect(() => {
    // Get remaining refresh time from API
    async function setRefreshTime() {
      try {
        const { refresh } = await getBalance();
        const time = new Date(refresh).getTime() - new Date().getTime();
        setCoundown(time);
      } catch (e: any) {
        console.error(e.message);
      }
    }

    setRefreshTime();

    // Decrement countdown every second
    const intervalId = setInterval(() => {
      setCoundown(countdown => Math.max(0, countdown - 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [props]);

  return (
    <Tooltip label={BALANCE_DESCRIPTION} hasArrow>
      <Button
        size="xs"
        pos="fixed"
        left="50%"
        transform="translateX(-50%)"
        bottom={countdown > 0 ? 12 : -10}
        transition="all 0.2s"
        fontFamily="monospace"
        gap={1}
      >
        {millisecondsToMMSS(countdown)}
      </Button>
    </Tooltip>
  );
};

export default ColorizeBalance;
