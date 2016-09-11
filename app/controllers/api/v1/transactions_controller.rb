module Api
  module V1
    class TransactionsController < Api::V1::ApplicationController
      before_action :authenticate

      def index
        transactions = current_user.transactions.map do |transaction|
          format_transaction(transaction)
        end
        render json: transactions
      end

      def create
        transaction = current_user.transactions.build(transaction_params)

       if transaction.save
          from_account = current_user.accounts.find(from_account_id) if from_account_id.present?
          to_account = current_user.accounts.find(to_account_id) if to_account_id.present?

          from_account.transfer(to_account, transaction.amount)

          render json: format_transaction(transaction)
        end
      end

      def update
        transaction = current_user.transactions.find(params[:id])

        from_account = current_user.accounts.find(from_account_id) if from_account_id.present?
        to_account = current_user.accounts.find(to_account_id) if to_account_id.present?

        to_account.transfer(from_account, transaction.amount)

        if transaction.update(transaction_params)
          from_account = current_user.accounts.find(from_account_id) if from_account_id.present?
          to_account = current_user.accounts.find(to_account_id) if to_account_id.present?

          from_account.transfer(to_account, transaction.amount)

          render json: format_transaction(transaction)
        end
      end

      def destroy
        transaction = current_user.transactions.find(params[:id])

        from_account = current_user.accounts.find(from_account_id) if from_account_id.present?
        to_account = current_user.accounts.find(to_account_id) if to_account_id.present?

        to_account.transfer(from_account, transaction.amount)

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

        def format_transaction(transaction)
          transaction_category = current_user.transaction_categories.find(transaction.transaction_category_id)
          new_transaction = {
            id: transaction.id,
            from_account: nil,
            to_account: nil,
            transaction_category: {
              id: transaction_category.id,
              name: transaction_category.name
            },
            amount: transaction.amount,
            payment_date: transaction.payment_date,
            transaction_date: transaction.transaction_date
          }
          if transaction.from_account_id.present?
            from_account = current_user.accounts.find(transaction.from_account_id)
            new_transaction[:from_account] = {
              id: from_account.id,
              name: from_account.name
            }
          end
          if transaction.to_account_id.present?
            to_account = current_user.accounts.find(transaction.to_account_id)
            new_transaction[:to_account] = {
              id: to_account.id,
              name: to_account.name
            }
          end
          new_transaction
        end
    end
  end
end
