import { Text } from "theme-ui";
import { format } from "date-fns";
import { calculateReadTime } from "@utils/calculateReadTime";

interface Props {
  date: Date;
  text: any;
}

export const DateReadTime = (props: Props): JSX.Element => {
  return (
    <Text as="h2" color="grayness" sx={{ fontSize: [2, 3] }}>
      {format(new Date(props.date), "MMM d, yyyy")} •{"  "}
      {calculateReadTime(props.text)}
    </Text>
  );
};
