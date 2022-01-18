import { CvxnCrdelem } from '~/elems/CvxnCrdelem';
import { CvxnEnKelemType } from '~/elems/CvxnEnKelemType';
import _ from 'lodash';
import {
  BaseCell,
  BaseTuple,
  HoggCellNT,
  HoggConnectorAirtable,
  HoggConnectorNT,
  HoggOffsetCount,
  HoggTupleNT
} from 'hogg-lib';
import { EnTableMain, EnTableKelems, uniErrMessage } from '~/utils';
import { CvxnKelem } from '~/elems/CvxnKelem';

const air: HoggConnectorAirtable = new HoggConnectorAirtable()
air.init({apiKey: process.env.AIRTABLE_KEY || ''})
const connMain: HoggConnectorNT = air
  .db('appMo64xRBNsBNH0C')
  .table('main')
  .columns([EnTableMain.ID, EnTableMain.TITLE, EnTableMain.COMM, EnTableMain.KELEMS])

const air2: HoggConnectorAirtable = new HoggConnectorAirtable()
air2.init({apiKey: process.env.AIRTABLE_KEY || ''})
const connKelems: HoggConnectorNT = air2
  .db('appMo64xRBNsBNH0C')
  .table('kelems')
  .columns([EnTableKelems.ID, EnTableKelems.TYPE, EnTableKelems.VALUE])

const data = [
  new CvxnCrdelem('22011323173601', 'фамилия', [{type: CvxnEnKelemType.TEXT}]),
  new CvxnCrdelem('22011323173602', 'имя', [{type: CvxnEnKelemType.TEXT}]),
  new CvxnCrdelem('22011323173603', 'отчество', [{type: CvxnEnKelemType.TEXT}]),
  new CvxnCrdelem('22011323173604', 'дата рождения', [{type: CvxnEnKelemType.DATE}]),
  new CvxnCrdelem('22011323173605', 'сайт официальный', [{type: CvxnEnKelemType.URL}]),
  new CvxnCrdelem('22011323173606', 'звёзды github (штук на дату)', [{type: CvxnEnKelemType.NUMBER}, {type: CvxnEnKelemType.DATE}]),
]

/**
 *
 * @param crdelem
 */
export async function crdelemCreate(crdelem: CvxnCrdelem): Promise<string> {
  if (crdelem.kelems && crdelem.kelems.length > 0) {
    const tuples = crdelem.kelems.map((elKelem: CvxnKelem) => {
      return new BaseTuple().create([
        new BaseCell().create(EnTableKelems.TYPE, elKelem.type),
        new BaseCell().create(EnTableKelems.VALUE, elKelem.value || ''),
      ])
    })
    const kelemsCreateResult = await connKelems.create(tuples)
    console.log('!!-!!-!! kelemsCreateResult {220118161009}\n', kelemsCreateResult) // del+
    if (kelemsCreateResult.success) {
      const keys = kelemsCreateResult.value || []
      // ---
      const cellTitle = new BaseCell().create(EnTableMain.TITLE, crdelem.title)
      const cellComm = new BaseCell().create(EnTableMain.COMM, crdelem.comm || '')
      const cellKelems = new BaseCell().create(EnTableMain.KELEMS, '')
      cellKelems.valuesSet(keys)
      cellKelems.isArraySet()
      const tuple = new BaseTuple().create([cellTitle, cellComm, cellKelems])
      const result = await connMain.create([tuple])
      console.log('!!-!!-!! result {220118131130}\n', result) // del+
      if (result.success) {
        const val = result.value || ['']
        return val[0]
      } else {
        throw uniErrMessage(result.errCode, result.errMessage)
      }
    } else {
      throw uniErrMessage(kelemsCreateResult.errCode, kelemsCreateResult.errMessage)
    }
  }

  // ---
  return '111'
}

export async function crdelemCreateB(crdelem: CvxnCrdelem): Promise<string> {
  const id = Date.now() + ''
  const clone = _.cloneDeep(crdelem)
  clone.id = id;
  data.push(crdelem)
  return id
}

// del+ mass
async function fnKelemsRequest(kelemIds: string[], kelemsBack: CvxnKelem[]) {
  if (kelemIds && kelemIds.length > 0) {
    const promises: Promise<HoggTupleNT>[] = kelemIds.map((elKelemId: string) => {
      return connKelems.queryOneById(elKelemId)
    })
    const settleResults = await Promise.allSettled(promises);
    console.log('!!-!!-!! settleResults {220118113923}\n', settleResults) // del+
    const isSuccess = settleResults.every(el => el.status === 'fulfilled')
    if (isSuccess) {
      settleResults.map((el) => {
        const kelem = {} as CvxnKelem
        // @ts-ignore
        const tuple = el.value as BaseTuple
        const cells: HoggCellNT[] = tuple.cellsGet()
        cells.map((elCell: HoggCellNT) => {
          const cn1 = elCell.columnNameGet()
          if (cn1 === EnTableKelems.TYPE) {
            const type = elCell.valueGet() as CvxnEnKelemType
            kelem.type = type
          } else if (cn1 === EnTableKelems.VALUE) {
            const value = elCell.valueGet()
            kelem.value = value
          } else if (cn1 === EnTableKelems.TID) {
            const id = elCell.valueGet()
            kelem.id = id
          }
        })
        kelemsBack.push(kelem)
      })
    } else {
      throw 'ERR* not all fulfilled [[220118112900]]'
    }
  }
}

/**
 * Элементы (1) в поле `kelems` сожержат ключи (string) вместо объектов типа {@link CvxnKelem} .
 * По этим ключам делаем запросы и по результату вместо этих ключей подставляем объекты {@link CvxnKelem}
 * @param crdelems (1) --
 */
async function fnKelemsPopulate(crdelems: CvxnCrdelem[]) {
  const kelemIds0: string[] = []
  const kelems: CvxnKelem[] = []
  // ---
  crdelems.forEach((elCrdelem: CvxnCrdelem) => {
    const kelemIds = elCrdelem.kelems
    // @ts-ignore
    kelemIds0.push(...kelemIds)
  })
  // ---
  const promises = kelemIds0.map((elKelemId: string) => {
    return connKelems.queryOneById(elKelemId)
  })
  const settleResults = await Promise.allSettled(promises)
  const isSuccess = settleResults.every(el => el.status === 'fulfilled')
  if (isSuccess) {
    settleResults.map((el) => {
      const kelem = {} as CvxnKelem
      // @ts-ignore
      const tuple = el.value as BaseTuple
      const cells: HoggCellNT[] = tuple.cellsGet()
      cells.forEach((elCell: HoggCellNT) => {
        const cn1 = elCell.columnNameGet()
        if (cn1 === EnTableKelems.TYPE) {
          const type = elCell.valueGet() as CvxnEnKelemType
          kelem.type = type
        } else if (cn1 === EnTableKelems.VALUE) {
          const value = elCell.valueGet()
          kelem.value = value
        } else if (cn1 === EnTableKelems.TID) {
          const id = elCell.valueGet()
          kelem.id = id
        }
      })
      kelems.push(kelem)
    })
  } else {
    throw 'ERR* not all fulfilled [[220118112900]]'
  }
  // ---
  crdelems.forEach((elCrdelem: CvxnCrdelem) => {
    // @ts-ignore
    const kelemIds: string[] = elCrdelem.kelems
    const kelems2: CvxnKelem[] = []
    kelemIds.forEach((elId: string) => {
      const kelemFind = kelems.find((elKelem: CvxnKelem) => elKelem.id === elId)
      if (kelemFind) {
        kelems2.push(kelemFind)
      }
    })
    elCrdelem.kelems = kelems2
  })
  return true;
}

function fnCrdelemFrom(elTuple: HoggTupleNT) {
  const crdelem = {} as CvxnCrdelem
  crdelem.kelems = []
  const cells: HoggCellNT[] = elTuple.cellsGet()
  cells.forEach(async (elCell: HoggCellNT) => {
    const cn = elCell.columnNameGet() as EnTableMain
    switch (cn) {
      case EnTableMain.TID:
        const tid = elCell.valueGet()
        crdelem.id = tid
        break;
      case EnTableMain.TITLE:
        const title = elCell.valueGet()
        crdelem.title = title
        break;
      case EnTableMain.COMM:
        const comm = elCell.valueGet()
        crdelem.comm = comm
        break;
      case EnTableMain.KELEMS:
        const kelemIds = elCell.valuesGet()
        // @ts-ignore ; наполняем ключами (строковыми) с тем чтобы затем (см. [220118123606]) сделать подзапросы по этим ключам
        crdelem.kelems = kelemIds
        break;
    }
  })
  return crdelem;
}

/**
 * Получение всех *крд-элементов
 */
export async function cdrelems(): Promise<CvxnCrdelem[]> {
  return new Promise(async (resolve, reject) => {
    const crdelems = [] as CvxnCrdelem[]
    const tuples: HoggTupleNT[] = await connMain.query(new HoggOffsetCount(true))
    if (tuples) {
      tuples.forEach((elTuple: HoggTupleNT) => {
        const crdelem = fnCrdelemFrom(elTuple);
        crdelems.push(crdelem)
      })
      if (crdelems.length > 0) {
        // [[220118123606]]
        await fnKelemsPopulate(crdelems)
      }
      resolve(crdelems)
    } else {
      reject('ERR* tuples error [[220118115623]]')
    }
  });
}


export async function crdelemsB(): Promise<CvxnCrdelem[]> {
  return data
}

export async function crdelemById(id: string): Promise<CvxnCrdelem | null> {
  const crdelemTuple: HoggTupleNT = await connMain.queryOneById(id)
  const crdelem = fnCrdelemFrom(crdelemTuple)
  await fnKelemsPopulate([crdelem])
  return crdelem;
}

export async function crdelemByIdB(id: string): Promise<CvxnCrdelem | null> {
  const elems = await crdelemsB()
  const elem = elems.find(el => {
    return el.id === id
  })
  if (elem) {
    return elem
  }
  return null
}
