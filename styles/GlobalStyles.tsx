import { css, Global, GlobalProps } from '@emotion/react';

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

const GlobalStyles = (props: GlobalProps) => (
  <Global
    {...props}
    styles={css`
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
      html {
        box-sizing: border-box;
      }
      html,
      body,
      div,
      span,
      applet,
      object,
      iframe,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      a,
      abbr,
      acronym,
      address,
      big,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      s,
      samp,
      small,
      strike,
      strong,
      sub,
      sup,
      tt,
      var,
      b,
      u,
      i,
      center,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      embed,
      figure,
      figcaption,
      footer,
      header,
      hgroup,
      menu,
      nav,
      output,
      ruby,
      section,
      summary,
      time,
      mark,
      audio,
      video,
      textarea {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;

        vertical-align: baseline;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
          sans-serif;
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 10px;
        }
      }

      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      a {
        font-weight: 400;
      }

      /* HTML5 display-role reset for older browsers */
      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      menu,
      nav,
      section {
        display: block;
      }
      body {
        line-height: 1.6;
      }
      ol,
      ul {
        list-style: none;
      }
      blockquote,
      q {
        quotes: none;
      }
      blockquote:before,
      blockquote:after,
      q:before,
      q:after {
        content: '';
        content: none;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }

      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 0.3rem 0.5rem;
        border: 1px solid rgba(145, 145, 145, 0.5);
        font-size: 1rem;
        line-height: 1.6;
        border-radius: 12px;
        cursor: pointer;
        width: 8rem;
        text-align: center;
        outline: none;
      }
      option {
        text-align: center;
      }
    `}
  />
);

export default GlobalStyles;
