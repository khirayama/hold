module Api
  module V1
    class TransactionsController < Api::V1::ApplicationController
      before_action :authenticate

      def index
        transactions = current_user.transactions.map do |transaction|
          omit_transaction(transaction)
        end
        render json: transactions
      end

      def create
        transaction = current_user.transactions.build(transaction_params)
        if transaction.save
          render json: omit_transaction(transaction)
        end
      end

      def update
        transaction = current_user.transactions.find(params[:id])
        if transaction.update(transaction_params)
          render json: omit_transaction(transaction)
        end
      end

      def destroy
        transaction = current_user.transactions.find(params[:id])
        transaction.destroy!
      end

      private
        def transaction_params
          params.permit(
            :id,
            :from_account_id,
            :to_account_id,
            :transaction_category_id,
            :amount,
            :payment_date,
            :transaction_date
          )
        end

        def omit_transaction(transaction)
          from_account =  current_user.accounts.find(transaction.from_account_id)
          to_account =  current_user.accounts.find(transaction.to_account_id)
          transaction_category = current_user.transaction_categories.find(transaction.transaction_category_id)
          {
            id: transaction.id,
            from_account: {
              id: from_account.id,
              name: from_account.name
            },
            to_account: {
              id: to_account.id,
              name: to_account.name
            },
            transaction_category: {
              id: transaction_category.id,
              name: transaction_category.name
            },
            amount: transaction.amount,
            payment_date: transaction.payment_date,
            transaction_date: transaction.transaction_date
          }
        end
    end
  end
end
