require 'rails_helper'
require 'spec_helper'

RSpec.describe Transaction, type: :model do
  describe "#belongs_to user" do
    it { should belong_to(:user) }
  end

  describe "#amount" do
    it { should validate_presence_of(:amount) }
    it { should validate_numericality_of(:amount).is_greater_than_or_equal_to(0) }
  end

  describe "#transaction_date" do
    it { should validate_presence_of(:transaction_date) }
  end

  describe "#note" do
    it { should validate_length_of(:note).is_at_most(200) }
  end
end
