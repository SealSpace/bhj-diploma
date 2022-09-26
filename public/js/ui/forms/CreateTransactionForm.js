/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const select = this.element.querySelector('.accounts-select');
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        if (response.success) {
          select.innerHTML = '';
          response.data.forEach(item => {
            select.insertAdjacentHTML('beforeend', `<option value="${item.id}">${item.name}</option>`)
          })
        }
      });
    }
  }
  

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    const modal = this.element.closest('.modal').dataset.modalId;
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.update();
        this.element.reset();
        if (modal === 'newExpense') {
          App.getModal('newExpense').close();
        } else {
          App.getModal('newIncome').close();
        }
      }
    });
  }
}
