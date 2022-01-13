import { CvxnCrdelem } from '~/elems/CvxnCrdelem';
import { CvxnEnKelemType } from '~/elems/CvxnEnKelemType';

export async function crdelems(): Promise<CvxnCrdelem[]> {
  return [
    new CvxnCrdelem('22011323173601', 'фамилия', [{type: CvxnEnKelemType.TEXT}]),
    new CvxnCrdelem('22011323173602', 'имя', [{type: CvxnEnKelemType.TEXT}]),
    new CvxnCrdelem('22011323173603', 'отчество', [{type: CvxnEnKelemType.TEXT}]),
    new CvxnCrdelem('22011323173604', 'дата рождения', [{type: CvxnEnKelemType.DATE}]),
    new CvxnCrdelem('22011323173605', 'сайт официальный', [{type: CvxnEnKelemType.URL}]),
    new CvxnCrdelem('22011323173606', 'звёзды github (штук на дату)', [{type: CvxnEnKelemType.NUMBER}, {type: CvxnEnKelemType.DATE}]),
  ]
}
