import { useLoaderData } from '@remix-run/react';
import { CvxnCrdelem } from '~/elems/CvxnCrdelem';
import { crdelems } from '~/elems/CvxnCrdelemApiFNS';

import cardsStyles from "~/styles/cardsStyles.css";

export const links = () => {
  return [{ rel: "stylesheet", href: cardsStyles }];
};

export const loader = async () => {
  return crdelems()
}

export default function CardsCMP() {
  const crdelems0 = useLoaderData()
  return (<div className="crdelemsCls">
    {crdelems0.map((el: CvxnCrdelem) => (<div className="crdelemCls">
      <div className="crdelemCls_title">{el.title}</div>
      <div className="crdelemCls_id">{el.id}</div>
    </div>))}
  </div>)
}
