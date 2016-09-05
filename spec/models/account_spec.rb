require 'rails_helper'

RSpec.describe Account, type: :model do
  describe "#name" do
    context 'not nil' do
      let(:account) { Account.new(name: nil) }

      it 'not valid' do
        account.valid?
        expect(account.errors[:name]).to be_present
      end
    end

    context 'not empty' do
      let(:account) { Account.new(name: '') }

      it 'not valid' do
        account.valid?
        expect(account.errors[:name]).to be_present
      end
    end
  end
end
