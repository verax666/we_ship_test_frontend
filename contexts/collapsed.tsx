import {  createContext, useState } from "react";

export const COLLAPSED_MENU_LAYOUT = createContext<any>({
  todos: [],
  dispatch: () => {},
});

export default function CollapsedMenuLayout({ children }: any) {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <COLLAPSED_MENU_LAYOUT.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </COLLAPSED_MENU_LAYOUT.Provider>
  );
}
