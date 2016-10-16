require 'rails_helper'
require 'spec_helper'

RSpec.describe User, type: :model do
  describe "#has_many" do
    it "accounts" do
      should have_many(:accounts)
    end
    it "transaction_categories" do
      should have_many(:transaction_categories)
    end
    it "transactions" do
      should have_many(:transactions)
    end
  end

  describe "#has_one" do
    it "setting" do
      should have_one(:setting)
    end
  end

  describe '.find_or_create_from_auth_hash' do
    let(:auth_hash) do
      {
        provider: 'twitter',
        uid: 'uid',
        info: {
          nickname: 'netwillnet',
          image: 'http://example.com/netwillnet.jpg'
        }
      }
    end

    context 'not existed user with auth_hash' do
      it 'create user with auth_hash' do
        user = User.find_or_create_from_auth_hash(auth_hash)
        expect(user.provider).to eq 'twitter'
        expect(user.uid).to eq 'uid'
        expect(user.nickname).to eq 'netwillnet'
        expect(user.image_url).to eq 'http://example.com/netwillnet.jpg'
        expect(user).to be_persisted
      end

      it 'increment user count' do
        expect { User.find_or_create_from_auth_hash(auth_hash) }.
          to change { User.count }.from(0).to(1)
      end
    end

    context 'existed user with auth_hash' do
      before do
        @created_user = User.find_or_create_from_auth_hash(auth_hash)
      end

      it 'find existed user' do
        user = User.find_or_create_from_auth_hash(auth_hash)
        expect(user).to eq @created_user
      end

      it 'keep user count' do
        expect { User.find_or_create_from_auth_hash(auth_hash) }.
          not_to change { User.count }
      end
    end
  end
end
