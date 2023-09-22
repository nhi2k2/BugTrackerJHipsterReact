import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ProjectUpdatePage from './project-update.page-object';

const expect = chai.expect;
export class ProjectDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('myApp.project.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-project'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ProjectComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('project-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('project');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateProject() {
    await this.createButton.click();
    return new ProjectUpdatePage();
  }

  async deleteProject() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const projectDeleteDialog = new ProjectDeleteDialog();
    await waitUntilDisplayed(projectDeleteDialog.deleteModal);
    expect(await projectDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/myApp.project.delete.question/);
    await projectDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(projectDeleteDialog.deleteModal);

    expect(await isVisible(projectDeleteDialog.deleteModal)).to.be.false;
  }
}
