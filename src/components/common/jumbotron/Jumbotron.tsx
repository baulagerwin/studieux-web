interface Props {
  label: string;
  x: number;
  y: number;
  imagePath: string;
}

function Jumbotron({ label, x, y, imagePath }: Props) {
  return (
    <div
      className="jumbotron"
      style={{
        backgroundImage: `linear-gradient(
        45deg,
        rgba(256, 256, 256, 1),
        rgba(69, 60, 103, 0.4)
      ), url(${imagePath})`,
        backgroundPosition: `${x}% ${y}%`,
      }}
    >
      <div className="jumbotron__label">
        <h1>{label}</h1>
      </div>
    </div>
  );
}

export default Jumbotron;
