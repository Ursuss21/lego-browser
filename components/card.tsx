import React, { FunctionComponent } from "react";
import Link from "next/link";

interface IProps {
  path: string;
  num: string;
  img_url: string;
  name: string;
}

const Card: FunctionComponent<IProps> = ({ path, num, img_url, name }) => {
  return (
    <Link href={`${path}${num}`} key={num}>
      <div className="card">
        <div className="card-miniature">
          {img_url !== null ? (
            <img src={img_url} alt={name} />
          ) : (
            <img src="/src/noimage.png" alt={name} />
          )}
        </div>
        <div className="card-text">
          <p>
            {name}
            <span>{num}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
