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
          {
            id: transaction.id,
            amount: transaction.amount
          }
        end
    end
  end
end
