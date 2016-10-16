require 'rails_helper'
require 'spec_helper'

RSpec.describe Account, type: :model do
  describe "#belongs_to user" do
    it { should belong_to(:user) }
  end

  describe "#name" do
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_most(50) }
  end

  describe "#amount" do
    it { should validate_presence_of(:amount) }
    it { should validate_numericality_of(:amount) }
  end

  describe "#transfer" do
    it 'to_account exit' do
      from_account = Account.new({name: 'test from account', amount: 1000})
      to_account = Account.new({name: 'test to account', amount: 0})

      from_account.transfer(to_account, 500)
      expect(from_account.amount).to eq 500
      expect(to_account.amount).to eq 500
    end

    it 'to_account is nil' do
      from_account = Account.new({name: 'test from account', amount: 1000})
      to_account = nil

      from_account.transfer(to_account, 500)
      expect(from_account.amount).to eq 500
    end
  end
end
