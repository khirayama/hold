class Setting < ApplicationRecord
  belongs_to :user, class_name: 'User'

  def self.currency(language)
    if language == :ja
      'JPY'
    else
      'USD'
    end
  end
end
