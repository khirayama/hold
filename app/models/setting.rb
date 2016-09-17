class Setting < ApplicationRecord
  belongs_to :user, class_name: 'User'

  # about: start_date_skip_option
  # -1: slide to day before start_date
  #  0: not slide
  #  1: slide to day after start_date

  def self.currency(language)
    if language == :ja
      '¥'
    else
      '$'
    end
  end
end
