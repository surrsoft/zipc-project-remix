import { Outlet } from '@remix-run/react';

import cardsStyles from "~/styles/cardsStyles.css";

export const links = () => {
  return [{rel: "stylesheet", href: cardsStyles}];
};

export default function CardsCMP() {
  return (
    <div className="cardsWindowMrk">
      <div className="cardsPageMrk">
        <Outlet/>
      </div>
    </div>
  )
}
