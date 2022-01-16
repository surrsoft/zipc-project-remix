import { crdelems } from '~/elems/CvxnCrdelemApiFNS';
import { CvxnCrdelem } from '~/elems/CvxnCrdelem';
import { Link, useLoaderData, useNavigate } from '@remix-run/react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { EnRoute, uniPathCreate } from '~/utils';

export const loader = async () => {
  return crdelems()
}

function CardFCC({el}: { el: CvxnCrdelem }) {
  const navigate = useNavigate()
  const clickHandle = (el1: CvxnCrdelem) => () => {
    navigate(uniPathCreate([EnRoute.CARDS, EnRoute.CARD_EDIT, el1.id]))
  }

  return (
    <div className="crdelemMrk">
      <div className="crdelemMrk_title">{el.title}</div>
      <div className="crdelemMrk_id">{el.id}</div>
      <div className="buttons">
        <Tooltip placement={'top'} label={'редактировать'}>
          <IconButton size="xs" aria-label='create' icon={<EditIcon/>} onClick={clickHandle(el)}/>
        </Tooltip>
      </div>
    </div>
  )
}

export default function CardsCMP() {
  const navigate = useNavigate()
  const crdelems0 = useLoaderData()

  function clickHandle() {
    navigate(uniPathCreate([EnRoute.CARDS, EnRoute.CARD_CREATE]))
  }

  return (
    <div className="crdelemsAPageMrk">
      <div className="title">Карточки</div>
      <div className="buttons">
        <Tooltip placement={'top'} label={'создать'}>
          <IconButton aria-label='create' icon={<AddIcon/>} onClick={clickHandle}/>
        </Tooltip>
      </div>
      <div className="crdelemsMrk">
        {/* LOOP */}
        {crdelems0.map((el: CvxnCrdelem) => (<CardFCC key={el.id} el={el}/>))}
      </div>
    </div>
  )
}
