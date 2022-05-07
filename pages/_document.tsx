import Document from "next/document";
import { ServerStyleSheet } from "styled-components";
import React from "react";
import Head from "next/head";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <Head>
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-PMZJ3N9JGY"
              />

              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-PMZJ3N9JGY', { page_path: window.location.pathname });
                  `,
                }}
              />
            </Head>
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
