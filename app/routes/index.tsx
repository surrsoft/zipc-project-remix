import { EnRoute, uniPathCreate } from '~/utils';
import { Link } from '@chakra-ui/react';
import { Link as LinkRemix } from '@remix-run/react';

export default function Index() {
  return (
    <div className="cn1850">
      <h1>Welcome to Remix !!</h1>
      <div className="cn1909">
        <Link as={LinkRemix} to={uniPathCreate([EnRoute.CARD_CREATE])}>Card create</Link>
        <br/>
        <Link as={LinkRemix} to={uniPathCreate([EnRoute.CARDS])}>Cards</Link>
      </div>
      <a href="/">111</a>
    </div>
  );
}
