require 'rails_helper'
require 'spec_helper'

RSpec.describe Account, type: :model do
  describe "#name" do
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_most(50) }
  end

  describe "#amount" do
    it { should validate_presence_of(:amount) }
    it { should validate_numericality_of(:amount).only_integer.is_greater_than_or_equal_to(0) }
  end
end
