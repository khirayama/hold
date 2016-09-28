class User < ApplicationRecord
  has_many :accounts, foreign_key: :user_id
  has_many :transaction_categories, foreign_key: :user_id
  has_many :transactions, foreign_key: :user_id
  has_one :setting, foreign_key: :user_id

  def self.find_or_create_from_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]
    nickname = auth_hash[:info][:nickname]
    image_url = auth_hash[:info][:image]

    User.find_or_create_by(provider: provider, uid: uid) do |user|
      user.nickname = nickname
      user.image_url = image_url
      user.setting = Setting.create(
        language: I18n.locale,
        currency_code: Setting.currency(I18n.locale)
      )
    end
  end
end
