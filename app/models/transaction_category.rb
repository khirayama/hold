class TransactionCategory < ApplicationRecord
  belongs_to :user, class_name: 'User'

  validates :name, length: { maximum: 50 }, presence: true

  def self.create_initial_transaction_categories(user)
    user.transaction_categories.create({ name: I18n.t('transaction_categories.foods'), transaction_type: :payment })
    user.transaction_categories.create({ name: I18n.t('transaction_categories.dialy_goods'), transaction_type: :payment })
    user.transaction_categories.create({ name: I18n.t('transaction_categories.transport'), transaction_type: :payment })
    user.transaction_categories.create({ name: I18n.t('transaction_categories.network'), transaction_type: :payment })
    user.transaction_categories.create({ name: I18n.t('transaction_categories.utilities'), transaction_type: :payment })
    user.transaction_categories.create({ name: I18n.t('transaction_categories.home'), transaction_type: :payment })
    user.transaction_categories.create({ name: I18n.t('transaction_categories.socializing'), transaction_type: :payment })
    user.transaction_categories.create({ name: I18n.t('transaction_categories.hobbies'), transaction_type: :payment })
    user.transaction_categories.create({ name: I18n.t('transaction_categories.education'), transaction_type: :payment })
    user.transaction_categories.create({ name: I18n.t('transaction_categories.medical'), transaction_type: :payment })
    user.transaction_categories.create({ name: I18n.t('transaction_categories.other'), transaction_type: :payment })

    user.transaction_categories.create({ name: I18n.t('transaction_categories.salary'), transaction_type: :income })
    user.transaction_categories.create({ name: I18n.t('transaction_categories.bonus'), transaction_type: :income })
    user.transaction_categories.create({ name: I18n.t('transaction_categories.other'), transaction_type: :income })
  end
end
