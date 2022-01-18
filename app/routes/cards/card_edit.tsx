import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from 'remix';
import { crdelemById, crdelemByIdB } from '~/elems/CvxnCrdelemApiFNS';
import { Input } from '@chakra-ui/input';
import { UNI_FORM1_TITLE } from '~/utils';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { CvxnCrdelem } from '~/elems/CvxnCrdelem';
import _ from 'lodash';

export const loader: LoaderFunction = async ({params}: any) => {
  const id = params.slug
  let data = null
  if (id) {
    data = await crdelemById(id)

    // data = await crdelemByIdB(id) // del+
  }
  return {id, data, success: !!data}
}

export default function CardEdit() {
  const slug = useLoaderData()
  const cardModel0 = slug.success ? slug.data : {id: Date.now() + '', title: '', kelems: []}
  const [$cardModel, $cardModelSet] = useState<CvxnCrdelem>(cardModel0);

  type EditError = {
    titleInvalid?: boolean
    kelemsInvalid?: boolean,
    commonInvalid?: boolean,
    commonInvalidErrMessage?: string,
  }

  // const errors: EditError | undefined = useActionData()
  const errors: EditError | undefined = undefined

  function CardEditInFCC({slug}: any) {

    const onTitleChange = (ev: any) => {
      const clone = _.cloneDeep($cardModel)
      clone.title = ev.target.value
      $cardModelSet(clone)
    }

    return (
      <div>
        <div>id: {slug.id}</div>
        <Form method="post">
          <div className="cn1906">
            {/* // --- заголовок */}
            <label>
              <span className="cn1110_input-label">заголовок</span>
              <Input name={UNI_FORM1_TITLE} size="sm" value={$cardModel.title} onChange={onTitleChange}/>
              {errors?.titleInvalid ? <em>введите значение</em> : null}
            </label>
            {/* // --- */}
            {/*<CrdelemFCC modelsType={$cardModel}/>*/}
            {errors?.kelemsInvalid && <em>добавьте 1+ элементов</em>}
            {/* // --- кнопки Отменить, Сохранить */}
            <div className="cn1910_footerButtons">
              <Button aria-label="cancel button" size="sm">Отмена</Button>
              <Button type="submit" aria-label="save button" size="sm">Сохранить</Button>
            </div>
            {/* // --- */}
            {errors?.commonInvalid ? <div className="cn1110_err2">{errors?.commonInvalidErrMessage}</div> : null}
          </div>
        </Form>
      </div>
    )
  }

  return (<div>
    {slug.success ? <CardEditInFCC slug={slug}/> : <div>no data for id <b>{slug.id}</b></div>}
  </div>)
}
