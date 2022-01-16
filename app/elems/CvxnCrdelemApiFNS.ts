import { CvxnCrdelem } from '~/elems/CvxnCrdelem';
import { CvxnEnKelemType } from '~/elems/CvxnEnKelemType';
import _ from 'lodash';

const data = [
  new CvxnCrdelem('22011323173601', 'фамилия', [{type: CvxnEnKelemType.TEXT}]),
  new CvxnCrdelem('22011323173602', 'имя', [{type: CvxnEnKelemType.TEXT}]),
  new CvxnCrdelem('22011323173603', 'отчество', [{type: CvxnEnKelemType.TEXT}]),
  new CvxnCrdelem('22011323173604', 'дата рождения', [{type: CvxnEnKelemType.DATE}]),
  new CvxnCrdelem('22011323173605', 'сайт официальный', [{type: CvxnEnKelemType.URL}]),
  new CvxnCrdelem('22011323173606', 'звёзды github (штук на дату)', [{type: CvxnEnKelemType.NUMBER}, {type: CvxnEnKelemType.DATE}]),
]

export async function crdelemCreate(crdelem: CvxnCrdelem): Promise<string> {
  const id = Date.now() + ''
  const clone = _.cloneDeep(crdelem)
  clone.id = id;
  data.push(crdelem)
  return id
}

export async function crdelems(): Promise<CvxnCrdelem[]> {
  return data
}

export async function crdelemById(id: string): Promise<CvxnCrdelem | null> {
  const elems = await crdelems()
  const elem = elems.find(el => {
    return el.id === id
  })
  if (elem) {
    return elem
  }
  return null
}
