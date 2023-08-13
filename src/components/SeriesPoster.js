import { useState } from "react";

const SeriesPoster = ({ series, onDelete }) => {
  const [animate, setAnimate] = useState(false);

  const handleDelete = async (seriesId) => {
    setAnimate(true);
    setTimeout(() => onDelete(seriesId), 1000);
  };

  return (
    <div
      key={series.id}
      onClick={() => handleDelete(series.id)}
      className={`eachtvseries ${animate ? 'flip-animation' : ''}`}
    >
      <img src={series.image} alt={series.title} />
    </div>
  );
}

export default SeriesPoster;