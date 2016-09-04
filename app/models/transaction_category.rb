class TransactionCategory < ApplicationRecord
  belongs_to :user, class_name: 'User'

  validates :name, length: { maximum: 50 }, presence: true
end
