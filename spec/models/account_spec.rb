require 'rails_helper'

RSpec.describe Account, type: :model do
  describe "#name" do
    context 'not empty' do
      it 'not valid' do
        account = Account.new(name: '')
        account.valid?
        expect(account.errors[:name]).to be_present
      end
    end
  end
end
