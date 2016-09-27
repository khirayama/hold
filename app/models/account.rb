class Account < ApplicationRecord
  belongs_to :user, class_name: 'User'

  validates :name, length: { maximum: 50 }, presence: true
  validates :amount, numericality: true, presence: true

  def transfer(to_account, amount)
    Account.transaction do
      self.decrement!(:amount, amount)
      if !to_account.nil?
        to_account.increment!(:amount, amount)
      end
    end
  end
end
