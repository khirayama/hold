require 'rails_helper'
require 'spec_helper'

RSpec.describe Setting, type: :model do
  describe "#belongs_to user" do
    it { should belong_to(:user) }
  end

  describe "#currency" do
    it "runable" do
      expect(Setting.currency()).to eq 'USD'
      expect(Setting.currency(:en)).to eq 'USD'
      expect(Setting.currency(:ja)).to eq 'JPY'
    end
  end
end
