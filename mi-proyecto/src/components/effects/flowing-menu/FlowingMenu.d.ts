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

declare const FlowingMenu: React.FC<FlowingMenuProps>;
export default FlowingMenu;

