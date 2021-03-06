class Transaction < ApplicationRecord
  belongs_to :user, class_name: 'User'

  validates :amount, numericality: { greater_than_or_equal_to: 0 }, presence: true
  validates :transaction_date, presence: true
  validates :note, length: { maximum: 200 }
end
