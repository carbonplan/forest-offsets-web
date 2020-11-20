import { Box, Link } from "theme-ui";
import { useThemeUI } from "theme-ui";
import { default as NextLink } from "next/link";

const Logo = () => {
  const context = useThemeUI();
  const theme = context.theme;

  return (
    <NextLink href="/" passHref={true}>
      <Link href="/">
        <Box
          sx={{ width: "150px", fill: theme.colors.text, cursor: "pointer" }}
        >
          <svg version="1.1" x="0px" y="0px" viewBox="0 0 151.1 28.8">
            <g>
              <g>
                <path
                  d="M9.7,20.1c-1.3-1.4-2-3.1-2-5.2c0-2.1,0.7-3.9,2-5.2c1.3-1.4,3-2,5.1-2c1.7,0,3.1,0.4,4.3,1.3
        c1.1,0.9,1.8,2.1,2.1,3.5c0,0.1,0,0.2,0,0.3s-0.1,0.2-0.2,0.2h-2.3c-0.2,0-0.3-0.1-0.4-0.2c-0.3-0.8-0.7-1.4-1.3-1.8
        c-0.6-0.4-1.4-0.6-2.2-0.6c-1.3,0-2.3,0.4-3,1.2c-0.8,0.8-1.1,1.9-1.1,3.4c0,1.5,0.4,2.6,1.1,3.4c0.8,0.8,1.8,1.2,3,1.2
        c0.8,0,1.6-0.2,2.2-0.6c0.6-0.4,1.1-1,1.3-1.8c0.1-0.2,0.2-0.2,0.4-0.3H21c0.1,0,0.2,0.1,0.2,0.2c0,0.1,0,0.2,0,0.3
        c-0.3,1.4-1,2.6-2.1,3.5c-1.1,0.9-2.5,1.3-4.3,1.3C12.7,22.1,11,21.4,9.7,20.1z"
                />
              </g>
              <g>
                <path
                  d="M22.5,17.6c0-1.5,0.5-2.6,1.6-3.5c1.1-0.8,2.4-1.2,4.1-1.2c1.1,0,2.4,0.2,3.7,0.6V13c0-0.9-0.3-1.6-0.8-2.1
        c-0.5-0.5-1.2-0.8-2.2-0.8c-1.4,0-2.4,0.6-2.9,1.8c-0.1,0.2-0.2,0.2-0.4,0.2h-2.3c-0.1,0-0.2-0.1-0.2-0.2c0-0.1,0-0.2,0-0.3
        c0.3-1.2,0.9-2.2,1.9-2.9c1-0.8,2.3-1.1,3.8-1.1C30.6,7.6,32,8.1,33,9c1,0.9,1.5,2.2,1.5,3.8V19c0,1.1,0.2,1.9,0.5,2.6
        c0,0.1,0.1,0.1,0.1,0.1c0,0.1-0.1,0.1-0.3,0.1h-2.8c-0.2,0-0.3-0.1-0.3-0.3v-1c-1.1,1.1-2.5,1.6-4.3,1.6c-1.4,0-2.6-0.4-3.6-1.2
        C23,20.1,22.5,19,22.5,17.6z M25.4,17.5c0,0.6,0.2,1.1,0.7,1.5c0.4,0.4,1.1,0.5,1.9,0.5c1.1,0,2-0.3,2.8-0.9
        c0.8-0.6,1.1-1.5,1.1-2.6c-1.3-0.4-2.5-0.6-3.6-0.6c-0.8,0-1.5,0.2-2.1,0.5C25.7,16.3,25.4,16.8,25.4,17.5z"
                />
              </g>
              <g>
                <path
                  d="M37,21.6V8.2c0-0.2,0.1-0.3,0.3-0.3h2.2c0.2,0,0.3,0.1,0.3,0.3v1.1c1-1.1,2.3-1.6,3.7-1.6
        c0.8,0,1.7,0.1,2.5,0.4c0.2,0.1,0.3,0.3,0.3,0.5v2.2c0,0.2-0.1,0.3-0.2,0.3c0,0-0.1,0-0.2-0.1c-1.1-0.5-2-0.8-2.9-0.8
        c-0.9,0-1.7,0.4-2.3,1.1c-0.6,0.7-0.9,1.7-0.9,3v7.3c0,0.2-0.1,0.3-0.3,0.3h-2.2C37.1,21.8,37,21.7,37,21.6z"
                />
              </g>
              <g>
                <path
                  d="M47.6,21.6V2.7c0-0.2,0.1-0.3,0.3-0.3H50c0.2,0,0.3,0.1,0.3,0.3v6.5c1.3-1.1,2.7-1.6,4.3-1.6
        c1.9,0,3.4,0.7,4.6,2c1.1,1.3,1.7,3.1,1.7,5.3c0,2.2-0.6,4-1.7,5.3c-1.1,1.3-2.7,2-4.6,2c-1.8,0-3.2-0.5-4.3-1.6v1
        c0,0.2-0.1,0.3-0.3,0.3h-2.2C47.7,21.8,47.6,21.7,47.6,21.6z M51.2,11.5c-0.7,0.9-1.1,2-1.1,3.3c0,1.4,0.4,2.5,1.1,3.3
        s1.7,1.3,2.9,1.3c1.2,0,2.2-0.4,2.9-1.3c0.7-0.9,1.1-2,1.1-3.3c0-1.4-0.4-2.5-1.1-3.3c-0.7-0.9-1.7-1.3-2.9-1.3
        C52.9,10.2,51.9,10.7,51.2,11.5z"
                />
              </g>
              <g>
                <path
                  d="M64.3,20.1c-1.4-1.4-2.1-3.1-2.1-5.2c0-2.1,0.7-3.9,2.1-5.2c1.4-1.4,3.1-2,5.2-2c2.1,0,3.8,0.7,5.2,2
        c1.4,1.4,2.1,3.1,2.1,5.2c0,2.1-0.7,3.9-2.1,5.2c-1.4,1.4-3.1,2-5.2,2C67.4,22.1,65.7,21.4,64.3,20.1z M66.4,11.5
        c-0.8,0.8-1.2,2-1.2,3.4c0,1.4,0.4,2.5,1.2,3.4s1.9,1.3,3.1,1.3c1.3,0,2.3-0.4,3.1-1.3c0.8-0.8,1.2-2,1.2-3.4
        c0-1.4-0.4-2.5-1.2-3.4c-0.8-0.8-1.9-1.3-3.1-1.3C68.2,10.2,67.2,10.7,66.4,11.5z"
                />
              </g>
              <g>
                <path
                  d="M78.7,21.6V8.2c0-0.2,0.1-0.3,0.3-0.3h2.2c0.2,0,0.3,0.1,0.3,0.3v1.3c1.3-1.2,2.7-1.8,4.4-1.8
        c1.5,0,2.7,0.4,3.5,1.3c0.8,0.9,1.3,2,1.3,3.6v9.1c0,0.2-0.1,0.3-0.3,0.3h-2.2c-0.2,0-0.3-0.1-0.3-0.3v-8.3c0-2-0.9-3.1-2.8-3.1
        c-1.1,0-1.9,0.4-2.7,1.2c-0.7,0.8-1.1,2-1.1,3.5v6.6c0,0.2-0.1,0.3-0.3,0.3h-2.2C78.7,21.8,78.7,21.7,78.7,21.6z"
                />
              </g>
              <g>
                <path
                  d="M101.7,27.1V8.2c0-0.2,0.1-0.3,0.3-0.3h2.2c0.2,0,0.3,0.1,0.3,0.3v1c1.1-1.1,2.5-1.6,4.3-1.6
        c1.9,0,3.4,0.7,4.6,2s1.7,3.1,1.7,5.3c0,2.2-0.6,4-1.7,5.3c-1.1,1.3-2.7,2-4.6,2c-1.5,0-3-0.5-4.3-1.6v6.6c0,0.2-0.1,0.3-0.3,0.3
        H102C101.8,27.3,101.7,27.2,101.7,27.1z M105.3,11.5c-0.7,0.9-1.1,2-1.1,3.3c0,1.4,0.4,2.5,1.1,3.3s1.7,1.3,2.9,1.3
        c1.2,0,2.2-0.4,2.9-1.3c0.7-0.9,1.1-2,1.1-3.3c0-1.4-0.4-2.5-1.1-3.3c-0.7-0.9-1.7-1.3-2.9-1.3C107,10.2,106,10.7,105.3,11.5z"
                />
              </g>
              <g>
                <path
                  d="M117.2,21.6V2.7c0-0.2,0.1-0.3,0.3-0.3h2.2c0.2,0,0.3,0.1,0.3,0.3v18.9c0,0.2-0.1,0.3-0.3,0.3h-2.2
        C117.3,21.8,117.2,21.7,117.2,21.6z"
                />
              </g>
              <g>
                <path
                  d="M122,17.6c0-1.5,0.5-2.6,1.6-3.5c1.1-0.8,2.4-1.2,4.1-1.2c1.1,0,2.4,0.2,3.7,0.6V13c0-0.9-0.3-1.6-0.8-2.1
        c-0.5-0.5-1.2-0.8-2.2-0.8c-1.4,0-2.4,0.6-2.9,1.8c-0.1,0.2-0.2,0.2-0.4,0.2h-2.3c-0.1,0-0.2-0.1-0.2-0.2c0-0.1,0-0.2,0-0.3
        c0.3-1.2,0.9-2.2,1.9-2.9c1-0.8,2.3-1.1,3.8-1.1c1.7,0,3.1,0.5,4.2,1.4s1.5,2.2,1.5,3.8V19c0,1.1,0.2,1.9,0.5,2.6
        c0,0.1,0.1,0.1,0.1,0.1c0,0.1-0.1,0.1-0.3,0.1h-2.8c-0.2,0-0.3-0.1-0.3-0.3v-1c-1.1,1.1-2.5,1.6-4.3,1.6c-1.4,0-2.6-0.4-3.6-1.2
        C122.5,20.1,122,19,122,17.6z M124.9,17.5c0,0.6,0.2,1.1,0.7,1.5c0.4,0.4,1.1,0.5,1.9,0.5c1.1,0,2-0.3,2.8-0.9
        c0.8-0.6,1.1-1.5,1.1-2.6c-1.3-0.4-2.5-0.6-3.6-0.6c-0.8,0-1.5,0.2-2.1,0.5C125.2,16.3,124.9,16.8,124.9,17.5z"
                />
              </g>
              <g>
                <path
                  d="M136.9,21.6V8.2c0-0.2,0.1-0.3,0.3-0.3h2.2c0.2,0,0.3,0.1,0.3,0.3v1.3c1.3-1.2,2.7-1.8,4.4-1.8
        c1.5,0,2.7,0.4,3.5,1.3c0.8,0.9,1.3,2,1.3,3.6v9.1c0,0.2-0.1,0.3-0.3,0.3h-2.2c-0.2,0-0.3-0.1-0.3-0.3v-8.3c0-2-0.9-3.1-2.8-3.1
        c-1.1,0-1.9,0.4-2.7,1.2c-0.7,0.8-1.1,2-1.1,3.5v6.6c0,0.2-0.1,0.3-0.3,0.3h-2.2C137,21.8,136.9,21.7,136.9,21.6z"
                />
              </g>
              <path
                d="M97.6,14.9c0,4.2-0.6,8.3-1.6,12.3c0,0.1-0.1,0.2-0.2,0.2h-2.4c-0.1,0-0.2-0.1-0.2-0.3c1.1-3.9,1.7-8,1.7-12.2
      s-0.6-8.3-1.7-12.2c0-0.1,0.1-0.3,0.2-0.3l2.4,0c0.1,0,0.2,0.1,0.2,0.2C97.1,6.5,97.6,10.6,97.6,14.9z"
              />
              <path
                d="M1.4,14.9C1.4,10.6,2,6.5,3,2.6c0-0.1,0.1-0.2,0.2-0.2l2.4,0c0.1,0,0.2,0.1,0.2,0.3c-1.1,3.9-1.7,8-1.7,12.2
      s0.6,8.3,1.7,12.2c0,0.1-0.1,0.3-0.2,0.3H3.3c-0.1,0-0.2-0.1-0.2-0.2C2,23.2,1.4,19.1,1.4,14.9z"
              />
            </g>
          </svg>
        </Box>
      </Link>
    </NextLink>
  );
};

export default Logo;
