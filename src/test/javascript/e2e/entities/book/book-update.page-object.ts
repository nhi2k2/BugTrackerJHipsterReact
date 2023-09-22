import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BookUpdatePage {
  pageTitle: ElementFinder = element(by.id('myApp.book.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#book-title'));
  descriptionInput: ElementFinder = element(by.css('input#book-description'));
  publicationDateInput: ElementFinder = element(by.css('input#book-publicationDate'));
  priceInput: ElementFinder = element(by.css('input#book-price'));
  authorSelect: ElementFinder = element(by.css('select#book-author'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setPublicationDateInput(publicationDate) {
    await this.publicationDateInput.sendKeys(publicationDate);
  }

  async getPublicationDateInput() {
    return this.publicationDateInput.getAttribute('value');
  }

  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return this.priceInput.getAttribute('value');
  }

  async authorSelectLastOption() {
    await this.authorSelect.all(by.tagName('option')).last().click();
  }

  async authorSelectOption(option) {
    await this.authorSelect.sendKeys(option);
  }

  getAuthorSelect() {
    return this.authorSelect;
  }

  async getAuthorSelectedOption() {
    return this.authorSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setTitleInput('title');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.setPublicationDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setPriceInput('5');
    await this.authorSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
