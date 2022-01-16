import { Form, Link, useActionData } from '@remix-run/react';
import {
  EnRoute,
  uniFieldName,
  uniPathCreate,
  UNI_FORM1_TITLE, uniPrefixType
} from '~/utils';
import { Input } from '@chakra-ui/input';

import cardCreateStyles from "~/styles/cardCreateStyles.css";
import { useState } from 'react';
import { CvxnCrdelem } from '~/elems/CvxnCrdelem';
import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { CvxnEnKelemType, CvxnEnKelemTypeAll, CvxnEnKelemTypeData, Type1156 } from '~/elems/CvxnEnKelemType';
import _ from 'lodash';
import { CvxnKelem } from '~/elems/CvxnKelem';
import { jsx } from '@emotion/react';
import JSX = jsx.JSX;
import { RsuvTuArray } from 'rsuv-lib';
import { ActionFunction, redirect } from 'remix';
import { crdelemCreate } from '~/elems/CvxnCrdelemApiFNS';

export const links = () => {
  return [{rel: "stylesheet", href: cardCreateStyles}];
};

type CreateError = {
  titleInvalid?: boolean
  kelemsInvalid?: boolean
}

export const action: ActionFunction = async ({request}: any) => {
  const formData = await request.formData();
  console.log('!!-!!-!! 1914- formData {220116191429}\n', formData) // del+
  const title = formData.get(UNI_FORM1_TITLE)
  // ---
  const errors: CreateError = {}
  if (!title) {
    errors.titleInvalid = true
  }
  if (Object.keys(errors).length) {
    return errors;
  }
  // ---
  const reqObj: CvxnCrdelem = {
    id: '',
    title: title,
    kelems: []
  }
  // ---
  const keys = formData.keys()
  for (let elKey of keys) {
    if (elKey !== UNI_FORM1_TITLE) {
      const kelemType = uniPrefixType(elKey)
      reqObj.kelems.push({type: kelemType} as CvxnKelem)
    }
  }
  console.log('!!-!!-!! reqObj {220116200523}\n', reqObj) // del+
  if (reqObj.kelems.length < 1) {
    errors.kelemsInvalid = true;
    return errors;
  }
  // ---
  await crdelemCreate(reqObj)
  // ---
  return redirect(uniPathCreate([EnRoute.CARDS]))
};

export default function CardCreate() {
  const [$cardModel, $cardModelSet] = useState<CvxnCrdelem>({id: Date.now() + '', title: '', kelems: []});

  function ButtonsFCC({index}: { index: number }) {

    const onMenuItemClick = (kelemType: CvxnEnKelemType) => () => {
      console.log('!!-!!-!! 1211- kelemType {220116122724}\n', kelemType) // del+
      const $cardModelC = _.cloneDeep($cardModel)
      console.log('!!-!!-!! index {220116185320}\n', index) // del+
      RsuvTuArray.elemAdd($cardModelC.kelems, index, {type: kelemType})
      // $cardModelC.kelems.push({type: kelemType})
      $cardModelSet($cardModelC)
    }

    return (
      <div className="cn1125">
        <Menu
          closeOnBlur={true}
        >
          {(state) => {
            return (
              <>
                <MenuButton as={IconButton} aria-label="add button" icon={<AddIcon/>} size="xs"
                            colorScheme="blue"/>
                <MenuList>
                  {CvxnEnKelemTypeAll.map((el: CvxnEnKelemType) => {
                    const info = CvxnEnKelemTypeData[el] || ({} as Type1156)
                    return (
                      <MenuItem key={el} onClick={onMenuItemClick(el)}>{info.name}</MenuItem>
                    )
                  })}
                </MenuList>
              </>
            )
          }}
        </Menu>
      </div>
    )
  }

  function jsxByKelemType(kelem: CvxnKelem, index: number): JSX.Element {
    const name = uniFieldName(kelem.type, index);
    switch (kelem.type) {
      case CvxnEnKelemType.LABEL:
        return (
          <div><Input name={name} aria-label="input" size="sm"/></div>
        )
      case CvxnEnKelemType.TEXT:
        return (
          <div><Input name={name} aria-label="input" size="sm"/></div>
        )
      case CvxnEnKelemType.DATE:
        return (
          <div><Input name={name} type="date" aria-label="input" size="sm"/></div>
        )
      case CvxnEnKelemType.NUMBER:
        return (
          <div><Input name={name} type="number" aria-label="input" size="sm"/></div>
        )
      case CvxnEnKelemType.URL:
        return (
          <div><Input name={name} type="url" aria-label="input" size="sm"/></div>
        )
    }
  }

  function KelemFCC({kelem, index}: { kelem: CvxnKelem, index: number }) {
    return (
      <div className="cn1843">
        <div className="cn1843_title">{kelem.type}</div>
        {
          jsxByKelemType(kelem, index)
        }
      </div>
    )
  }

  function CrdelemFCC({modelsType}: { modelsType: CvxnCrdelem }) {
    return (
      <div className="cn1847">
        <ButtonsFCC index={0}/>
        {
          // LOOP
          modelsType.kelems.map((elKelem: CvxnKelem, ix) => (
            <>
              <KelemFCC key={ix + 'a'} kelem={elKelem} index={ix + 1}/>
              <ButtonsFCC key={ix + 'b'} index={ix + 1}/>
            </>
          ))
        }
      </div>
    )
  }

  const onTitleChange = (ev: any) => {
    const clone = _.cloneDeep($cardModel)
    clone.title = ev.target.value
    $cardModelSet(clone)
  }

  const errors: CreateError | undefined = useActionData()

  return (<div className="cn1110">
    <div className="cn1110_link"><Link to={uniPathCreate([EnRoute.CARDS])}>карточки</Link></div>
    <div className="cn1110_title">создание карточки</div>
    <Form method="post">
      <div className="cn1906">
        {/* // --- заголовок */}
        <label>
          <span className="cn1110_input-label">заголовок</span>
          <Input name={UNI_FORM1_TITLE} size="sm" value={$cardModel.title} onChange={onTitleChange}/>
          {errors?.titleInvalid ? <em>введите значение</em> : null}
        </label>
        {/* // --- */}
        <CrdelemFCC modelsType={$cardModel}/>
        {errors?.kelemsInvalid && <em>добавьте 1+ элементов</em>}
        {/* // --- кнопки Отменить, Сохранить */}
        <div className="cn1910_footerButtons">
          <Button aria-label="cancel button" size="sm">Отмена</Button>
          <Button type="submit" aria-label="save button" size="sm">Сохранить</Button>
        </div>
        {/* // --- */}
      </div>
    </Form>
  </div>)
}
