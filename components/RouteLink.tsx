import Link from 'next/link';
import { Text } from 'theme-ui';

interface Props {
  href: string;
  index: number;
}

export const RouteLink: React.FC<Props> = ({ href, index, ...props }) => {
  return (
    <Link href={href} passHref>
      <Text
        as="a"
        px={[3, 4]}
        tabIndex={index}
        sx={{
          color: 'text',
          textDecoration: 'none',
          fontSize: [2, 3],
          cursor: 'pointer',
          '&:hover': {
            color: 'primary',
          },
          '&:focus': {
            color: 'primary',
          },
        }}
      >
        {props.children}
      </Text>
    </Link>
  );
};
