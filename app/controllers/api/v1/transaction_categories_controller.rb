module Api
  module V1
    class TransactionCategoriesController < Api::V1::ApplicationController
      before_action :authenticate

      def index
        transaction_categories = current_user.transaction_categories.map do |transaction_category|
          omit_transaction_category(transaction_category)
        end
        render json: transaction_categories
      end

      def create
        transaction_category = current_user.transaction_categories.build(transaction_category_params)
        if transaction_category.save
          render json: omit_transaction_category(transaction_category)
        end
      end

      def update
        transaction_category = current_user.transaction_categories.find(params[:id])
        if transaction_category.update(transaction_category_params)
          render json: omit_transaction_category(transaction_category)
        end
      end

      def destroy
        transaction_category = current_user.transaction_categories.find(params[:id])
        transaction_category.destroy!
      end

      # Model?
      def create_initial_transaction_categories
        # Payment
        current_user.transaction_categories.create(name: "Food", transaction_type: :payment)
        current_user.transaction_categories.create(name: "Daily goods", transaction_type: :payment)
        current_user.transaction_categories.create(name: "Transport", transaction_type: :payment)
        current_user.transaction_categories.create(name: "Network", transaction_type: :payment)
        current_user.transaction_categories.create(name: "Utilities", transaction_type: :payment)
        current_user.transaction_categories.create(name: "Home", transaction_type: :payment)
        current_user.transaction_categories.create(name: "Socializing", transaction_type: :payment)
        current_user.transaction_categories.create(name: "Hobbies", transaction_type: :payment)
        current_user.transaction_categories.create(name: "Education", transaction_type: :payment)
        current_user.transaction_categories.create(name: "Medical", transaction_type: :payment)
        current_user.transaction_categories.create(name: "Other", transaction_type: :payment)

        # Income
        current_user.transaction_categories.create(name: "Salary", transaction_type: :income)
        current_user.transaction_categories.create(name: "Bonus", transaction_type: :income)
        current_user.transaction_categories.create(name: "Other", transaction_type: :income)
      end

      private
        def transaction_category_params
          params.permit(:id, :name)
        end

        def omit_transaction_category(transaction_category)
          {
            id: transaction_category.id,
            name: transaction_category.name,
            transaction_type: transaction_category.transaction_type
          }
        end
    end
  end
end
