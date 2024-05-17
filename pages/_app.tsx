import LayoutInterno from "@/components/layout/layot_general";
import CollapsedMenuLayout from "@/contexts/collapsed";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CollapsedMenuLayout>
      <LayoutInterno>
        <Component {...pageProps} />;
      </LayoutInterno>
    </CollapsedMenuLayout>
  );
}
