import { Skeleton, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTotalImages, getTotalUsers } from "../../utils/api";
import { TOTAL_USERS_DESCRIPTION } from "../../utils/desc";

const APICounts = () => {
  const [totalUsers, setTotalUsers] = useState<number | undefined>(undefined);
  const [totalImages, setTotalImages] = useState<number | undefined>(undefined);

  useEffect(() => {
    getTotalUsers().then((t: number) => {
      setTotalUsers(t);
    });
    getTotalImages().then((t: number) => {
      setTotalImages(t);
    });
  }, []);

  return (
    <Tooltip label={TOTAL_USERS_DESCRIPTION} hasArrow>
      <Skeleton isLoaded={!!totalUsers && !!totalImages} color="gray.400">
        {totalUsers}.{totalImages}
      </Skeleton>
    </Tooltip>
  );
};

export default APICounts;
