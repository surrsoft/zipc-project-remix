import { CvxnEnKelemType } from '~/elems/CvxnEnKelemType';

// ---
export const UNI_DIVIDER = '___'
export const UNI_FORM1_KELEM_PREFIX = 'form1_kelem' + UNI_DIVIDER
export const UNI_FORM1_TITLE = 'form1_title'
export const uniPrefixType = (fieldName: string) => fieldName.split(UNI_DIVIDER)[1]
export const uniFieldForm = (pre: string, kelemType: CvxnEnKelemType) => (pre + kelemType);
export const uniFieldName = (kelemType: CvxnEnKelemType, index: number) => UNI_FORM1_KELEM_PREFIX + kelemType + UNI_DIVIDER + index;

// ---
export enum EnRoute {
  CARDS = 'cards',
  CARD_CREATE = 'card_create',
  CARD_EDIT = 'card_edit',
}

export function uniPathCreate(elems: string[]) {
  return '/' + elems.join('/')
}
