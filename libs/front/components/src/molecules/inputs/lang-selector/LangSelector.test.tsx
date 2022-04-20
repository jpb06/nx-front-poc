import { appRender } from '../../../test/renders/appRender';
import { LangSelector } from './LangSelector';

describe('LangSelector component', () => {
  const render = () => appRender(<LangSelector />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { baseElement } = render();

    expect(baseElement).toMatchSnapshot();
  });
});
