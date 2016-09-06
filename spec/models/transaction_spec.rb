require 'rails_helper'
require 'spec_helper'

RSpec.describe Transaction, type: :model do
  describe "#belongs_to user" do
    it { should belong_to(:user) }
  end

  describe "#payment_date" do
    it { should validate_presence_of(:payment_date) }
  end

  describe "#transaction_date" do
    it { should validate_presence_of(:transaction_date) }
  end
end
