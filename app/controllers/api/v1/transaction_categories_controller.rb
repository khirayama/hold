module Api
  module V1
    class TransactionCategoriesController < Api::V1::ApplicationController
      before_action :authenticate

      def index
        transaction_categories = current_user.transaction_categories.map do |transaction_category|
          omit_transaction_categories(transaction_category)
        end
        render json: transaction_categories
      end

      # def create
      #   account = current_user.accounts.build(account_params)
      #   if account.save
      #     render json: omit_account(account)
      #   end
      # end
      #
      # def update
      #   account = current_user.accounts.find(params[:id])
      #   if account.update(account_params)
      #     render json: omit_account(account)
      #   end
      # end
      #
      # def destroy
      #   account = current_user.accounts.find(params[:id])
      #   account.destroy!
      # end

      private
        # def account_params
        #   params.permit(:id, :name, :amount)
        # end

        def omit_transaction_category(transaction_category)
          {
            id: transaction.id,
            name: transaction.name,
          }
        end
    end
  end
end
