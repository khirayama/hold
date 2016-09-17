class TransactionCategory < ApplicationRecord
  belongs_to :user, class_name: 'User'

  validates :name, length: { maximum: 50 }, presence: true

  def self.create_initial_transaction_categories(user)
    # Payment
    user.transaction_categories.create(name: "Food", transaction_type: :payment)
    user.transaction_categories.create(name: "Daily goods", transaction_type: :payment)
    user.transaction_categories.create(name: "Transport", transaction_type: :payment)
    user.transaction_categories.create(name: "Network", transaction_type: :payment)
    user.transaction_categories.create(name: "Utilities", transaction_type: :payment)
    user.transaction_categories.create(name: "Home", transaction_type: :payment)
    user.transaction_categories.create(name: "Socializing", transaction_type: :payment)
    user.transaction_categories.create(name: "Hobbies", transaction_type: :payment)
    user.transaction_categories.create(name: "Education", transaction_type: :payment)
    user.transaction_categories.create(name: "Medical", transaction_type: :payment)
    user.transaction_categories.create(name: "Other", transaction_type: :payment)

    # Income
    user.transaction_categories.create(name: "Salary", transaction_type: :income)
    user.transaction_categories.create(name: "Bonus", transaction_type: :income)
    user.transaction_categories.create(name: "Other", transaction_type: :income)
  end
end
