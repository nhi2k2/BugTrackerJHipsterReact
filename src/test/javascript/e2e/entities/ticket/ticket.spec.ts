import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TicketComponentsPage from './ticket.page-object';
import TicketUpdatePage from './ticket-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Ticket e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ticketComponentsPage: TicketComponentsPage;
  let ticketUpdatePage: TicketUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    ticketComponentsPage = new TicketComponentsPage();
    ticketComponentsPage = await ticketComponentsPage.goToPage(navBarPage);
  });

  it('should load Tickets', async () => {
    expect(await ticketComponentsPage.title.getText()).to.match(/Tickets/);
    expect(await ticketComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Tickets', async () => {
    const beforeRecordsCount = (await isVisible(ticketComponentsPage.noRecords)) ? 0 : await getRecordsCount(ticketComponentsPage.table);
    ticketUpdatePage = await ticketComponentsPage.goToCreateTicket();
    await ticketUpdatePage.enterData();
    expect(await isVisible(ticketUpdatePage.saveButton)).to.be.false;

    expect(await ticketComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(ticketComponentsPage.table);
    await waitUntilCount(ticketComponentsPage.records, beforeRecordsCount + 1);
    expect(await ticketComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await ticketComponentsPage.deleteTicket();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(ticketComponentsPage.records, beforeRecordsCount);
      expect(await ticketComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(ticketComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
