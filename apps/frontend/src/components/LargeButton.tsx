interface LargeButtonProps {
  title: string;
  onClick?: () => unknown;
}
const LargeButton: React.FC<LargeButtonProps> = ({ title, onClick }) => {
  return (
    <button className="LargeButton" onClick={onClick}>
      {title}
    </button>
  );
};

export default LargeButton;
