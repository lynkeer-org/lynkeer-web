interface PassContainerProps {
  children: React.ReactNode;
  backgroundColor: string;
  textColor: string;
}

const PassContainer = ({ children, backgroundColor, textColor }: PassContainerProps) => {
  const customProperties = {
    "--pass-bg-color": backgroundColor,
    "--pass-text-color": textColor,
  };

  return (
    <aside id="pass-container" className="flex-col items-center flex">
      <div
        style={customProperties as React.CSSProperties}
        className="flex flex-col w-60 h-80 border rounded-3xl shadow-lg p-3 bg-[var(--pass-bg-color)] text-[var(--pass-text-color)]"
      >
        {children}
      </div>
    </aside>
  );
};

export { PassContainer };
