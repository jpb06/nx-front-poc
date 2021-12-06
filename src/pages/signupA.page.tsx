import type { NextPage } from 'next';

import { Signup } from '@components/epic/signup/Signup';

const Home: NextPage = () => <Signup async={true} />;

export default Home;
