import { PigurFrontendPage } from './app.po';

describe('pigur-frontend App', function() {
  let page: PigurFrontendPage;

  beforeEach(() => {
    page = new PigurFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
