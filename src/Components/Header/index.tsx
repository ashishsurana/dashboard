interface IHeader {
  title: string;
  children?: React.ReactNode;
}

const Header = ({ title, children }: IHeader) => {
  return (
    <div
      className="flex justify-between content-center"
      data-testid="chart-header"
    >
      <div className="font-bold">{title}</div>

      {children && <div>{children}</div>}
    </div>
  );
};

export default Header;
