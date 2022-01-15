import { Form, Link } from '@remix-run/react';

export default function CardCreate() {
  return (<div>
    <div><Link to="/cards">карточки</Link></div>
    <div>создание карточки</div>
    <Form method="post">
      <p>
        <label>
          заголовок: <input type="text" name="title" />
        </label>
      </p>
    </Form>
  </div>)
}
