export enum CvxnEnKelemType {
  /**
   * просто текст, без интерактива с пользователем
   */
  LABEL = 'label',
  TEXT = 'text',
  DATE = 'date',
  NUMBER = 'number',
  URL = 'url',
}

export const CvxnEnKelemTypeAll: CvxnEnKelemType[] = Object.values(CvxnEnKelemType)

export type KelemTypeData = {
  id: CvxnEnKelemType,
  name: string,
  // https://chakra-ui.com/docs/data-display/badge#props
  colorChakra: string
}

export const CvxnEnKelemTypeData = {
  [CvxnEnKelemType.LABEL]: {
    id: CvxnEnKelemType.LABEL,
    name: 'просто текст (не поле ввода)',
    colorChakra: 'gray'
  } as KelemTypeData,
  [CvxnEnKelemType.TEXT]: {
    id: CvxnEnKelemType.TEXT,
    name: 'поле ввода однострочного текста',
    colorChakra: 'orange'
  } as KelemTypeData,
  [CvxnEnKelemType.NUMBER]: {
    id: CvxnEnKelemType.NUMBER,
    name: 'поле ввода цифры',
    colorChakra: 'green'
  } as KelemTypeData,
  [CvxnEnKelemType.DATE]: {
    id: CvxnEnKelemType.DATE,
    name: 'поле ввода даты',
    colorChakra: 'yellow'
  } as KelemTypeData,
  [CvxnEnKelemType.URL]: {
    id: CvxnEnKelemType.URL,
    name: 'поле ввода URL',
    colorChakra: 'cyan'
  } as KelemTypeData,
}
