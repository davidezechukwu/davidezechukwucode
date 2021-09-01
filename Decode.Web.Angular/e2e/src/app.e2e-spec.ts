import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    page.getTitleText().then(pageTitle => {
      expect(pageTitle).toEqual("Hello World");
    })
    ;
  });
});
