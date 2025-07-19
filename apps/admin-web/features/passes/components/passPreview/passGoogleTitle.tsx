interface PassGoogleTitleProps {
  title: string;
}

const PassGoogleTitle = ({ title }: PassGoogleTitleProps) => {
  return (
    <div>
      <p className="font-[sans-serif] text-lg">{title ? title : "Nombre de la tarjeta"}</p>
    </div>
  );
};

export { PassGoogleTitle };
