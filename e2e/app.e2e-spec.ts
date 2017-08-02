import { DiscAppPage } from './app.po';

describe('disc-app App', () => {
  let page: DiscAppPage;

  beforeEach(() => {
    page = new DiscAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
