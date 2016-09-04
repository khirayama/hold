class Transaction < ApplicationRecord
  belongs_to :user, class_name: 'User'

  validates :amount, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, presence: true
  validates :payment_date, presence: true
  validates :transaction_date, presence: true
end
