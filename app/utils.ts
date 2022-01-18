import { CvxnEnKelemType } from '~/elems/CvxnEnKelemType';

// ---
export const UNI_DIVIDER = '___'
export const UNI_FORM1_KELEM_PREFIX = 'form1_kelem' + UNI_DIVIDER
export const UNI_FORM1_TITLE = 'form1_title'
export const uniPrefixType = (fieldName: string) => fieldName.split(UNI_DIVIDER)[1]
export const uniFieldForm = (pre: string, kelemType: CvxnEnKelemType) => (pre + kelemType);
export const uniFieldName = (kelemType: CvxnEnKelemType, index: number) => UNI_FORM1_KELEM_PREFIX + kelemType + UNI_DIVIDER + index;

// ---
export enum EnTableMain {
  ID = 'id',
  TID = 'tid',
  TITLE = 'title',
  COMM = 'comm',
  KELEMS = 'kelems',
}

export enum EnTableKelems {
  ID = 'id',
  TID = 'tid',
  TYPE = 'type',
  VALUE = 'value',
}

// ---
export enum EnRoute {
  CARDS = 'cards',
  CARD_CREATE = 'card_create',
  CARD_EDIT = 'card_edit',
}

export function uniPathCreate(elems: string[]) {
  return '/' + elems.join('/')
}

export function uniErrMessage(code?: string, message?: string) {
  const arr = []
  if (code) {
    arr.push(`code: ${code}`)
  }
  if (message) {
    arr.push(`message: ${message}`)
  }
  return arr.join('; ') || 'error'
}
