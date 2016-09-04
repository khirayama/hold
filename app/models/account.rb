class Account < ApplicationRecord
  belongs_to :user, class_name: 'User'

  validates :name, length: { maximum: 50 }, presence: true
  validates :amount, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, presence: true
end
