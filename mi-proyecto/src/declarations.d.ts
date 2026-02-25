declare module "./components/FlowingMenu" {
  export interface FlowingMenuProps {
    items?: Array<{
      link: string;
      text: string;
      image: string;
    }>;
    speed?: number;
    textColor?: string;
    bgColor?: string;
    marqueeBgColor?: string;
    marqueeTextColor?: string;
    borderColor?: string;
  }

  const FlowingMenu: React.FC<FlowingMenuProps>;
  export default FlowingMenu;
}

declare module "*/FlowingMenu" {
  export * from "./components/FlowingMenu";
    export { default } from "./components/FlowingMenu";
}