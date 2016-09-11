module Api
  module V1
    class AccountsController < Api::V1::ApplicationController
      before_action :authenticate

      def index
        accounts = current_user.accounts.map do |account|
          omit_account(account)
        end
        render json: accounts
      end

      def create
        account = current_user.accounts.build(account_params)
        if account.save!
          render json: omit_account(account)
        end
      end

      def update
        account = current_user.accounts.find(params[:id])
        if account.update!(account_params)
          render json: omit_account(account)
        end
      end

      def destroy
        account = current_user.accounts.find(params[:id])
        account.destroy!
        render json: { id: account.id }
      end

      private
        def account_params
          params.permit(:id, :name, :amount)
        end

        def omit_account(account)
          {
            id: account.id,
            name: account.name,
            amount: account.amount
          }
        end
    end
  end
end
