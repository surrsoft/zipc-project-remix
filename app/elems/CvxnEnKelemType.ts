export enum CvxnEnKelemType {
  /**
   * просто текст, без интерактива с пользователем
   */
  LABEL = 'label',
  TEXT = 'input_text',
  DATE = 'date',
  NUMBER = 'number',
  URL = 'url',
}

export const CvxnEnKelemTypeAll: CvxnEnKelemType[] = Object.values(CvxnEnKelemType)

export type Type1156 = {
  id: string,
  name: string
}

export const CvxnEnKelemTypeData = {
  [CvxnEnKelemType.LABEL]: {id: CvxnEnKelemType.LABEL, name: 'просто текст (не поле ввода)'} as Type1156,
  [CvxnEnKelemType.TEXT]: {id: CvxnEnKelemType.TEXT, name: 'поле ввода однострочного текста'} as Type1156,
  [CvxnEnKelemType.NUMBER]: {id: CvxnEnKelemType.NUMBER, name: 'поле ввода цифры'} as Type1156,
  [CvxnEnKelemType.DATE]: {id: CvxnEnKelemType.DATE, name: 'поле ввода даты'} as Type1156,
  [CvxnEnKelemType.URL]: {id: CvxnEnKelemType.URL, name: 'поле ввода URL'} as Type1156,
}
