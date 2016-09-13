class Account < ApplicationRecord
  belongs_to :user, class_name: 'User'

  validates :name, length: { maximum: 50 }, presence: true
  validates :amount, numericality: { greater_than_or_equal_to: 0 }, presence: true

  def transfer(to_account, amount)
    Account.transaction do
      self.decrement!(:amount, amount)
      if to_account.presence?
        to_account.increment!(:amount, amount)
      end
    end
  end
end
