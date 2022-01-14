import { crdelems } from '~/elems/CvxnCrdelemApiFNS';
import { CvxnCrdelem } from '~/elems/CvxnCrdelem';
import { Link, useLoaderData } from '@remix-run/react';

export const loader = async () => {
  return crdelems()
}

export default function CardsCMP() {
  const crdelems0 = useLoaderData()
  return (
    <div className="crdelemsAPageMrk">
      <div className="title">Карточки</div>
      <div className="buttons">
        <Link to="/cards/card_create">создать</Link>
      </div>
      <div className="crdelemsMrk">
        {crdelems0.map((el: CvxnCrdelem) => (<div className="crdelemMrk">
          <div className="crdelemMrk_title">{el.title}</div>
          <div className="crdelemMrk_id">{el.id}</div>
        </div>))}
      </div>
    </div>
  )
}
