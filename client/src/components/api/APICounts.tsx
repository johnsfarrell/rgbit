import { Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTotalImages, getTotalUsers } from "../../utils/api";

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
    <Skeleton
      isLoaded={!!totalUsers && !!totalImages}
      color="gray.400"
      display={{ base: "none", md: "block" }}
    >
      {totalUsers} {totalImages}
    </Skeleton>
  );
};

export default APICounts;
