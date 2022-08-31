import type { CSSProperties, FC } from "react";
import "./index.module.less";
interface IconProps {
  /**类型 */
  type: string;
  /**大小 */
  size?: number;
  /**颜色 */
  color?: string;
  /**style */
  className?: CSSProperties;
  /**鼠标手势 */
  cursor?: "initial" | "pointer";
}
const HIcon: FC<IconProps> = (props) => {
  const { type, color, size = 14, className = "", cursor = "initial" } = props;
  return (
    <span
      className={`iconfont ${type} ${className}`}
      style={{ color: color, fontSize: size, cursor: cursor }}
    ></span>
  );
};

export default HIcon;
