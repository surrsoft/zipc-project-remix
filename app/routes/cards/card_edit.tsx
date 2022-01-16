import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from 'remix';
import { crdelemById } from '~/elems/CvxnCrdelemApiFNS';

export const loader: LoaderFunction = async ({params}: any) => {
  const id = params.slug
  let data = null
  if (id) {
    data = await crdelemById(id)
  }
  return {id, data, success: !!data}
}

function CardEditFCC({slug}: any) {
  return (
    <div>CardEdit {slug.id}</div>
  )
}

export default function CardEdit() {
  const slug = useLoaderData()
  return (<div>
    {slug.success ? <CardEditFCC slug={slug}/> : <div>no data for id <b>{slug.id}</b></div>}
  </div>)
}
