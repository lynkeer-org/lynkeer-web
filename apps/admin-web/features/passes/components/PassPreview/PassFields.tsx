import "./styles.css";

const PassFields = () => {
  return (
    <div id="pass-fields" className="pass-fields">
      <p className="flex flex-col">
        <span className="text-[10px]">SELLOS</span>
        <span className="">1</span>
      </p>

      <p className="flex flex-col">
        <span className="text-[10px]">PREMIOS GANADOS</span>
        <span className="text-right">0</span>
      </p>
    </div>
  );
};

export { PassFields };
