require 'rails_helper'
require 'spec_helper'

RSpec.describe StaticPagesController, type: :controller do
  context 'call action require authenticate when before_action' do
    context 'when login' do
      before { session[:user_id] = 1 }

      it 'status code id 200' do
        get :application
        expect(response.status).to eq(200)
      end
    end

    context 'when not login' do
      it 'redirect to root' do
        get :application
        expect(response).to redirect_to(root_path)
      end
    end
  end
end
