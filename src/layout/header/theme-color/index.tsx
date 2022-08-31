import { Input } from "antd";

const ThemeColor = () => {
  return (
    <Input
      type="color"
      style={{ padding: 0, width: "30px", height: "20px" }}
      value={"#ee4042"}
    />
  );
};

export default ThemeColor;
