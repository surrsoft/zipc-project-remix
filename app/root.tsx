import {
  Links, LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";

import globalStylesUrl from "./styles/global.css";
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: {
      a: {
        color: 'red.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
    components: {
      Link: {
        baseStyle: {
          color: 'red.500'
        }
      }
    }
  },
});

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: globalStylesUrl
    },
  ];
};

export const meta: MetaFunction = () => {
  return {title: "cvxn-project"};
};

export default function App() {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <Meta/>
      <Links/>
    </head>
    <body>
    <ChakraProvider theme={theme}>
      <Outlet/>
    </ChakraProvider>
    <ScrollRestoration/>
    <Scripts/>
    {process.env.NODE_ENV === "development" && <LiveReload/>}
    </body>
    </html>
  );
}
