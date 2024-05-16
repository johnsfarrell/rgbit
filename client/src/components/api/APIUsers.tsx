import { Flex, Skeleton, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTotalUsers } from "../../utils/api";
import { ViewIcon } from "@chakra-ui/icons";
import { TOTAL_USERS_DESCRIPTION } from "../../utils/desc";

const APIUsers = () => {
  const [total, setTotal] = useState<number | undefined>(undefined);

  useEffect(() => {
    getTotalUsers().then((t: number) => {
      setTotal(t);
    });
  }, []);

  return (
    <Tooltip label={TOTAL_USERS_DESCRIPTION(total)} hasArrow>
      <Skeleton isLoaded={!!total}>
        <Flex alignItems="center" color="gray.400" gap={1.5}>
          {total || "XX"} <ViewIcon />
        </Flex>
      </Skeleton>
    </Tooltip>
  );
};

export default APIUsers;
