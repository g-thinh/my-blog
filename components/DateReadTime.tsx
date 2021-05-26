import { Text } from "theme-ui";
import { format } from "date-fns";
import { calculateReadTime } from "@utils/calculateReadTime";

interface Props {
  date: Date;
  text: any;
}

export const DateReadTime = (props: Props): JSX.Element => {
  return (
    <Text
      as="h2"
      color="grayness"
      sx={{ fontSize: [3, 4], fontFamily: "body" }}
    >
      {format(new Date(props.date), "MMM d, yyyy")} •{"  "}
      {calculateReadTime(props.text)}
    </Text>
  );
};
