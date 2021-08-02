import SyntaxHighlighter from "react-syntax-highlighter";
import nord from "react-syntax-highlighter/dist/cjs/styles/hljs/nord";

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <SyntaxHighlighter
      language="typescript"
      style={nord}
      customStyle={{ padding: "1rem", fontSize: 16, borderRadius: "0.5rem" }}
    >
      {children}
    </SyntaxHighlighter>
  );
}
