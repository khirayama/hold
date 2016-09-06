FactoryGirl.define do
  factory :account do
    user
    sequence(:name) { |i| "Account_name_#{i}" }
    sequence(:amount) { |i| i * 1000 }
  end
end
